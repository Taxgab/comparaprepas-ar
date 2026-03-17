#!/bin/bash
# Daily Report Scheduler - Ejecuta a las 8 AM AR (11:00 UTC)
# Se llama desde HEARTBEAT.md cada ~30 minutos

SCRIPT_DIR="$(dirname "$0")"
STATE_FILE="/data/.openclaw/workspace/memory/daily-report-state.json"
TODAY=$(date -u +"%Y-%m-%d")
CURRENT_HOUR_AR=$(TZ="America/Argentina/Buenos_Aires" date +"%H")
CURRENT_MIN_AR=$(TZ="America/Argentina/Buenos_Aires" date +"%M")

# Crear estado si no existe
if [ ! -f "$STATE_FILE" ]; then
    echo '{"lastReport": null, "lastReportDate": null}' > "$STATE_FILE"
fi

# Leer última ejecución
LAST_REPORT_DATE=$(cat "$STATE_FILE" | grep -o '"lastReportDate": "[^"]*"' | cut -d'"' -f4)

# Ejecutar solo si son las 8 AM AR (margen ±30 min) y no se ejecutó hoy
if [ "$CURRENT_HOUR_AR" = "08" ] && [ "$CURRENT_MIN_AR" -ge "00" ] && [ "$CURRENT_MIN_AR" -le "59" ]; then
    if [ "$LAST_REPORT_DATE" != "$TODAY" ]; then
        echo "[$(date -u +"%Y-%m-%d %H:%M:%S") UTC] Ejecutando Daily Report..."
        
        # Cargar variables de entorno desde .env
        WORKSPACE="/data/.openclaw/workspace"
        source "$WORKSPACE/.env" 2>/dev/null || true
        export TELEGRAM_BOT_TOKEN TELEGRAM_CHAT_ID
        
        # Ejecutar reporte
        bash "$SCRIPT_DIR/daily-report.sh"
        
        # Actualizar estado
        echo "{\"lastReport\": \"$(date -u +"%Y-%m-%d %H:%M:%S") UTC\", \"lastReportDate\": \"$TODAY\"}" > "$STATE_FILE"
        
        echo "[$(date -u +"%Y-%m-%d %H:%M:%S") UTC] Daily Report completado"
    else
        echo "[$(date -u +"%Y-%m-%d %H:%M:%S") UTC] Daily Report ya ejecutado hoy"
    fi
else
    # No es hora, solo informar estado
    echo "[$(date -u +"%Y-%m-%d %H:%M:%S") UTC] Hora AR: ${CURRENT_HOUR_AR}:${CURRENT_MIN_AR} - Próximo reporte: 08:00 AR"
fi
