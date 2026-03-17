#!/bin/bash
# Cron jobs para sub-agentes de OpenClaw
# Agregar al crontab del usuario

# ============================================
# CONFIGURACIÓN
# ============================================

WORKSPACE="/data/.openclaw/workspace"
LOG_DIR="/tmp/openclaw/cron"
mkdir -p "$LOG_DIR"

log() {
    echo "[$(date -u '+%Y-%m-%d %H:%M:%S UTC')] $1" >> "$LOG_DIR/subagents.log"
}

# ============================================
# TAREAS PROGRAMADAS
# ============================================

# Lyra - Curación de contenido (cada 6 horas)
spawn_lyra_curation() {
    log "▶ Spawnear Lyra para curación de contenido..."
    cd "$WORKSPACE"
    openclaw sessions spawn \
        --runtime subagent \
        --agentId lyra \
        --mode run \
        --label "lyra-curation-cron" \
        --task "Buscar y curar contenido trending sobre IA y tecnología. Crear 3 trend briefs y publicar en Notion." \
        >> "$LOG_DIR/lyra-curation.log" 2>&1
    log "✓ Lyra curation spawnada"
}

# Kael - Revisión de GitHub (cada 12 horas)
spawn_kael_github() {
    log "▶ Spawnear Kael para revisar GitHub..."
    cd "$WORKSPACE"
    openclaw sessions spawn \
        --runtime subagent \
        --agentId dev \
        --mode run \
        --label "kael-github-cron" \
        --task "Revisar issues y PRs pendientes en github.com/Taxgab/OpenClaw-Spock. Implementar fixes críticos y reportar." \
        >> "$LOG_DIR/kael-github.log" 2>&1
    log "✓ Kael GitHub revisión spawnada"
}

# Radar - Búsqueda de tendencias (diario 8 AM AR = 11 UTC)
spawn_radar_scan() {
    log "▶ Spawnear Radar para búsqueda de tendencias..."
    cd "$WORKSPACE"
    openclaw sessions spawn \
        --runtime subagent \
        --agentId radar \
        --mode run \
        --label "radar-scan-cron" \
        --task "Escanear Hacker News, GitHub Trending, ArXiv y Reddit. Identificar 3 señales débiles sobre IA y agentes autónomos. Crear Trend Briefs." \
        >> "$LOG_DIR/radar-scan.log" 2>&1
    log "✓ Radar scan spawnado"
}

# Vera - Verificación de seguridad (diario 3 AM AR = 06 UTC)
spawn_vera_security() {
    log "▶ Spawnear Vera para verificación de seguridad..."
    cd "$WORKSPACE"
    openclaw sessions spawn \
        --runtime subagent \
        --agentId dev \
        --mode run \
        --label "vera-security-cron" \
        --task "Verificar seguridad del sistema: revisar permisos, logs de errores, credenciales expuestas en .env, y generar reporte de vulnerabilidades." \
        >> "$LOG_DIR/vera-security.log" 2>&1
    log "✓ Vera security check spawnado"
}

# ============================================
# EJECUCIÓN SEGÚN HORA
# ============================================

HOUR_UTC=$(date -u +%H)

log "=== Cron sub-agentes ejecutado ==="
log "Hora UTC: ${HOUR_UTC}"

# Lyra Curation - Cada 6 horas (00, 06, 12, 18 UTC)
case "$HOUR_UTC" in
    00|06|12|18)
        spawn_lyra_curation
        ;;
esac

# Kael GitHub - Cada 12 horas (02, 14 UTC)
case "$HOUR_UTC" in
    02|14)
        spawn_kael_github
        ;;
esac

# Radar Scan - Diario 11 UTC (8 AM AR)
if [[ "$HOUR_UTC" == "11" ]]; then
    spawn_radar_scan
fi

# Vera Security - Diario 06 UTC (3 AM AR)
if [[ "$HOUR_UTC" == "06" ]]; then
    spawn_vera_security
fi

log "=== Cron sub-agentes finalizado ==="
