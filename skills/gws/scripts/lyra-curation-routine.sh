#!/bin/bash
# Lyra - Rutina de Curaduría Diaria
# Ejecución: 7 AM Argentina (10 AM UTC)

set -e

WORKSPACE="/data/.openclaw/workspace"
WORKSPACE_LYRA="/data/.openclaw/workspace-lyra"
OUTPUT_PATH="$WORKSPACE_LYRA/output"
DATE=$(date +"%Y-%m-%d")

echo "🚀 Lyra Curation Routine - $DATE"

# Cargar variables
source "$WORKSPACE/.env" 2>/dev/null || true
mkdir -p "$OUTPUT_PATH"

# ============================================
# Generar contenido base (temas del día)
# ============================================
cat > "$OUTPUT_PATH/curation-$DATE.md" << EOF
# Curaduría Diaria - $DATE

## 🎯 Temas para investigar hoy:

### Tema 1: AI / Tech
- Buscar: AI trends, LLM releases, cybersecurity
- Fuentes sugeridas: Hacker News, TechCrunch, Twitter tech

### Tema 2: Bitcoin / Crypto  
- Buscar: BTC price, ETF flows, regulatory news
- Fuentes sugeridas: CoinDesk, Bitcoin Magazine, Twitter crypto

---

## 📝 Instrucciones:
1. Investigar cada tema con web_search (2-3 fuentes)
2. Crear hilo de Twitter (5-7 tweets por tema)
3. Escribir boletín corto (3-5 puntos clave)
4. Publicar en Notion
5. Enviar resumen a Telegram

---

*Generado automáticamente: $(date -u +"%Y-%m-%d %H:%M:%S") UTC*
EOF

echo "📝 Template generado: $OUTPUT_PATH/curation-$DATE.md"

# ============================================
# Notificar a Telegram
# ============================================
if [[ -n "$TELEGRAM_BOT_TOKEN" && -n "$TELEGRAM_CHAT_ID" ]]; then
    MSG="✍️ *Lyra Curation - $DATE*%0A%0A📋 *Template generado:*%0A$OUTPUT_PATH/curation-$DATE.md%0A%0A⏳ *Próximo paso:* Investigar temas y crear hilos"
    
    curl -s -X POST "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage" \
        -d "chat_id=${TELEGRAM_CHAT_ID}" \
        -d "message_thread_id=38" \
        -d "text=${MSG}" \
        -d "parse_mode=Markdown" > /dev/null 2>&1 || true
    
    echo "📤 Notificación enviada a Telegram"
fi

echo "✅ Lyra routine completada (template generado)"
