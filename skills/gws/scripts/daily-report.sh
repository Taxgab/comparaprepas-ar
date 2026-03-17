#!/bin/bash
# Daily Report Generator - 8 AM AR (11:00 UTC)
# Genera informe de actividad de las últimas 24hs

set -e

WORKSPACE="/data/.openclaw/workspace"
MEMORY_DIR="$WORKSPACE/memory"
TODAY=$(date -u +"%Y-%m-%d")
YESTERDAY=$(date -u -d "yesterday" +"%Y-%m-%d")
TELEGRAM_CHAT_ID="-1003642418702"
THEME_ID="35"  # 📢 Anuncios y General

# Función para enviar a Telegram
send_to_telegram() {
    local message="$1"
    local thread_id="$2"
    
    if [ -n "$TELEGRAM_BOT_TOKEN" ]; then
        # Escapar caracteres especiales para JSON sin jq
        local escaped_message=$(echo "$message" | sed 's/\\/\\\\/g; s/"/\\"/g; s/\t/\\t/g' | tr '\n' '\a' | sed 's/\a/\\n/g')
        
        curl -s -X POST "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage" \
            -H "Content-Type: application/json" \
            -d "{
                \"chat_id\": \"${TELEGRAM_CHAT_ID}\",
                \"message_thread_id\": \"${thread_id}\",
                \"text\": \"${escaped_message}\",
                \"parse_mode\": \"Markdown\"
            }" > /dev/null
        echo "✅ Reporte enviado a Telegram"
    else
        echo "⚠️ TELEGRAM_BOT_TOKEN no configurado"
        echo "Mensaje generado:"
        echo "$message"
    fi
}

# Generar informe
generate_report() {
    local report=""
    
    # Título
    report+="🛠️ *Informe Diario OpenClaw*\n"
    report+="📅 $(date -u +"%d/%m/%Y") - $(date -u +"%H:%M") UTC\n"
    report+="━━━━━━━━━━━━━━━━━━━━━━\n\n"
    
    # Leer log de ayer y hoy
    local yesterday_log="$MEMORY_DIR/${YESTERDAY}.md"
    local today_log="$MEMORY_DIR/${TODAY}.md"
    
    if [ -f "$yesterday_log" ]; then
        report+="📋 *Actividad de las últimas 24hs:*\n\n"
        
        # Extraer secciones relevantes
        if grep -q "## 🎯 Sesiones Principales" "$yesterday_log" 2>/dev/null; then
            report+="$(grep -A 100 "## 🎯 Sesiones Principales" "$yesterday_log" | grep -B 100 "## 📊 Métricas" | head -50)\n\n"
        fi
        
        if grep -q "## 🐛 Bugs/Issues" "$yesterday_log" 2>/dev/null; then
            report+="🐛 *Issues/Errors:*\n"
            report+="$(grep -A 20 "## 🐛 Bugs/Issues" "$yesterday_log" | head -15)\n\n"
        fi
        
        if grep -q "## 🧠 Learnings" "$yesterday_log" 2>/dev/null; then
            report+="🧠 *Learnings:*\n"
            report+="$(grep -A 20 "## 🧠 Learnings" "$yesterday_log" | head -10)\n\n"
        fi
    fi
    
    # Estado actual del sistema
    report+="━━━━━━━━━━━━━━━━━━━━━━\n"
    report+="📊 *Estado del Sistema:*\n\n"
    
    # Gateway status
    if openclaw gateway status > /dev/null 2>&1; then
        report+="✅ Gateway: Activo\n"
    else
        report+="❌ Gateway: Inactivo\n"
    fi
    
    # Commits pendientes
    cd "$WORKSPACE"
    local pending=$(git rev-list --count origin/master..HEAD 2>/dev/null || echo "0")
    report+="📝 Commits pendientes: $pending\n"
    
    # Agentes activos
    report+="🤖 *Agentes configurados:*\n"
    [ -d "/data/.openclaw/agents/main" ] && report+="  • Spock (main) 🤖\n"
    [ -d "/data/.openclaw/agents/dev" ] && report+="  • Kael (dev) 👨‍💻\n"
    [ -d "/data/.openclaw/agents/lyra" ] && report+="  • Lyra (content) ✍️\n"
    [ -d "/data/.openclaw/agents/radar" ] && report+="  • Radar (trends) 📡\n"
    [ -d "/data/.openclaw/agents/vera" ] && report+="  • Vera (auditor) 📊\n"
    
    # Próximas tareas programadas
    report+="\n⏰ *Próximas tareas:*\n"
    report+="  • Health Check: 3:00 AM AR\n"
    report+="  • Lyra Curation: 7:00 AM AR\n"
    report+="  • Radar Morning Scan: 8:00 AM AR\n"
    report+="  • Daily Report: 8:00 AM AR\n"
    
    echo "$report"
}

# Ejecutar
REPORT=$(generate_report)
send_to_telegram "$REPORT" "$THEME_ID"

echo "Reporte generado: $(date -u +"%Y-%m-%d %H:%M:%S") UTC"
