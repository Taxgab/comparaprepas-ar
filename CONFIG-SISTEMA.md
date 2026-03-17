# 🔧 CONFIGURACIÓN DEL SISTEMA - NO BORRAR

**Última actualización:** 2026-03-16 14:10 UTC
**Versión:** 1.0

---

## 📡 CANALES DE COMUNICACIÓN

### Telegram
| Parámetro | Valor | Notas |
|-----------|-------|-------|
| Bot Token | `$TELEGRAM_BOT_TOKEN` (ver `.env`) | Bot: @Umbra501bot |
| Chat ID (Gabriel) | `533617529` | Chat directo |
| Grupo ID | `-1003642418702` | Grupo Taxgab.ink |
| Thread Automatizaciones | `38` | Thread para reports |

### Discord
| Parámetro | Valor | Notas |
|-----------|-------|-------|
| Bot Token | `$DISCORD_BOT_TOKEN` | Bot: Spock (ver `.env`) |
| Canal Lyra | `1482027396193583244` | Curación de contenido |
| Canal Radar | `1482027354799996951` | Señales débiles |
| Canal Main | `1479095447741272066` | Canal principal |

### Twitter/X
| Parámetro | Valor | Notas |
|-----------|-------|-------|
| AUTH_TOKEN | `$TWITTER_AUTH_TOKEN` (ver `.env`) | ⚠️ Verificar vigencia |
| CT0 | `$TWITTER_CT0` (ver `.env`) | ⚠️ Verificar vigencia |
| Usuario | @gabipuricelli | Cuenta de Gabriel |

---

## 🔑 API KEYS Y CREDENCIALES

### Google Workspace
| Parámetro | Valor |
|-----------|-------|
| GWS_CLIENT_ID | `$GWS_CLIENT_ID` (ver `.env`) |
| GWS_CLIENT_SECRET | `$GWS_CLIENT_SECRET` (ver `.env`) |
| GCP_PROJECT | `google-workspace-cli` |

### GitHub
| Parámetro | Valor |
|-----------|-------|
| GITHUB_TOKEN | `$GITHUB_TOKEN` (ver `.env`) |
| Repo Principal | `github.com/Taxgab/OpenClaw-Spock` |

### Notion
| Parámetro | Valor | Notas |
|-----------|-------|-------|
| API Key | `$NOTION_API_KEY` (ver `.env`) | |
| Radar Page ID | `3217ee5c-2bd7-801b-93b4-d2291504bb82` | Radar informes diarios |
| Lyra Page ID | `31f7ee5c-2bd7-8179-b1ce-eec767c08e68` | Lyra curación |

### AgentMail
| Parámetro | Valor |
|-----------|-------|
| API_KEY | `$AGENTMAIL_API_KEY` (ver `.env`) |

### Cloudflare (Browser Rendering)
| Parámetro | Valor |
|-----------|-------|
| ACCOUNT_ID | `$CLOUDFLARE_ACCOUNT_ID` (ver `.env`) |
| API_TOKEN | `$CLOUDFLARE_API_TOKEN` (ver `.env`) |

### Typeform
| Parámetro | Valor |
|-----------|-------|
| API_KEY | `$TYPEFORM_API_KEY` (ver `.env`) |

### OpenRouter
| Parámetro | Valor |
|-----------|-------|
| API_KEY | `$OPENROUTER_API_KEY` (ver `.env`) |

### OpenClaw Gateway
| Parámetro | Valor |
|-----------|-------|
| TOKEN | `$OPENCLAW_GATEWAY_TOKEN` (ver `.env`) |

### Bailian (Qwen)
| Parámetro | Valor |
|-----------|-------|
| API_KEY | `$BAILIAN_API_KEY` (ver `.env`) |

---

## 🤖 SUB-AGENTES CONFIGURADOS

| Agente | ID | Propósito | Horario |
|--------|-----|-----------|---------|
| Lyra | `lyra` | Curación de contenido IA/tech | 00, 06, 10, 12, 18 UTC |
| Radar | `radar` | Señales débiles, trends | 11:00 UTC diario |
| Kael | `dev` | GitHub review, code | 02, 14 UTC |
| Vera | `dev` | Security check | 06:00 UTC diario |

---

## 📂 RUTAS IMPORTANTES

| Ruta | Propósito |
|------|-----------|
| `/data/.openclaw/workspace` | Workspace principal |
| `/data/.openclaw/workspace-lyra` | Output de Lyra |
| `/data/.openclaw/workspace/output` | Reports generados |
| `/tmp/openclaw/` | Logs del sistema |
| `/data/.openclaw/.env` | Variables de entorno |
| `/data/.openclaw/openclaw.json` | Configuración OpenClaw |

---

## 📋 SCRIPTS PRINCIPALES

| Script | Propósito |
|--------|-----------|
| `skills/gws/scripts/master-scheduler.sh` | Scheduler principal (heartbeat) |
| `skills/gws/scripts/lyra-scheduler.sh` | Lyra curation routine |
| `skills/radar/scripts/morning-scan-scheduler.sh` | Radar morning scan |
| `skills/gws/scripts/discord-publisher.sh` | Publicar en Discord |

---

## ⚠️ RECORDATORIOS IMPORTANTES

1. **LOS IDS DE CANALES NO CAMBIAN** - Una vez configurados, son permanentes
2. **Los tokens pueden expirar** - Twitter, Google, GitHub requieren renovación periódica
3. **Esta configuración es CRÍTICA** - No borrar ni modificar sin backup
4. **Verificar Twitter** - Token actual puede estar expirado (último error: 2026-03-16)

---

## 🔧 COMANDOS DE VERIFICACIÓN

```bash
# Verificar Discord (reemplazar $DISCORD_BOT_TOKEN con valor de .env)
bird whoami  # Para Twitter
curl -H "Authorization: Bot $DISCORD_BOT_TOKEN" https://discord.com/api/v10/users/@me

# Verificar Telegram (reemplazar $TELEGRAM_BOT_TOKEN con valor de .env)
curl https://api.telegram.org/bot$TELEGRAM_BOT_TOKEN/getMe

# Verificar GitHub
gh auth status
```

---

**Archivo crítico para continuidad del sistema.**
**Guardar en:** `/data/.openclaw/workspace/CONFIG-SISTEMA.md`
**Backup automático:** Commit a GitHub con cada cambio
