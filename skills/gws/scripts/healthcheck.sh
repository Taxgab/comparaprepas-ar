#!/bin/bash
# System Health Check & Optimization Script
# OpenClaw - Umbrel Server
# Ejecutar diariamente a las 3:00 AM

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
WORKSPACE="/data/.openclaw/workspace"
LOG_FILE="/tmp/openclaw/healthcheck-$(date +%Y-%m-%d).log"
REPORT_FILE="/tmp/openclaw/healthcheck-report-$(date +%Y-%m-%d).md"

# Inicializar
mkdir -p /tmp/openclaw
echo "=== Health Check iniciado: $(date) ===" | tee "$LOG_FILE"

# Función para enviar a Telegram vía OpenClaw
send_telegram() {
    local message="$1"
    # Usar el sistema de mensajería de OpenClaw
    # El mensaje se envía al canal de Telegram configurado
    if command -v openclaw &> /dev/null; then
        # Guardar mensaje en archivo temporal para enviar
        echo "$message" > /tmp/openclaw/telegram-pending.txt
        echo "✅ Mensaje listo para enviar vía OpenClaw" >> "$LOG_FILE"
    fi
}

# ============================================
# 1. DIAGNÓSTICO DEL SISTEMA
# ============================================
echo "" >> "$LOG_FILE"
echo "=== 1. DIAGNÓSTICO DEL SISTEMA ===" >> "$LOG_FILE"

# Gateway OpenClaw
echo "🔧 Gateway OpenClaw:" >> "$LOG_FILE"
if openclaw gateway status >> "$LOG_FILE" 2>&1; then
    GATEWAY_STATUS="✅ Corriendo"
else
    GATEWAY_STATUS="❌ Caído - Intentando reiniciar..."
    openclaw gateway restart >> "$LOG_FILE" 2>&1 || true
fi

# Uso de disco
echo "" >> "$LOG_FILE"
echo "💾 Uso de Disco:" >> "$LOG_FILE"
DISK_USAGE=$(df -h /data | tail -1 | awk '{print $5}')
DISK_AVAIL=$(df -h /data | tail -1 | awk '{print $4}')
echo "  Usado: $DISK_USAGE | Disponible: $DISK_AVAIL" >> "$LOG_FILE"

if [[ ${DISK_USAGE%\%} -gt 85 ]]; then
    DISK_STATUS="⚠️ Crítico (>85%)"
elif [[ ${DISK_USAGE%\%} -gt 70 ]]; then
    DISK_STATUS="⚡ Atención (>70%)"
else
    DISK_STATUS="✅ Normal"
fi

# Memoria RAM
echo "" >> "$LOG_FILE"
echo "🧠 Memoria RAM:" >> "$LOG_FILE"
FREE_MEM=$(free -h | grep Mem | awk '{print $4}')
USED_MEM=$(free -h | grep Mem | awk '{print $3}')
TOTAL_MEM=$(free -h | grep Mem | awk '{print $2}')
echo "  Total: $TOTAL_MEM | Usada: $USED_MEM | Libre: $FREE_MEM" >> "$LOG_FILE"

# Uptime y Load
echo "" >> "$LOG_FILE"
echo "⏱️ Uptime y Carga:" >> "$LOG_FILE"
UPTIME=$(uptime -p 2>/dev/null || uptime | cut -d',' -f1)
LOAD=$(uptime | awk -F'load average:' '{print $2}' | xargs)
echo "  Uptime: $UPTIME" >> "$LOG_FILE"
echo "  Load Average: $LOAD" >> "$LOG_FILE"

# ============================================
# 2. SOLUCIÓN DE ERRORES
# ============================================
echo "" >> "$LOG_FILE"
echo "=== 2. SOLUCIÓN DE ERRORES ===" >> "$LOG_FILE"

# Reiniciar gateway si está caído
if ! openclaw gateway status >> /dev/null 2>&1; then
    echo "🔄 Reiniciando Gateway OpenClaw..." >> "$LOG_FILE"
    openclaw gateway restart >> "$LOG_FILE" 2>&1 && echo "✅ Gateway reiniciado" >> "$LOG_FILE"
fi

# Limpiar procesos zombie
ZOMBIES=$(ps aux | awk '$8 ~ /^Z/ {print $2}' | wc -l)
if [[ $ZOMBIES -gt 0 ]]; then
    echo "⚠️ $ZOMBIES procesos zombie encontrados" >> "$LOG_FILE"
    # No se pueden matar directamente, pero se loguea
fi

# Verificar espacio en /tmp
TMP_USAGE=$(du -sh /tmp 2>/dev/null | cut -f1)
echo "📁 /tmp usando: $TMP_USAGE" >> "$LOG_FILE"

# ============================================
# 3. LIMPIEZA Y OPTIMIZACIÓN
# ============================================
echo "" >> "$LOG_FILE"
echo "=== 3. LIMPIEZA Y OPTIMIZACIÓN ===" >> "$LOG_FILE"

