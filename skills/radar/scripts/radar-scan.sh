#!/bin/bash
# Radar - Script Principal de Escaneo
# Ejecuta todos los scanners y genera Trend Briefs

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
WORKSPACE="/data/.openclaw/workspace"
RADAR_WORKSPACE="$WORKSPACE/skills/radar"
OUTPUT_DIR="$RADAR_WORKSPACE/output"
LOG_FILE="$RADAR_WORKSPACE/morning-scan.log"
STATE_FILE="/tmp/radar-morning-scan.json"

mkdir -p "$OUTPUT_DIR"

log() {
    echo "[$(date -u +"%Y-%m-%d %H:%M:%S UTC")] $1" | tee -a "$LOG_FILE"
}

log "=== 📡 Radar Morning Scan iniciado ==="

# Verificar Node.js
if ! command -v node &> /dev/null; then
    log "❌ Node.js no encontrado"
    exit 1
fi

# Instalar dependencias si faltan
if [ ! -d "$RADAR_WORKSPACE/node_modules" ]; then
    log "📦 Instalando dependencias..."
    cd "$RADAR_WORKSPACE" && npm install --silent 2>/dev/null
fi

log "🔍 Ejecutando scanners..."

# Ejecutar scanners y guardar resultados
cd "$RADAR_WORKSPACE"

log "  → Hacker News..."
node scripts/hn-scan.js 2>/dev/null > "$OUTPUT_DIR/hn-results.json" || echo "[]" > "$OUTPUT_DIR/hn-results.json"

log "  → GitHub Trending..."
node scripts/github-scan.js 2>/dev/null > "$OUTPUT_DIR/github-results.json" || echo "[]" > "$OUTPUT_DIR/github-results.json"

log "  → ArXiv CS.AI..."
node scripts/arxiv-scan.js 2>/dev/null > "$OUTPUT_DIR/arxiv-results.json" || echo "[]" > "$OUTPUT_DIR/arxiv-results.json"

log "  → Reddit..."
node scripts/reddit-scan.js 2>/dev/null > "$OUTPUT_DIR/reddit-results.json" || echo "[]" > "$OUTPUT_DIR/reddit-results.json"

# Contar resultados (usar node para parsear JSON correctamente)
HN_COUNT=$(node -e "try{const d=require('fs').readFileSync('$OUTPUT_DIR/hn-results.json','utf8');console.log(JSON.parse(d).length||0)}catch(e){console.log(0)}")
GH_COUNT=$(node -e "try{const d=require('fs').readFileSync('$OUTPUT_DIR/github-results.json','utf8');console.log(JSON.parse(d).length||0)}catch(e){console.log(0)}")
ARXIV_COUNT=$(node -e "try{const d=require('fs').readFileSync('$OUTPUT_DIR/arxiv-results.json','utf8');console.log(JSON.parse(d).length||0)}catch(e){console.log(0)}")
REDDIT_COUNT=$(node -e "try{const d=require('fs').readFileSync('$OUTPUT_DIR/reddit-results.json','utf8');console.log(JSON.parse(d).length||0)}catch(e){console.log(0)}")
TOTAL=$((HN_COUNT + GH_COUNT + ARXIV_COUNT + REDDIT_COUNT))

log "📊 Resultados: HN=$HN_COUNT, GitHub=$GH_COUNT, ArXiv=$ARXIV_COUNT, Reddit=$REDDIT_COUNT, Total=$TOTAL"

# Generar fecha
DATE=$(date +%Y-%m-%d)

# Crear Trend Briefs manualmente si hay resultados
if [ "$TOTAL" -gt 0 ]; then
    log "📝 Generando Trend Briefs..."
    
    cat > "$OUTPUT_DIR/radar-$DATE.md" << EOF
# 📡 Radar Morning Scan - $DATE

*Escaneo automático de señales débiles en IA y Agentes Autónomos*

**Fuentes:** Hacker News, GitHub Trending, ArXiv CS.AI, Reddit
**Trends detectados:** $TOTAL

---

## 📊 Resumen

| Fuente | Items |
|--------|-------|
| Hacker News | $HN_COUNT |
| GitHub Trending | $GH_COUNT |
| ArXiv CS.AI | $ARXIV_COUNT |
| Reddit | $REDDIT_COUNT |
| **Total** | **$TOTAL** |

