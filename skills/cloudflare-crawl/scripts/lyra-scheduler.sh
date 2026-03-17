#!/bin/bash
# Lyra Crawl Scheduler - Usa Cloudflare Crawl en vez de web_search
# Ejecutar desde HEARTBEAT.md a las 7 AM AR (10 UTC)

WORKSPACE="/data/.openclaw/workspace"
CRAWL_DIR="$WORKSPACE/skills/cloudflare-crawl"
STATE_FILE="/tmp/lyra-crawl-scheduler.json"

# Hora actual UTC
CURRENT_HOUR_UTC=$(date -u +"%H")
TARGET_HOUR_UTC="10"

# 7 AM Argentina = 10 AM UTC
if [ "$CURRENT_HOUR_UTC" = "$TARGET_HOUR_UTC" ]; then
    LAST_RUN_FILE="/tmp/lyra-curation-last-run"
    TODAY=$(date +"%Y-%m-%d")
    
    if [ -f "$LAST_RUN_FILE" ]; then
        LAST_RUN=$(cat "$LAST_RUN_FILE")
        if [ "$LAST_RUN" = "$TODAY" ]; then
            echo "⏭️  Lyra crawl ya ejecutada hoy ($LAST_RUN)"
            exit 0
        fi
    fi
    
    echo "⏰ Lyra Crawl Routine - $TODAY"
    
    # Verificar credenciales
    source "$WORKSPACE/.env" 2>/dev/null || true
    
    if [[ -z "$CLOUDFLARE_ACCOUNT_ID" || -z "$CLOUDFLARE_API_TOKEN" ]]; then
        echo "⚠️  Faltan credenciales de Cloudflare en .env"
        echo "   CLOUDFLARE_ACCOUNT_ID=..."
        echo "   CLOUDFLARE_API_TOKEN=..."
        echo ""
        echo "Ejecutando Lyra tradicional (web_search)..."
        "$WORKSPACE/skills/gws/scripts/lyra-scheduler.sh"
        exit 0
    fi
    
    # Iniciar crawl de fuentes
    echo "🕷️  Iniciando crawl de fuentes..."
    cd "$CRAWL_DIR"
    node scripts/lyra-crawl.js all 30
    
    # Marcar como ejecutada
    echo "$TODAY" > "$LAST_RUN_FILE"
    
    # Notificar a Telegram
    if [[ -n "$TELEGRAM_BOT_TOKEN" && -n "$TELEGRAM_CHAT_ID" ]]; then
        curl -s -X POST "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage" \
            -d "chat_id=${TELEGRAM_CHAT_ID}" \
            -d "message_thread_id=38" \
            -d "text=✍️ *Lyra Crawl Iniciado*%0A%0A🕷️  Crawleando fuentes de noticias...%0A%0A⏳ Los jobs están en:%0A\`/skills/cloudflare-crawl/lyra-jobs.json\`%0A%0A_Próximo paso: Chequear status y procesar resultados_" \
            -d "parse_mode=Markdown" > /dev/null 2>&1 || true
    fi
    
    echo "✅ Lyra crawl completado - Jobs iniciados"
    echo ""
    echo "📋 Próximos pasos:"
    echo "   1. Chequear status: node scripts/crawl-status.js <jobId>"
    echo "   2. Procesar resultados: results/crawl-<jobId>.json"
    echo "   3. Generar hilos y boletines"
    echo "   4. Publicar en Notion y Telegram"
else
    echo "⏭️  No es hora de Lyra Crawl (hora actual UTC: $CURRENT_HOUR_UTC, target: $TARGET_HOUR_UTC)"
fi

exit 0
