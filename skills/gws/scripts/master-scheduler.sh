#!/bin/bash
# Master Scheduler para OpenClaw
# Ejecuta las tareas automáticas según la hora actual (UTC)
# Diseñado para ejecutarse cada 30 minutos desde el heartbeat

WORKSPACE="/data/.openclaw/workspace"
LOG_DIR="/tmp/openclaw"
mkdir -p "$LOG_DIR"

# Obtener hora actual en UTC
HOUR_UTC=$(date -u +%H)
MIN_UTC=$(date -u +%M)

log() {
    echo "[$(date -u '+%Y-%m-%d %H:%M:%S UTC')] $1" >> "$LOG_DIR/scheduler.log"
}

log "=== Master Scheduler ejecutado ==="
log "Hora UTC: ${HOUR_UTC}:${MIN_UTC}"

# ============================================
# TAREAS DE SHELL (funcionan desde CLI)
# ============================================

# AgentMail - Cada 30 minutos (siempre se ejecuta)
log "▶ Ejecutando AgentMail..."
/data/.openclaw/workspace/skills/agentmail/scripts/email-scheduler.sh >> "$LOG_DIR/agentmail.log" 2>&1
log "✓ AgentMail completado"

# Telegram DM Poller - Cada 30 minutos (revisa mensajes nuevos)
log "▶ Revisando DMs de Telegram..."
DM_COUNT=$(/data/.openclaw/workspace/skills/gws/scripts/telegram-dm-poller.sh)
if [[ "$DM_COUNT" -gt 0 ]]; then
    log "⚠️ $DM_COUNT mensajes nuevos de Telegram - Revisar y responder"
else
    log "✓ Sin DMs nuevos de Telegram"
fi

# ============================================
# NOTA: SUB-AGENTES SPAWNADOS VIA CRON/HEARTBEAT
# ============================================
# Los sub-agentes (lyra, radar, dev, vera) NO pueden spawnearse desde shell.
# Se spawnan automáticamente vía:
# 1. Heartbeat (este script se ejecuta cada 30 min)
# 2. Tool API sessions_spawn (desde dentro de OpenClaw)
#
# Horarios configurados en HEARTBEAT.md:
# - Lyra: 00, 06, 10, 12, 18 UTC
# - Radar: 11:00 UTC diario
# - Kael: 02, 14 UTC
# - Vera: 06:00 UTC diario
# ============================================

log "=== Master Scheduler finalizado ==="