---

## 🔍 Top Signals

### Hacker News
EOF
    
    # Extraer top 3 de HN
    node -e "try{const d=JSON.parse(require('fs').readFileSync('$OUTPUT_DIR/hn-results.json','utf8'));d.slice(0,3).forEach(r=>console.log('- '+r.title+' → '+r.url))}catch(e){}" >> "$OUTPUT_DIR/radar-$DATE.md"
    
    cat >> "$OUTPUT_DIR/radar-$DATE.md" << EOF

### GitHub Trending
EOF
    
    node -e "try{const d=JSON.parse(require('fs').readFileSync('$OUTPUT_DIR/github-results.json','utf8'));d.slice(0,3).forEach(r=>console.log('- '+r.name+' → '+r.url))}catch(e){}" >> "$OUTPUT_DIR/radar-$DATE.md"
    
    cat >> "$OUTPUT_DIR/radar-$DATE.md" << EOF

### Reddit
EOF
    
    node -e "try{const d=JSON.parse(require('fs').readFileSync('$OUTPUT_DIR/reddit-results.json','utf8'));d.slice(0,3).forEach(r=>console.log('- ['+r.score+'↑] '+r.title.slice(0,60)+' → '+r.url))}catch(e){}" >> "$OUTPUT_DIR/radar-$DATE.md"
    
    cat >> "$OUTPUT_DIR/radar-$DATE.md" << EOF

---

*Generado automáticamente por Radar - $(date -u +"%Y-%m-%d %H:%M:%S UTC")*
EOF
    
    log "✓ Trend Brief generado: $OUTPUT_DIR/radar-$DATE.md"
else
    log "⚠️ No se detectaron señales relevantes"
    
    cat > "$OUTPUT_DIR/radar-$DATE.md" << EOF
# 📡 Radar Morning Scan - $DATE

*No se detectaron señales relevantes hoy.*

---

*Generado automáticamente por Radar*
EOF
fi

# ============================================
# Publicar en Notion
# ============================================
log "📤 Publicando en Notion..."

NOTION_KEY=$(cat ~/.config/notion/api_key 2>/dev/null || echo "")
PARENT_DB="3217ee5c-2bd7-801b-93b4-d2291504bb82"
NOTION_URL=""

