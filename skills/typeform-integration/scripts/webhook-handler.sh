#!/bin/bash
# Typeform Webhook Handler - Procesa respuestas en tiempo real
# Se ejecuta cuando Typeform envía un webhook

set -e

WORKSPACE="/data/.openclaw/workspace"
RESPONSES_DIR="$WORKSPACE/typeform-responses"
LOG_FILE="$RESPONSES_DIR/webhook.log"

mkdir -p "$RESPONSES_DIR"

# Leer payload del webhook (stdin)
PAYLOAD=$(cat)

# Extraer datos clave
FORM_ID=$(echo "$PAYLOAD" | grep -o '"form_id":"[^"]*"' | cut -d'"' -f4 || echo "unknown")
RESPONSE_ID=$(echo "$PAYLOAD" | grep -o '"response_id":"[^"]*"' | cut -d'"' -f4 || echo "unknown")
SUBMITTED_AT=$(echo "$PAYLOAD" | grep -o '"submitted_at":"[^"]*"' | cut -d'"' -f4 || echo "unknown")

TIMESTAMP=$(date -u +"%Y-%m-%d_%H-%M-%S")
OUTPUT_FILE="$RESPONSES_DIR/webhook-${TIMESTAMP}.json"

# Guardar payload completo
echo "$PAYLOAD" | jq '.' > "$OUTPUT_FILE" 2>/dev/null || echo "$PAYLOAD" > "$OUTPUT_FILE"

echo "[$(date -u +"%Y-%m-%d %H:%M:%S")] ✅ Webhook received - Form: $FORM_ID, Response: $RESPONSE_ID" >> "$LOG_FILE"

# Cargar variables de Telegram
source "$WORKSPACE/.env" 2>/dev/null || true

# Enviar notificación a Telegram
if [[ -n "$TELEGRAM_BOT_TOKEN" && -n "$TELEGRAM_CHAT_ID" ]]; then
    curl -s -X POST "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage" \
        -d "chat_id=${TELEGRAM_CHAT_ID}" \
        -d "message_thread_id=38" \
        -d "text=📋 *Typeform: Nueva respuesta*%0A%0AForm ID: \`$FORM_ID\`%0AResponse ID: \`$RESPONSE_ID\`%0A%0AArchivo: \`webhook-${TIMESTAMP}.json\`" \
        -d "parse_mode=Markdown" > /dev/null 2>&1 || true
fi

echo "[$(date -u +"%Y-%m-%d %H:%M:%S")] Done" >> "$LOG_FILE"
