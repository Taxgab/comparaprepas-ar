# Skills Instaladas - Lista Maestra

**Última actualización:** 2026-03-12

---

## 🔍 Antes de decir "NO PUEDO", consultar esta lista

Si el usuario pide algo, **PRIMERO** buscar acá si hay una skill que lo resuelva.

---

## 📦 Skills Clawhub (instaladas con `clawhub install`)

| Skill | Versión | Descripción | Comandos |
|-------|---------|-------------|----------|
| `self-improving-agent` | 1.0.11 | Aprende de errores y correcciones | Auto-activa |
| `bird-twitter` | 1.0.0 | Lectura de Twitter/X | `bird read <tweet_id>`, `bird trending`, `bird home` |
| `notion` | 1.0.0 | API de Notion | Crear páginas, databases |
| `ethskills` | 1.0.0 | Ethereum development | Solidity, dApps, deployment |
| `typeform-integration` | 3.282 | Formularios Typeform | Crear, leer respuestas |
| `cloudflare-crawl` | - | Crawl de sitios web | `/crawl` endpoint para Lyra |
| `reddit-researcher` 🆕 | 3.321 | Investigación en Reddit | Buscar posts, comentarios, tendencias |
| `trend-watcher` 🆕 | 1.030 | Monitoreo de tendencias | Detectar tendencias emergentes |
| `github-trending` 🆕 | 3.348 | GitHub Trending | Repositorios trending daily/weekly |

---

## 🛠️ Skills del Sistema (OpenClaw)

| Skill | Descripción | Comandos |
|-------|-------------|----------|
| `weather` | Clima via wttr.in | `wttr.in <city>` |
| `github` | Operaciones GitHub via `gh` CLI | Issues, PRs, CI |
| `gws` | Google Workspace CLI | Drive, Calendar, Sheets, Docs |
| `healthcheck` | Auditoría de seguridad | `openclaw healthcheck` |
| `discord` | Discord ops | Canales, mensajes, roles |
| `xurl` | X/Twitter API | Tweets, replies, search |
| `caldav-calendar` | Calendarios CalDAV | iCloud, Google, Fastmail |
| `frontend-design` | Componentes frontend | UI, páginas web |
| `gog` | Google Workspace CLI (alternativo) | Gmail, Calendar, Contacts |
| `skill-creator` | Crear/editar skills | Autoría de AgentSkills |

---

## 📁 Skills Locales (en `skills/`)

| Carpeta | Función | Scripts |
|---------|---------|---------|
| `bird-twitter/` | Twitter/X reader | `twitter-reader.sh` |
| `gws/scripts/` | Google Workspace | `healthcheck.sh`, `lyra-scheduler.sh`, `daily-report.sh` |
| `agentmail/` | Email para IA | `send-email.js`, `receive-emails.js`, `email-scheduler.sh` |
| `cloudflare-crawl/` | Cloudflare Crawl | `crawl-start.js`, `crawl-status.js`, `lyra-crawl.js` |
| `media-transcribe/` | Transcripción audio/video | `transcribe.js`, `youtube-crawl.js`, `slides.js` |
| `typeform-integration/` | Typeform | Scripts de integración |

---

## 🔑 Credenciales en `.env`

| Variable | Servicio | Uso |
|----------|----------|-----|
| `TELEGRAM_BOT_TOKEN` | Telegram Bot | Enviar mensajes a grupos/privados |
| `TELEGRAM_CHAT_ID` | Telegram | Chat ID del usuario |
| `GITHUB_TOKEN` | GitHub | Push automático, issues, PRs |
| `GWS_CLIENT_ID` | Google Workspace | OAuth para Drive, Calendar |
| `GWS_CLIENT_SECRET` | Google Workspace | OAuth secret |
| `TYPEFORM_API_KEY` | Typeform | Crear formularios, leer respuestas |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare | Browser Rendering API |
| `CLOUDFLARE_API_TOKEN` | Cloudflare | API token para crawl |
| `AGENTMAIL_API_KEY` | AgentMail | Email para IA (spock.cco@agentmail.to) |
| `TWITTER_AUTH_TOKEN` | Twitter/X | Autenticación bird-twitter |
| `TWITTER_CT0` | Twitter/X | CSRF token para bird-twitter |
| `NOTION_KEY` | Notion | API key para crear páginas |
| `PERPLEXITY_API_KEY` | Perplexity | Web search via API |
| `ASSEMBLYAI_API_KEY` | AssemblyAI | Transcripción de audio (opcional) |
| `GROQ_API_KEY` | Groq | Whisper transcription (opcional) |
| `GEMINI_API_KEY` | Gemini | Transcripción + generación (opcional) |

---

## 🧠 Checklist ANTES de decir "NO PUEDO"

```
[ ] 1. ¿Hay una skill en clawhub list?
[ ] 2. ¿Hay una skill en skills/?
[ ] 3. ¿Hay una herramienta/tool disponible?
[ ] 4. ¿Hay credenciales en .env relevantes?
[ ] 5. ¿Ya resolví esto antes? (regressions.md)
[ ] 6. ¿Puedo usar web_search o web_fetch?
```

**Regla:** Ejecutar al menos 3 checks antes de responder negativamente.

---

## 🤖 Checklist ANTES de delegar tarea

```
[ ] 1. ¿Es scouting/tendencias? → RADAR 📡
[ ] 2. ¿Es contenido? → LYRA ✍️
[ ] 3. ¿Es auditoría/métricas? → VERA 📊
[ ] 4. ¿Es código? → KAEL 👨‍💻
[ ] 5. ¿Es coordinación? → SPOCK 🤖 (hace directo)
```

**Regla:** NUNCA hacer manualmente lo que otro agente hace mejor.

---

## 📚 Documentación Relacionada

- `regressions.md` - Errores recurrentes y prevenciones
- `TOOLS.md` - Configuraciones específicas del setup
- `AGENTS-CONFIG.md` - Agentes y sus responsabilidades
- `HEARTBEAT.md` - Tareas periódicas automáticas

---

**Compromiso:** Nunca decir "no puedo" sin consultar esta lista primero.
