#!/bin/bash
# Discord Publisher Helper
# Publica mensajes en canales de Discord usando la API
# Uso: ./discord-publisher.sh <channel_id> <message>
# Nota: Requiere DISCORD_BOT_TOKEN en .env

DISCORD_TOKEN="${DISCORD_BOT_TOKEN:-}"
DISCORD_API="https://discord.com/api/v10"

if [[ -z "$DISCORD_TOKEN" ]]; then
    echo "Error: DISCORD_BOT_TOKEN no está configurado en .env"
    exit 1
fi

CHANNEL_ID="$1"
MESSAGE="$2"

if [[ -z "$CHANNEL_ID" || -z "$MESSAGE" ]]; then
    echo "Uso: $0 <channel_id> <message>"
    exit 1
fi

# Escape special characters for JSON
MESSAGE_JSON=$(echo "$MESSAGE" | python3 -c "import sys,json; print(json.dumps(sys.stdin.read()))" 2>/dev/null || echo "\"$MESSAGE\"")

# Send message to Discord
curl -s -X POST "$DISCORD_API/channels/$CHANNEL_ID/messages" \
    -H "Authorization: Bot $DISCORD_TOKEN" \
    -H "Content-Type: application/json" \
    -d "{\"content\": $MESSAGE_JSON}" \
    -w "\nHTTP Status: %{http_code}\n"