if [ -n "$NOTION_KEY" ] && [ -f "$OUTPUT_DIR/radar-$DATE.md" ]; then
    # Crear página
    PAGE_RESPONSE=$(curl -s -X POST "https://api.notion.com/v1/pages" \
        -H "Authorization: Bearer $NOTION_KEY" \
        -H "Notion-Version: 2025-09-03" \
        -H "Content-Type: application/json" \
        -d "{
            \"parent\": {\"page_id\": \"$PARENT_DB\"},
            \"properties\": {
                \"title\": {\"title\": [{\"text\": {\"content\": \"Radar Morning Scan - $DATE\"}}]}
            }
        }" 2>/dev/null)
    
    PAGE_ID=$(echo "$PAGE_RESPONSE" | grep -o '"id":"[^"]*"' | head -1 | cut -d'"' -f4)
    
    if [ -n "$PAGE_ID" ]; then
        log "✓ Página Notion creada: $PAGE_ID"
        NOTION_URL="https://www.notion.so/$PAGE_ID"
        echo "$NOTION_URL" > "$OUTPUT_DIR/notion-url-$DATE.txt"
        
        # ============================================
        # AGREGAR CONTENIDO COMO BLOQUES
        # ============================================
        log "📝 Agregando contenido a Notion..."
        
        # Leer datos JSON
        HN_DATA=$(cat "$OUTPUT_DIR/hn-results.json" 2>/dev/null)
        REDDIT_DATA=$(cat "$OUTPUT_DIR/reddit-results.json" 2>/dev/null)
        
        # Construir bloques
        BLOCKS="{\"children\":["
        
        # Heading resumen
        BLOCKS+="{\"object\":\"block\",\"type\":\"heading_2\",\"heading_2\":{\"rich_text\":[{\"text\":{\"content\":\"📊 Resumen del Escaneo\"}}]}}"
        BLOCKS+=",{\"object\":\"block\",\"type\":\"paragraph\",\"paragraph\":{\"rich_text\":[{\"text\":{\"content\":\"**Fuentes:** Hacker News, GitHub Trending, ArXiv CS.AI, Reddit\"}}]}}"
        BLOCKS+=",{\"object\":\"block\",\"type\":\"paragraph\",\"paragraph\":{\"rich_text\":[{\"text\":{\"content\":\"**Total señales detectadas:** $TOTAL\"}}]}}"
        
        # Hacker News
        BLOCKS+=",{\"object\":\"block\",\"type\":\"heading_2\",\"heading_2\":{\"rich_text\":[{\"text\":{\"content\":\"📰 Hacker News\"}}]}}"
        BLOCKS+=$(node -e "try{const d=JSON.parse(require('fs').readFileSync('$OUTPUT_DIR/hn-results.json','utf8'));console.log(d.slice(0,5).map(r=>',{\"object\":\"block\",\"type\":\"paragraph\",\"paragraph\":{\"rich_text\":[{\"text\":{\"content\":\"🔥 ['+r.score+' pts] '+r.title.replace(/\"/g,'\\\\\"')+' → '+r.url+'\"}}]}}').join(''))}catch(e){}")
        
        # Reddit
        BLOCKS+=",{\"object\":\"block\",\"type\":\"heading_2\",\"heading_2\":{\"rich_text\":[{\"text\":{\"content\":\"💬 Reddit\"}}]}}"
        BLOCKS+=$(node -e "try{const d=JSON.parse(require('fs').readFileSync('$OUTPUT_DIR/reddit-results.json','utf8'));console.log(d.slice(0,5).map(r=>',{\"object\":\"block\",\"type\":\"paragraph\",\"paragraph\":{\"rich_text\":[{\"text\":{\"content\":\"🔥 ['+r.score+'↑] '+r.title.slice(0,80).replace(/\"/g,'\\\\\"')+' → '+r.url+'\"}}]}}').join(''))}catch(e){}")
        
        BLOCKS+="]}"
        
        # Enviar bloques a Notion
        curl -s -X PATCH "https://api.notion.com/v1/blocks/$PAGE_ID/children" \
            -H "Authorization: Bearer $NOTION_KEY" \
            -H "Notion-Version: 2025-09-03" \
            -H "Content-Type: application/json" \
            -d "$BLOCKS" > /dev/null 2>&1
        
        log "✓ Contenido agregado a Notion"
    fi
fi

# ============================================
# Notificar a Telegram
# ============================================
log "📱 Notificando a Telegram..."

source "$WORKSPACE/.env" 2>/dev/null || true

if [ -n "$TELEGRAM_BOT_TOKEN" ] && [ -n "$TELEGRAM_CHAT_ID" ]; then
    MSG="📡 *Radar Morning Scan - $DATE*%0A%0A"
    MSG+="📊 *Resumen:*%0A"
    MSG+="• Hacker News: $HN_COUNT items%0A"
    MSG+="• GitHub: $GH_COUNT repos%0A"
    MSG+="• ArXiv: $ARXIV_COUNT papers%0A"
    MSG+="• Reddit: $REDDIT_COUNT posts%0A"
    MSG+="• *Total:* $TOTAL señales detectadas%0A%0A"
    
    if [ -n "$NOTION_URL" ]; then
        MSG+="🔗 *Informe:*%0A$NOTION_URL"
    fi
    
    curl -s -X POST "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage" \
        -d "chat_id=${TELEGRAM_CHAT_ID}" \
        -d "message_thread_id=38" \
        -d "text=$MSG" \
        -d "parse_mode=Markdown" > /dev/null 2>&1
    
    log "✓ Notificación enviada a Telegram"
fi

# ============================================
# Actualizar estado
# ============================================
echo "{\"last_run\":\"$DATE\",\"status\":\"success\",\"items\":$TOTAL}" > "$STATE_FILE"

log "=== ✅ Radar Morning Scan completado ==="
echo ""
echo "📊 Resumen:"
echo "  • Total señales: $TOTAL"
echo "  • Brief: $OUTPUT_DIR/radar-$DATE.md"
[ -n "$NOTION_URL" ] && echo "  • Notion: $NOTION_URL"
echo ""

exit 0
