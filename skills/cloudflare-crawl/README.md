# Cloudflare Crawl Skill

Skill para crawlear sitios web completos usando Cloudflare Browser Rendering API.

## 📋 Configuración

### 1. Obtener credenciales de Cloudflare

1. **Account ID:**
   - Logueate en https://dash.cloudflare.com
   - El Account ID aparece en el home dashboard (lado derecho)

2. **API Token:**
   - Ir a: https://dash.cloudflare.com/profile/api-tokens
   - Crear token personalizado
   - Permisos necesarios:
     - `Account` → `Browser Rendering` → `Edit`
   - Copiar el token

### 2. Configurar en .env

Agregar al archivo `/data/.openclaw/workspace/.env`:

```env
# Cloudflare Browser Rendering API
CLOUDFLARE_ACCOUNT_ID=your_account_id
CLOUDFLARE_API_TOKEN=your_api_token
```

---

## 🚀 Comandos

### Iniciar Crawl

```bash
cd /data/.openclaw/workspace/skills/cloudflare-crawl
node scripts/crawl-start.js <url> [maxPages] [maxDepth]
```

**Ejemplo:**
```bash
node scripts/crawl-start.js https://techcrunch.com 50 3
```

### Chequear Status

```bash
node scripts/crawl-status.js <jobId>
```

**Ejemplo:**
```bash
node scripts/crawl-status.js abc123xyz
```

### Lyra Crawl (Recomendado)

```bash
node scripts/lyra-crawl.js [topic] [maxPages]
```

**Ejemplos:**
```bash
# Crawlear todas las fuentes (tech, crypto, ai)
node scripts/lyra-crawl.js all 30

# Solo tech
node scripts/lyra-crawl.js tech 50

# Solo crypto, 20 páginas
node scripts/lyra-crawl.js crypto 20
```

---

## 📁 Estructura

```
cloudflare-crawl/
├── scripts/
│   ├── crawl-start.js      # Iniciar crawl
│   ├── crawl-status.js     # Chequear status
│   └── lyra-crawl.js       # Wrapper para Lyra
├── results/                 # Resultados de crawls
│   └── crawl-<jobId>.json
└── README.md
```

---

## 🔗 API Reference

### Start Crawl

```javascript
const { startCrawl } = require('./scripts/crawl-start');

const job = await startCrawl('https://techcrunch.com', {
  maxPages: 50,
  maxDepth: 3,
  outputFormats: ['markdown', 'json'],
  render: true,
  modifiedSince: '2026-03-10T00:00:00Z', // Solo contenido nuevo
});
```

### Check Status

```javascript
const { checkCrawlStatus } = require('./scripts/crawl-status');

const result = await checkCrawlStatus('job_id_here');

if (result.status === 'completed') {
  console.log('Páginas:', result.urls);
}
```

---

## 💡 Casos de Uso

### 1. Lyra - Curaduría Diaria

```bash
# Crawlear todas las fuentes de noticias (últimas 24hs)
node scripts/lyra-crawl.js all 30
```

**Ventaja:** Obtenés TODO el contenido relevante de una vez.

---

### 2. Monitoreo de Competencia

```bash
# Crawlear sitio de competencia
node scripts/crawl-start.js https://gimnasio-competencia.com 20 2
```

---

### 3. Documentación para RAG

```bash
# Crawlear docs completas
node scripts/crawl-start.js https://docs.example.com 100 5
```

---

## ⚙️ Opciones de Crawl

| Opción | Tipo | Default | Descripción |
|--------|------|---------|-------------|
| `maxPages` | number | 50 | Máximo de páginas a crawlear |
| `maxDepth` | number | 3 | Profundidad máxima del crawl |
| `outputFormats` | array | ['markdown'] | Formatos: html, markdown, json |
| `render` | boolean | true | Renderizar con browser (false = static) |
| `modifiedSince` | string | - | Solo páginas modificadas después |
| `maxAge` | number | - | Edad máxima en segundos |
| `includePatterns` | array | - | Patrones URL para incluir |
| `excludePatterns` | array | - | Patrones URL para excluir |

---

## 🔄 Flujo Asíncrono

```
1. startCrawl() → Job ID
         ↓
2. Poll cada 5-10 segundos
         ↓
3. checkCrawlStatus() → completed
         ↓
4. Resultados en results/crawl-<jobId>.json
```

---

## 📊 Límites y Costos

| Plan | Límite | Costo |
|------|--------|-------|
| **Free** | 100 páginas/día | Gratis |
| **Paid** | 10,000 páginas/día | $0.01 por página |

**Nota:** El crawl es asíncrono y puede tomar varios minutos dependiendo del tamaño del sitio.

---

## 🛡️ Consideraciones Éticas

- ✅ Respeta `robots.txt` por defecto
- ✅ Respeta `crawl-delay`
- ✅ Se identifica como bot
- ❌ No bypassea Cloudflare bot detection

---

## 📚 Documentación Oficial

- [Browser Rendering Docs](https://developers.cloudflare.com/browser-rendering/)
- [Crawl Endpoint](https://developers.cloudflare.com/browser-rendering/rest-api/crawl-endpoint/)
- [Robots.txt Best Practices](https://developers.cloudflare.com/browser-rendering/reference/robots-txt/)

---

**Versión:** 1.0  
**Última actualización:** 2026-03-11
