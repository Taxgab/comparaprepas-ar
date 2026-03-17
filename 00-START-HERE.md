# ⚙️ CONFIGURACIÓN CRÍTICA - LEER PRIMERO

**Última actualización:** 2026-03-16 14:15 UTC  
**Versión:** 1.0

**Este archivo se carga en TODAS las sesiones (main y sub-agentes).**

---

## 📡 Canales de Comunicación (PERMANENTES)

### Telegram
| Parámetro | Valor | Notas |
|-----------|-------|-------|
| Bot Token | `$TELEGRAM_BOT_TOKEN` | Ver `.env` |
| Chat ID (Gabriel) | `533617529` | Chat directo |
| Grupo ID | `-1003642418702` | Grupo Taxgab.ink |
| Thread Automatizaciones | `38` | Thread para reports |

### Discord
| Parámetro | Valor | Notas |
|-----------|-------|-------|
| Bot Token | `$DISCORD_BOT_TOKEN` | Ver `.env` |
| Canal Lyra | `1482027396193583244` | Curación de contenido |
| Canal Radar | `1482027354799996951` | Señales débiles |
| Canal Main | `1479095447741272066` | Canal principal |

### Twitter/X
| Parámetro | Valor | Notas |
|-----------|-------|-------|
| Usuario | @gabipuricelli | Cuenta de Gabriel |
| AUTH_TOKEN | `$TWITTER_AUTH_TOKEN` | Ver `.env`, ⚠️ Verificar vigencia |
| CT0 | `$TWITTER_CT0` | Ver `.env` |

---

## 📂 Rutas Críticas (NO CAMBIAN)

| Ruta | Propósito |
|------|-----------|
| `/data/.openclaw/workspace` | Workspace principal |
| `/data/.openclaw/workspace/output` | Reports generados |
| `/data/.openclaw/workspace-lyra` | Output de Lyra |
| `/tmp/openclaw/` | Logs del sistema |

---

## 🤖 Agentes Disponibles

| Agente | ID | Rol | Cuándo usar |
|--------|-----|-----|-------------|
| Spock | `main` | Coordinador | Tareas generales, coordinación |
| Kael | `dev` | Developer | Código, debugging, fixes |
| Lyra | `lyra` | Contenido | Hilos, posts, curaduría |
| Radar | `radar` | Scout | Tendencias, investigación |
| Vera | `vera` | Auditora | SEO, métricas, auditorías |

---

## 🔑 API Keys (Verificar en .env)

**Las keys completas están en `/data/.openclaw/.env` y `CONFIG-SISTEMA.md`**

| Servicio | Variable | Estado |
|----------|----------|--------|
| Telegram | `TELEGRAM_BOT_TOKEN` | ✅ Configurado |
| Discord | En `CONFIG-SISTEMA.md` | ✅ Configurado |
| OpenRouter | `OPENROUTER_API_KEY` | ✅ Configurado |
| GitHub | En `CONFIG-SISTEMA.md` | ✅ Configurado |
| Google | En `CONFIG-SISTEMA.md` | ✅ Configurado |

---

## ⚠️ REGLAS DE ORO

1. **LOS IDS DE CANALES NO CAMBIAN** - Una vez configurados, son permanentes
2. **Si perdés configuración** → Leer `CONFIG-SISTEMA.md` (backup completo)
3. **Si hay duda** → Este archivo tiene prioridad sobre cualquier otro
4. **Tokens pueden expirar** - Twitter, Google requieren renovación periódica
5. **Nunca modificar sin backup** - Siempre commit a GitHub antes de cambiar

---

## 📋 Archivos de Configuración (Jerarquía)

| Prioridad | Archivo | Propósito |
|-----------|---------|-----------|
| 1️⃣ | `00-START-HERE.md` | Configuración crítica (este archivo) |
| 2️⃣ | `CONFIG-SISTEMA.md` | Backup completo con todas las keys |
| 3️⃣ | `memory/00-configuracion-critica.md` | Memoria permanente de config |
| 4️⃣ | `.env` | Variables de entorno (no committed) |
| 5️⃣ | `openclaw.json` | Configuración de OpenClaw |

---

## 🔧 Verificación Rápida

```bash
# Verificar configuración crítica
./scripts/verify-config.sh

# Verificar Telegram (reemplazar $TELEGRAM_BOT_TOKEN con valor de .env)
curl -s https://api.telegram.org/bot$TELEGRAM_BOT_TOKEN/getMe

# Verificar Discord (reemplazar $DISCORD_BOT_TOKEN con valor de .env)
curl -s -H "Authorization: Bot $DISCORD_BOT_TOKEN" \
  https://discord.com/api/v10/users/@me

# Verificar GitHub
gh auth status
```

---

**Última verificación:** 2026-03-16 14:15 UTC  
**Próxima verificación:** 2026-03-19 (heartbeat)
