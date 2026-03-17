#!/bin/bash
# Health Check Scheduler - Verifica si es hora de ejecutar el healthcheck
# Se llama desde el heartbeat de OpenClaw

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
HEALTHCHECK_SCRIPT="$SCRIPT_DIR/healthcheck.sh"
STATE_FILE="/tmp/openclaw/healthcheck-state.json"
TELEGRAM_MSG_FILE="/tmp/openclaw/healthcheck-telegram.txt"

# Hora actual en UTC
CURRENT_HOUR=$(date -u +%H)

# 3 AM Argentina = 6 AM UTC (ART es UTC-3)
# Ejecutar entre 06:00 y 07:00 UTC
if [[ "$CURRENT_HOUR" == "06" ]]; then
    # Verificar si ya se ejecutó hoy
    LAST_RUN=$(cat "$STATE_FILE" 2>/dev/null | grep -o '"last_run":"[^"]*"' | cut -d'"' -f4)
    TODAY=$(date +%Y-%m-%d)
    
    if [[ "$LAST_RUN" != "$TODAY" ]]; then
        echo "⏰ Es hora del Health Check diario (3 AM AR)..."
        
        # Cargar variables de entorno desde .env
        source "$WORKSPACE/.env" 2>/dev/null || true
        export TELEGRAM_BOT_TOKEN TELEGRAM_CHAT_ID
        
        # Ejecutar healthcheck
        if [[ -x "$HEALTHCHECK_SCRIPT" ]]; then
            "$HEALTHCHECK_SCRIPT"
            
            # Actualizar estado
            mkdir -p /tmp/openclaw
            echo "{\"last_run\":\"$TODAY\",\"status\":\"success\"}" > "$STATE_FILE"
            
            # Enviar mensaje a Telegram si existe
            if [[ -f "$TELEGRAM_MSG_FILE" ]]; then
                MSG=$(cat "$TELEGRAM_MSG_FILE")
                echo "📤 Enviando reporte a Telegram..."
                
                # Cargar token desde .env
                source "$WORKSPACE/.env" 2>/dev/null || true
                
                if [[ -n "$TELEGRAM_BOT_TOKEN" && -n "$TELEGRAM_CHAT_ID" ]]; then
                    # Enviar vía Telegram API
                    curl -s -X POST "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage" \
                        -d "chat_id=${TELEGRAM_CHAT_ID}" \
                        -d "text=${MSG}" \
                        -d "parse_mode=Markdown" > /dev/null
                    echo "✅ Reporte enviado a Telegram"
                else
                    echo "⚠️ TELEGRAM_BOT_TOKEN o TELEGRAM_CHAT_ID no configurados en .env"
                fi
            fi
            
            echo "✅ Health Check completado"
        else
            echo "❌ Health Check script no encontrado o no ejecutable"
            echo "{\"last_run\":\"$TODAY\",\"status\":\"error\"}" > "$STATE_FILE"
        fi
    else
        echo "✅ Health Check ya ejecutado hoy"
    fi
else
    echo "⏭️  No es hora del Health Check (hora actual UTC: $CURRENT_HOUR)"
fi

exit 0
