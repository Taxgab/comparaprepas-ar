#!/bin/bash
# Telegram DM Poller
# Revisa mensajes nuevos de Telegram y los notifica
# Ejecutar desde el heartbeat cada 30 minutos

TELEGRAM_BOT_TOKEN="8342610374:AAH3TAo3sWtT5w8XyLJX5VC0b7NjBatCSpw"
TELEGRAM_ADMIN_ID="533617529"
STATE_FILE="/tmp/telegram-last-update-id"
LOG_FILE="/tmp/openclaw/telegram-poller.log"

log() {
    echo "[$(date -u '+%Y-%m-%d %H:%M:%S UTC')] $1" >> "$LOG_FILE"
}

# Obtener último update ID procesado
LAST_UPDATE_ID=$(cat "$STATE_FILE" 2>/dev/null || echo "-1")

# Obtener updates nuevos
RESPONSE=$(curl -s "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getUpdates?offset=${LAST_UPDATE_ID}&limit=10&timeout=5")

# Extraer updates
UPDATES=$(echo "$RESPONSE" | python3 -c "
import sys, json
try:
    data = json.load(sys.stdin)
    if data.get('ok'):
        results = data.get('result', [])
        for u in results:
            msg = u.get('message', {})
            chat_id = msg.get('chat', {}).get('id')
            text = msg.get('text', '')[:200]
            from_name = msg.get('from', {}).get('first_name', 'Unknown')
            msg_id = msg.get('message_id')
            # Solo DMs (chat tipo 'private')
            if msg.get('chat', {}).get('type') == 'private':
                print(f'DM|{chat_id}|{from_name}|{msg_id}|{text}')
            else:
                print(f'GRP|{chat_id}|{from_name}|{msg_id}|{text}')
except Exception as e:
    print(f'ERROR|{e}')
" 2>/dev/null)

# Procesar updates
NEW_UPDATES=0
while IFS='|' read -r type chat_id from_name msg_id text; do
    if [[ -n "$msg_id" && "$msg_id" -gt "$LAST_UPDATE_ID" ]]; then
        NEW_UPDATES=$((NEW_UPDATES + 1))
        log "[$type] $from_name (chat: $chat_id): $text"
        
        # Si es DM del admin, notificar que fue recibido
        if [[ "$type" == "DM" && "$chat_id" == "$TELEGRAM_ADMIN_ID" ]]; then
            log "→ DM de Gabriel recibido (msg_id: $msg_id)"
        fi
    fi
done <<< "$UPDATES"

# Actualizar último update ID
NEW_MAX_ID=$(echo "$RESPONSE" | python3 -c "
import sys, json
try:
    data = json.load(sys.stdin)
    results = data.get('result', [])
    if results:
        print(max(u.get('update_id', 0) for u in results))
    else:
        print('$LAST_UPDATE_ID')
except:
    print('$LAST_UPDATE_ID')
" 2>/dev/null)

if [[ "$NEW_MAX_ID" != "$LAST_UPDATE_ID" && "$NEW_MAX_ID" != "" ]]; then
    echo "$NEW_MAX_ID" > "$STATE_FILE"
fi

log "✓ Polling completado - $NEW_UPDATES mensajes nuevos"

# Retornar cantidad de mensajes nuevos
echo "$NEW_UPDATES"