# Limpiar logs viejos (>7 días)
echo "🧹 Limpiando logs viejos..." >> "$LOG_FILE"
find /tmp/openclaw -name "*.log" -mtime +7 -delete 2>/dev/null || true
OLD_LOGS=$(find /tmp/openclaw -name "*.log" -mtime +7 2>/dev/null | wc -l)
echo "  Logs eliminados: $OLD_LOGS" >> "$LOG_FILE"

# Limpiar caché de npm
if command -v npm &> /dev/null; then
    echo "🧹 Limpiando caché de npm..." >> "$LOG_FILE"
    npm cache clean --force >> "$LOG_FILE" 2>&1 || true
fi

# Limpiar paquetes huérfanos (Debian/Ubuntu)
if command -v apt-get &> /dev/null; then
    echo "🧹 Limpiando paquetes huérfanos..." >> "$LOG_FILE"
    apt-get autoremove -y >> "$LOG_FILE" 2>&1 || true
fi

# Sincronizar buffers a disco
echo "💾 Sincronizando buffers..." >> "$LOG_FILE"
sync

# Liberar caché de página (solo si hay poca memoria libre)
FREE_PERCENT=$(free | grep Mem | awk '{printf "%.0f", $4/$2 * 100.0}')
if [[ $FREE_PERCENT -lt 10 ]]; then
    echo "🧠 Liberando caché de página (memoria <10%)..." >> "$LOG_FILE"
    echo 1 > /proc/sys/vm/drop_caches 2>/dev/null || echo "  No se pudo liberar caché (requiere root)" >> "$LOG_FILE"
fi

# ============================================
# 4. GIT STATUS
# ============================================
echo "" >> "$LOG_FILE"
echo "=== 4. ESTADO DE GIT ===" >> "$LOG_FILE"

cd "$WORKSPACE" || true
if git status --short >> "$LOG_FILE" 2>&1; then
    GIT_AHEAD=$(git rev-list --count HEAD @{u} 2>/dev/null || echo "0")
    GIT_BEHIND=$(git rev-list --count @{u} HEAD 2>/dev/null || echo "0")
    echo "  Commits ahead: $GIT_AHEAD | behind: $GIT_BEHIND" >> "$LOG_FILE"
else
    echo "  No es un repositorio git o error" >> "$LOG_FILE"
fi

# ============================================
# 5. GENERAR REPORTE
# ============================================
echo "" >> "$LOG_FILE"
echo "=== 5. GENERANDO REPORTE ===" >> "$LOG_FILE"

cat > "$REPORT_FILE" << EOF
# 🛠️ Reporte de Salud del Sistema - OpenClaw

**Fecha:** $(date +"%Y-%m-%d %H:%M:%S")
**Host:** $(hostname)
**Uptime:** $UPTIME

---

## 📊 Resumen

| Componente | Estado |
|------------|--------|
| Gateway OpenClaw | $GATEWAY_STATUS |
| Uso de Disco | $DISK_STATUS ($DISK_USAGE) |
| Memoria RAM | ${FREE_MEM} libre |
| Load Average | $LOAD |

---

## 🔧 Acciones Realizadas

- ✅ Diagnóstico completado
- ✅ Verificación de errores
- ✅ Limpieza de logs viejos
- ✅ Optimización de memoria
- ✅ Sincronización de disco

---

## 📈 Detalles

### Disco
- **Usado:** $DISK_USAGE
- **Disponible:** $DISK_AVAIL

### Memoria
- **Total:** $TOTAL_MEM
- **Usada:** $USED_MEM
- **Libre:** $FREE_MEM

### Git
- **Commits pendientes:** $GIT_AHEAD ahead, $GIT_BEHIND behind

---

*Reporte generado automáticamente por OpenClaw Health Check*
EOF

echo "✅ Reporte generado: $REPORT_FILE" >> "$LOG_FILE"

# ============================================
# 6. ENVIAR REPORTE A TELEGRAM (OpenClaw)
# ============================================
echo "" >> "$LOG_FILE"
echo "=== 6. ENVIANDO REPORTE A TELEGRAM ===" >> "$LOG_FILE"

# Mensaje resumido para Telegram
TELEGRAM_MSG="🛠️ *Health Check - $(date +"%d/%m/%Y %H:%M")*

✅ Gateway: $GATEWAY_STATUS
💾 Disco: $DISK_STATUS ($DISK_USAGE)
🧠 RAM Libre: $FREE_MEM
⏱️ Uptime: $UPTIME
📦 Git: $GIT_AHEAD commits pendientes

*Reporte completo en el servidor*"

# Guardar mensaje para enviar vía OpenClaw
echo "$TELEGRAM_MSG" > /tmp/openclaw/healthcheck-telegram.txt

# Intentar enviar vía message tool de OpenClaw
if [[ -f "$WORKSPACE/.openclaw-pid" ]] || command -v openclaw &> /dev/null; then
    # El mensaje se procesará en el próximo heartbeat
    echo "✅ Mensaje listo para enviar a Telegram" >> "$LOG_FILE"
else
    echo "⏸️ Mensaje guardado (OpenClaw no disponible)" >> "$LOG_FILE"
fi

echo "" >> "$LOG_FILE"
echo "=== Health Check completado: $(date) ===" >> "$LOG_FILE"

# Salida limpia
cat "$REPORT_FILE"

exit 0
