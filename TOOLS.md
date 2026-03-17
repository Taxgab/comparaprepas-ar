# TOOLS.md - Local Notes

Skills define _how_ tools work. This file is for _your_ specifics — the stuff that's unique to your setup.

---

## 📡 Configuración de Canales

### Discord
| Canal | ID | Propósito |
|-------|-----|-----------|
| Lyra | `1482027396193583244` | Curación de contenido IA/tech |
| Radar | `1482027354799996951` | Señales débiles, trends |
| Spock (main) | `1479095447741272066` | Canal principal |

### Telegram
| Destino | ID | Thread | Propósito |
|---------|-----|--------|-----------|
| Grupo | `-1003642418702` | `38` | Automatizaciones - Reports de Lyra/Radar |
| Direct (Gabriel) | `533617529` | - | Chat directo |

---

## ✅ MULTI-CANAL CONFIGURADO (PERMANENTE)

**Estado:** ✅ ACTIVO desde 2026-03-16 20:06 UTC

**Configuración:** Agente `main` escucha en TODOS los canales simultáneamente:
- ✅ Webchat
- ✅ Telegram (DMs + Grupos)
- ✅ Discord

**Bindinds en `openclaw.json`:**
```json
{
  "bindings": [
    {"agentId": "main", "match": {"channel": "webchat"}},
    {"agentId": "main", "match": {"channel": "telegram"}},
    {"agentId": "main", "match": {"channel": "discord"}}
  ]
}
```

**Resultado:** Los mensajes de CUALQUIER canal llegan a la MISMA sesión. No más mensajes perdidos.

---

## 🔧 Scripts de Publicación

### Discord Publisher
```bash
# Uso: ./discord-publisher.sh <channel_id> <message>
./skills/gws/scripts/discord-publisher.sh "1482027396193583244" "Mensaje de prueba"
```

### Telegram (vía Bot API)
```bash
# Uso directo con curl
curl -X POST "https://api.telegram.org/bot<TOKEN>/sendMessage" \
  -d "chat_id=-1003642418702" \
  -d "message_thread_id=38" \
  -d "text=Mensaje" \
  -d "parse_mode=Markdown"
```

### Telegram DM Poller
```bash
# Revisa DMs nuevos (automático desde heartbeat)
# NOTA: Ahora es redundante porque multi-canal está activo
./skills/gws/scripts/telegram-dm-poller.sh
```

---

## 🛠️ Herramientas de Edición de Archivos

### ✅ USAR `write` (RECOMENDADO)

**Cuándo usar:**
- Archivos `.md` pequeños (<10KB)
- Archivos de configuración
- SOUL.md, AGENT.md, STYLE_GUIDE.md
- Cualquier archivo que cambie seguido

**Por qué:**
- No requiere coincidencia exacta
- No falla por whitespace invisible
- Reescribe todo el archivo consistentemente
- 100% confiable

**Ejemplo:**
```bash
write path/to/file.md <contenido completo>
```

### ❌ EVITAR `edit`

**Cuándo NO usar:**
- Archivos de configuración
- Archivos `.md` pequeños
- Archivos que cambian seguido

**Por qué falla:**
- Requiere coincidencia EXACTA (carácter por carácter)
- Diferencias invisibles (espacios, tabs, saltos) rompen el match
- Impredecible

**Si tenés que usar `edit`:**
- Copiá el texto EXACTO del archivo (incluyendo espacios)
- Usá un editor que muestre whitespace
- Verificá carácter por carácter

---

## 📊 Tabla de Decisión

| Situación | Herramienta | Por qué |
|-----------|-------------|---------|
| Archivo <10KB | `write` | Más confiable |
| Archivo de config | `write` | Sin riesgos de match |
| SOUL.md, AGENT.md | `write` | Cambia seguido |
| Cambio quirúrgico en texto grande | `edit` | Más eficiente |
| Archivo >100KB | `edit` | `write` es lento |

---

## 🧠 Regla Mnemotécnica

> **"Chicos usan write, Grandes usan edit"**

- Archivos **Chicos** (<10KB) → `write`
- Archivos **Grandes** (>100KB) → `edit`

---

## ⚠️ LECCIÓN APRENDIDA (2026-03-12)

**Problema:** Múltiples fallos con `edit` en archivos `.md`  
**Causa:** Whitespace invisible rompía el match  
**Solución:** Usar `write` siempre para archivos de configuración  
**Resultado:** 100% de éxito, 0 fallos

**Documentado en:** `memory/regressions.md`

---

## 📋 Publicación Automática

### Flujo Lyra Curation
1. Heartbeat → `master-scheduler.sh`
2. Spawn sub-agente `lyra`
3. Lyra investiga → guarda en `workspace-lyra/output/`
4. `lyra-scheduler.sh` notifica inicio en Telegram + Discord
5. Main agent recibe resultado → publica detalles

### Flujo Radar Scan
1. Heartbeat → `master-scheduler.sh` (11:00 UTC)
2. `morning-scan-scheduler.sh` → notifica inicio
3. Spawn sub-agente `radar`
4. Radar escanea → crea 3 Trend Briefs
5. Publica automáticamente en Telegram + Discord

---

## 🔍 Comandos de Verificación

```bash
# Verificar configuración crítica
./scripts/verify-config.sh

# Verificar bindings multi-canal
python3 -c "import json; d=json.load(open('/data/.openclaw/openclaw.json')); \
  [print(f\"{b['agentId']}: {b['match']}\") for b in d.get('bindings',[])]"

# Verificar Telegram (reemplazar $TELEGRAM_BOT_TOKEN con valor real de .env)
curl -s https://api.telegram.org/bot$TELEGRAM_BOT_TOKEN/getMe

# Verificar Discord (reemplazar $DISCORD_BOT_TOKEN con valor real de .env)
curl -s -H "Authorization: Bot $DISCORD_BOT_TOKEN" \
  https://discord.com/api/v10/users/@me

# Verificar GitHub
gh auth status

# Ver últimos mensajes de Telegram (test multi-canal)
curl -s "https://api.telegram.org/bot$TELEGRAM_BOT_TOKEN/getUpdates?offset=-1&limit=5" | python3 -m json.tool
```

---

_Last updated: 2026-03-16 20:06 UTC - MULTI-CANAL ACTIVO_
