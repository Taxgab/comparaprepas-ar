#!/bin/bash
# Twitter/X Reader - Solo lectura
# Usa el skill bird-twitter configurado

set -a
source /data/.openclaw/workspace/.env
set +a

export AUTH_TOKEN="$TWITTER_AUTH_TOKEN"
export CT0="$TWITTER_CT0"

case "$1" in
    trending)
        echo "🔥 Trending Topics:"
        bird trending
        ;;
    
    home|timeline)
        echo "📰 Tu Timeline:"
        bird home -n ${2:-10}
        ;;
    
    mentions)
        echo "💬 Tus Menciones:"
        bird mentions -n ${2:-10}
        ;;
    
    search)
        echo "🔍 Buscando: $2"
        bird search "$2" -n ${3:-10}
        ;;
    
    user)
        echo "👤 Tweets de @$2:"
        bird user-tweets "$2" -n ${3:-10}
        ;;
    
    read)
        echo "📖 Leyendo tweet:"
        bird read "$2"
        ;;
    
    likes)
        echo "❤️ Tus Likes:"
        bird likes -n ${2:-10}
        ;;
    
    bookmarks)
        echo "🔖 Tus Bookmarks:"
        bird bookmarks -n ${2:-10}
        ;;
    
    whoami)
        bird whoami
        ;;
    
    *)
        echo "🐦 Twitter Reader - Solo Lectura"
        echo ""
        echo "Uso: $0 [comando] [args]"
        echo ""
        echo "Comandos:"
        echo "  trending              - Ver trending topics"
        echo "  home [n]              - Tu timeline (default: 10)"
        echo "  mentions [n]          - Tus menciones (default: 10)"
        echo "  search [query] [n]    - Buscar tweets"
        echo "  user [handle] [n]     - Tweets de un usuario"
        echo "  read [url]            - Leer tweet específico"
        echo "  likes [n]             - Tus likes"
        echo "  bookmarks [n]         - Tus bookmarks"
        echo "  whoami                - Ver cuenta conectada"
        echo ""
        echo "Ejemplos:"
        echo "  $0 trending"
        echo "  $0 home 20"
        echo "  $0 search bitcoin"
        echo "  $0 user elonmusk"
        echo "  $0 read https://x.com/user/status/123456"
        ;;
esac
