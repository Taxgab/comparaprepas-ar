#!/bin/bash
# AgentMail Email Scheduler - Revisa emails entrantes cada 30 minutos
# Ejecutar desde HEARTBEAT.md

WORKSPACE="/data/.openclaw/workspace"
AGENTMAIL_DIR="$WORKSPACE/skills/agentmail"
STATE_FILE="/tmp/agentmail-scheduler.json"
LOG_FILE="$AGENTMAIL_DIR/scheduler.log"

# Email privado del usuario (tiene acceso a información sensible)
PRIVATE_EMAIL="taxgab@gmail.com"

# Cargar variables de entorno
source "$WORKSPACE/.env" 2>/dev/null || true

# Determinar bloque de 30 minutos actual (00-29 = bloque 0, 30-59 = bloque 1)
CURRENT_MIN=$(date -u +"%M")
CURRENT_HOUR=$(date -u +"%Y-%m-%d %H")

if [[ "$CURRENT_MIN" -ge 0 && "$CURRENT_MIN" -lt 30 ]]; then
    BLOCK="00"
else
    BLOCK="30"
fi

BLOCK_ID="${CURRENT_HOUR}:${BLOCK}"

# Verificar si ya se ejecutó en este bloque de 30 minutos
LAST_RUN=$(cat "$STATE_FILE" 2>/dev/null | grep -o '"last_run":"[^"]*"' | cut -d'"' -f4 || echo "")

if [[ "$LAST_RUN" == "$BLOCK_ID" ]]; then
    # Ya se ejecutó en este bloque
    echo "[$(date -u +"%Y-%m-%d %H:%M:%S")] ⏭️ Already checked (block $BLOCK_ID)" >> "$LOG_FILE"
    exit 0
fi

# No se ejecutó aún en este bloque - proceder con el check
echo "[$(date -u +"%Y-%m-%d %H:%M:%S")] 📧 Checking emails (block ${BLOCK})..." >> "$LOG_FILE"

# Ejecutar receive-emails y capturar output
OUTPUT=$(cd "$AGENTMAIL_DIR" && node receive-emails.js 10 2>&1)

# Verificar si hay emails nuevos
if echo "$OUTPUT" | grep -q "email(s) encontrado(s)"; then
    EMAIL_COUNT=$(echo "$OUTPUT" | grep -o "[0-9]* email(s)" | grep -o "[0-9]*")
    
    if [[ -n "$EMAIL_COUNT" && "$EMAIL_COUNT" -gt 0 ]]; then
        # Leer emails guardados y verificar remitentes
        EMAILS_FILE="$AGENTMAIL_DIR/emails-received.json"
        
        if [[ -f "$EMAILS_FILE" ]]; then
            # Procesar cada email
            while IFS= read -r email_data; do
                FROM=$(echo "$email_data" | grep -o '"from": "[^"]*"' | cut -d'"' -f4)
                SUBJECT=$(echo "$email_data" | grep -o '"subject": "[^"]*"' | cut -d'"' -f4)
                
                # Verificar si es email privado o público
                if [[ "$FROM" == *"$PRIVATE_EMAIL"* ]]; then
                    # Email PRIVADO - Notificar con prioridad
                    echo "[$(date -u +"%Y-%m-%d %H:%M:%S")] 🔒 Email PRIVADO de $FROM: $SUBJECT" >> "$LOG_FILE"
                    
                    # Notificar a Telegram
                    if [[ -n "$TELEGRAM_BOT_TOKEN" && -n "$TELEGRAM_CHAT_ID" ]]; then
                        curl -s -X POST "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage" \
                            -d "chat_id=${TELEGRAM_CHAT_ID}" \
                            -d "text=🔒 *Email PRIVADO recibido*%0A%0A📧 De: \`$FROM\`%0A📝 Asunto: $SUBJECT%0A%0A⚠️ *Contiene información sensible*" \
                            -d "parse_mode=Markdown" > /dev/null 2>&1 || true
                    fi
                else
                    # Email PÚBLICO - Sin información sensible
                    echo "[$(date -u +"%Y-%m-%d %H:%M:%S")] 📮 Email PÚBLICO de $FROM: $SUBJECT" >> "$LOG_FILE"
                    
                    # Notificar a Telegram
                    if [[ -n "$TELEGRAM_BOT_TOKEN" && -n "$TELEGRAM_CHAT_ID" ]]; then
                        curl -s -X POST "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage" \
                            -d "chat_id=${TELEGRAM_CHAT_ID}" \
                            -d "text=📮 *Email PÚBLICO recibido*%0A%0A📧 De: $FROM%0A📝 Asunto: $SUBJECT%0A%0Aℹ️ *Sin información sensible*" \
                            -d "parse_mode=Markdown" > /dev/null 2>&1 || true
                    fi
                fi
            done < <(cat "$EMAILS_FILE" | grep -o '{[^{}]*"from"[^{}]*}' | head -10)
        fi
        
        echo "[$(date -u +"%Y-%m-%d %H:%M:%S")] ✅ Processed $EMAIL_COUNT email(s)" >> "$LOG_FILE"
    else
        echo "[$(date -u +"%Y-%m-%d %H:%M:%S")] 📭 No new emails" >> "$LOG_FILE"
    fi
fi

# Actualizar estado
mkdir -p /tmp
echo "{\"last_run\":\"$BLOCK_ID\",\"status\":\"success\"}" > "$STATE_FILE"

echo "[$(date -u +"%Y-%m-%d %H:%M:%S")] ✅ Done" >> "$LOG_FILE"
exit 0
