#!/bin/bash
# Google Workspace CLI Helper - OpenClaw
# Uso: ./gworkspace.sh [comando] [args]

set -e

export GOOGLE_APPLICATION_CREDENTIALS="/data/.openclaw/workspace/.gws-credentials.json"
export PATH="/data/.openclaw/workspace/google-cloud-sdk/bin:$PATH"

CALENDAR_ID="taxgab@gmail.com"
DRIVE_FOLDER="OpenClaw"

get_token() {
    gcloud auth print-access-token --scopes="$1"
}

case "$1" in
    calendar-list)
        TOKEN=$(get_token "https://www.googleapis.com/auth/calendar")
        curl -s -H "Authorization: Bearer $TOKEN" \
            "https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?maxResults=$2" \
            | python3 -m json.tool
        ;;
    
    calendar-create)
        # Uso: calendar-create "Titulo" "Descripcion" "2026-03-09T10:00:00" "2026-03-09T11:00:00"
        TOKEN=$(get_token "https://www.googleapis.com/auth/calendar")
        curl -s -X POST -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
            "https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events" \
            -d "{
                \"summary\": \"$2\",
                \"description\": \"$3\",
                \"start\": {\"dateTime\": \"$4\", \"timeZone\": \"America/Argentina/Buenos_Aires\"},
                \"end\": {\"dateTime\": \"$5\", \"timeZone\": \"America/Argentina/Buenos_Aires\"}
            }" | python3 -m json.tool
        ;;
    
    calendar-delete)
        TOKEN=$(get_token "https://www.googleapis.com/auth/calendar")
        curl -s -X DELETE -H "Authorization: Bearer $TOKEN" \
            "https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events/$2"
        echo "Evento $2 eliminado"
        ;;
    
    drive-list)
        TOKEN=$(get_token "https://www.googleapis.com/auth/drive")
        curl -s -H "Authorization: Bearer $TOKEN" \
            "https://www.googleapis.com/drive/v3/files?pageSize=$2&supportsAllDrives=true&includeItemsFromAllDrives=true" \
            | python3 -m json.tool
        ;;
    
    drive-upload)
        # Uso: drive-upload archivo.txt "Nombre en Drive"
        TOKEN=$(get_token "https://www.googleapis.com/auth/drive")
        curl -s -X POST -H "Authorization: Bearer $TOKEN" \
            -H "Content-Type: application/octet-stream" \
            "https://www.googleapis.com/upload/drive/v3/files?uploadType=media&name=$2" \
            --data-binary "@$1" \
            | python3 -m json.tool
        ;;
    
    sheets-create)
        # Uso: sheets-create "Nombre de la hoja"
        TOKEN=$(get_token "https://www.googleapis.com/auth/spreadsheets")
        curl -s -X POST -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
            "https://sheets.googleapis.com/v3/spreadsheets" \
            -d "{\"properties\": {\"title\": \"$2\"}}" \
            | python3 -m json.tool
        ;;
    
    *)
        echo "Google Workspace Helper - OpenClaw"
        echo ""
        echo "Uso: $0 [comando] [args]"
        echo ""
        echo "Comandos disponibles:"
        echo "  calendar-list [max]              - Listar eventos del calendario"
        echo "  calendar-create [titulo] [desc] [inicio] [fin] - Crear evento"
        echo "  calendar-delete [event_id]       - Eliminar evento"
        echo "  drive-list [max]                 - Listar archivos de Drive"
        echo "  drive-upload [archivo] [nombre]  - Subir archivo a Drive"
        echo "  sheets-create [nombre]           - Crear Google Sheet"
        echo ""
        echo "Ejemplos:"
        echo "  $0 calendar-list 10"
        echo "  $0 calendar-create \"Reunión\" \"Con el cliente\" \"2026-03-09T10:00:00-03:00\" \"2026-03-09T11:00:00-03:00\""
        echo "  $0 drive-list 20"
        echo "  $0 drive-upload /tmp/test.txt \"test.txt\""
        echo "  $0 sheets-create \"Mi Hoja\""
        ;;
esac
