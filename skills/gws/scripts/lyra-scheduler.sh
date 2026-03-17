#!/bin/bash
# Lyra Scheduler - Verifica si es hora de ejecutar la rutina de curaduría
# Horario: 7 AM Argentina = 10 AM UTC (y cada 6 horas: 00, 06, 12, 18 UTC)
# Ejecutar desde HEARTBEAT.md cada ~30 minutos

set -e

WORKSPACE="/data/.openclaw/workspace"
WORKSPACE_LYRA="/data/.openclaw/workspace-lyra"
DISCORD_PUBLISHER="$WORKSPACE/skills/gws/scripts/discord-publisher.sh"

# Configuración de canales
DISCORD_LYRA_CHANNEL="1482027396193583244"
TELEGRAM_GROUP_ID="-1003642418702"
TELEGRAM_THREAD_ID="38"
TELEGRAM_BOT_TOKEN="${TELEGRAM_BOT_TOKEN:-}"
DISCORD_BOT_TOKEN="${DISCORD_BOT_TOKEN:-}"

if [[ -z "$TELEGRAM_BOT_TOKEN" || -z "$DISCORD_BOT_TOKEN" ]]; then
    echo "Error: TELEGRAM_BOT_TOKEN o DISCORD_BOT_TOKEN no están configurados en .env"
    exit 1
fi

# Hora actual UTC
CURRENT_HOUR_UTC=$(date -u +"%H")
CURRENT_TIME_AR=$(TZ="America/Argentina/Buenos_Aires" date +"%H:%M")
TODAY=$(date +"%Y-%m-%d")

# Horarios Lyra: 00, 06, 10, 12, 18 UTC (10 es el principal, los otros son cada 6 horas)
TARGET_HOURS_UTC=("00" "06" "10" "12" "18")

log() {
    echo "[$(date -u +"%Y-%m-%d %H:%M:%S UTC")] $1" >> "/tmp/openclaw/lyra-scheduler.log"
}

send_telegram() {
    local message="$1"
    local escaped_message=$(echo "$message" | python3 -c "import sys,urllib.parse; print(urllib.parse.quote(sys.stdin.read()))" 2>/dev/null || echo "$message")
    curl -s -X POST "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage" \
        -d "chat_id=${TELEGRAM_GROUP_ID}" \
        -d "message_thread_id=${TELEGRAM_THREAD_ID}" \
        -d "text=$escaped_message" \
        -d "parse_mode=Markdown" >> "/tmp/openclaw/lyra-scheduler.log" 2>&1
}

send_telegram_file() {
    local file="$1"
    local caption="$2"
    curl -s -X POST "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendDocument" \
        -d "chat_id=${TELEGRAM_GROUP_ID}" \
        -d "message_thread_id=${TELEGRAM_THREAD_ID}" \
        -d "caption=$caption" \
        -d "parse_mode=Markdown" \
        -F "document=@$file" >> "/tmp/openclaw/lyra-scheduler.log" 2>&1
}

send_discord() {
    local message="$1"
    bash "$DISCORD_PUBLISHER" "$DISCORD_LYRA_CHANNEL" "$message" >> "/tmp/openclaw/lyra-scheduler.log" 2>&1
}

send_discord_file() {
    local file="$1"
    local message="$2"
    curl -s -X POST "https://discord.com/api/v10/channels/$DISCORD_LYRA_CHANNEL/messages" \
        -H "Authorization: Bot $DISCORD_BOT_TOKEN" \
        -F "content=$message" \
        -F "file=@$file" >> "/tmp/openclaw/lyra-scheduler.log" 2>&1
}

# Verificar si es una de las horas target
is_target_hour=false
for hour in "${TARGET_HOURS_UTC[@]}"; do
    if [ "$CURRENT_HOUR_UTC" = "$hour" ]; then
        is_target_hour=true
        break
    fi
done

if [ "$is_target_hour" = true ]; then
    # Verificar si ya se ejecutó en esta hora específica
    LAST_RUN_FILE="/tmp/lyra-curation-last-run"
    RUN_KEY="${CURRENT_HOUR_UTC}-$(date +"%Y-%m-%d")"
    
    if [ -f "$LAST_RUN_FILE" ]; then
        LAST_RUN=$(cat "$LAST_RUN_FILE")
        if [ "$LAST_RUN" = "$RUN_KEY" ]; then
            log "⏭️  Lyra curation ya ejecutada en esta hora ($LAST_RUN)"
            exit 0
        fi
    fi
    
    log "⏰ Es hora de Lyra Curation Routine ($CURRENT_HOUR_UTC UTC / $CURRENT_TIME_AR AR)"
    
    # ============================================
    # Notificar inicio
    # ============================================
    send_telegram "✍️ *Lyra Curation - Iniciado*

⏰ Hora: $CURRENT_TIME_AR AR
🎯 Objetivo: 3 trend briefs de IA/tech
📍 Fuentes: Web search, GitHub, Hacker News

⏳ Lyra está investigando..."
    
    send_discord "✍️ **Lyra Curation - Iniciado**

⏰ Hora: $CURRENT_TIME_AR AR
🎯 Objetivo: 3 trend briefs de IA/tech

⏳ Investigando..."
    
    # ============================================
    # PASO 1: Lyra investiga y crea contenido
    # ============================================
    log "🤖 Disparando sub-agente Lyra para investigación..."
    
    # Crear directorio de output si no existe
    mkdir -p "$WORKSPACE_LYRA/output"
    
    CURATION_FILE="$WORKSPACE_LYRA/output/curation-$TODAY.md"
    
    # ============================================
    # PASO 2: Publicar contenido COMPLETO
    # ============================================
    # El sub-agente guarda el contenido en workspace-lyra/output/
    # Esperamos unos segundos para que el sub-agente termine
    sleep 5
    
    if [[ -f "$CURATION_FILE" ]]; then
        log "📄 Contenido encontrado: $CURATION_FILE"
        
        # Leer contenido completo
        REPORT_CONTENT=$(cat "$CURATION_FILE")
        
        # Publicar en Telegram como archivo
        send_telegram_file "$CURATION_FILE" "✍️ **Lyra Curation - Reporte Completo - $TODAY**

✅ 3 Trend Briefs generados

📄 Ver archivo adjunto para contenido completo"
        
        # Publicar en Discord como archivo
        send_discord_file "$CURATION_FILE" "✍️ **Lyra Curation - Reporte Completo - $TODAY**

✅ 3 Trend Briefs generados"
        
        # También publicar contenido en el chat (primeras secciones)
        send_telegram "$(head -100 "$CURATION_FILE")"
        send_discord "$(head -100 "$CURATION_FILE")"
        
        log "✅ Reporte completo publicado"
    else
        log "⚠️ No se encontró archivo de curación. El sub-agente puede estar guardando en otro lugar."
        
        send_telegram "⚠️ *Lyra Curation - Pendiente*

El sub-agente está generando el contenido. Se publicará cuando complete."
        
        send_discord "⚠️ **Lyra Curation - Pendiente**

El sub-agente está generando el contenido."
    fi
    
    # ============================================
    # Marcar como ejecutada en esta hora
    # ============================================
    echo "$RUN_KEY" > "$LAST_RUN_FILE"
    
    log "✅ Lyra scheduler completado"
    
else
    log "⏭️  No es hora de Lyra Curation (hora actual UTC: $CURRENT_HOUR_UTC, target: ${TARGET_HOURS_UTC[*]})"
fi
