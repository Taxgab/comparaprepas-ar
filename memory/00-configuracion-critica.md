# ⚙️ CONFIGURACIÓN CRÍTICA - MEMORIA PERMANENTE

**Este archivo NUNCA debe borrarse.** Contiene configuraciones que NO deben reconfigurarse.

---

## 📡 IDs de Canales (PERMANENTES)

### Telegram
- **Grupo:** `-1003642418702`
- **Thread Automatizaciones:** `38`
- **Bot Token:** `$TELEGRAM_BOT_TOKEN` (ver `.env`)

### Discord
- **Lyra:** `1482027396193583244`
- **Radar:** `1482027354799996951`
- **Bot Token:** `$DISCORD_BOT_TOKEN` (ver `.env`)

### Twitter/X
- **Usuario:** @gabipuricelli
- **AUTH_TOKEN:** `$TWITTER_AUTH_TOKEN` (ver `.env`, ⚠️ verificar vigencia)
- **CT0:** `$TWITTER_CT0` (ver `.env`)

---

## 📍 Datos del Usuario (PERMANENTES)

- **Nombre:** Gabriel Puricelli (Taxgab)
- **Timezone:** America/Argentina/Buenos_Aires (UTC-3)
- **GitHub:** Taxgab
- **Email:** taxgab@gmail.com

---

## 🤖 Agentes Disponibles

- `main` - Agente principal (Spock)
- `lyra` - Curación de contenido
- `radar` - Señales débiles / trends
- `dev` - Kael (GitHub, code review)
- `vera` - Security checks

---

## 📅 Horarios de Ejecución (UTC → AR)

| Agente | UTC | AR | Frecuencia |
|--------|-----|----|------------|
| Vera Security | 06:00 | 03:00 | Diario |
| Lyra Curation | 00, 06, 10, 12, 18 | 21, 03, 07, 09, 15 | Cada 6h + 10 UTC |
| Radar Scan | 11:00 | 08:00 | Diario |
| Kael GitHub | 02, 14 | 23, 11 | Cada 12h |

---

## 📂 Rutas Críticas

- **Workspace:** `/data/.openclaw/workspace`
- **Output:** `/data/.openclaw/workspace/output`
- **Logs:** `/tmp/openclaw/`
- **Config:** `/data/.openclaw/.env`, `/data/.openclaw/openclaw.json`

---

## ⚠️ LECCIONES APRENDIDAS

### 2026-03-16 - Configuración repetida 3 veces
**Problema:** Se perdió la configuración de canales (Telegram/Discord) entre sesiones.
**Causa:** Memoria de largo plazo no persistía configuraciones críticas.
**Solución:** 
1. Este archivo `00-configuracion-critica.md` se carga SIEMPRE
2. `CONFIG-SISTEMA.md` con backup completo
3. Commits automáticos a GitHub con cada cambio

---

**REGLA DE ORO:** Si configurás un ID, token o ruta, guardalo en ESTE ARCHIVO inmediatamente.
