# HEARTBEAT.md

**Tareas periódicas del sistema** - Ejecutado cada ~30 minutos

---

## 🔍 Verificación de Configuración (Cada 3 días)

**Importante:** Previene pérdida de configuración de canales.

```bash
# Ejecutar cada 3 días (días 1, 4, 7, 10, etc.)
DAY=$(date -u +%d)
if (( DAY % 3 == 1 )); then
    /data/.openclaw/workspace/scripts/verify-config.sh
fi
```

**Si falla:** Restaurar desde GitHub o `CONFIG-SISTEMA.md`

---

## 📋 Schedulers Automáticos

| Tarea | Horario (AR) | Horario (UTC) | Script |
|-------|--------------|---------------|--------|
| 🛠️ Health Check | 3:00 AM | 06:00 | `skills/gws/scripts/master-scheduler.sh` |
| ✍️ Lyra Curation | 15:00 | 18:00 | `skills/gws/scripts/master-scheduler.sh` |
| 📡 Radar Morning Scan | 8:00 AM | 11:00 | `skills/gws/scripts/master-scheduler.sh` |
| 📊 Daily Report | 8:00 AM | 11:00 | `skills/gws/scripts/master-scheduler.sh` |
| 📧 AgentMail | Cada 30 min | :00 y :30 | `skills/gws/scripts/master-scheduler.sh` |

---

## 🔄 Ejecutar en cada Heartbeat

```bash
# Master Scheduler - Ejecuta todas las tareas automáticamente según la hora
/data/.openclaw/workspace/skills/gws/scripts/master-scheduler.sh
```

> **Nota:** El master scheduler verifica la hora UTC y ejecuta solo las tareas correspondientes:
> - Health Check → 06:00 UTC (3 AM AR)
> - Lyra Curation → 18:00 UTC (15:00 AR)
> - Radar + Daily Report → 11:00 UTC (8 AM AR)
> - AgentMail → Siempre (cada 30 min)

---

## 🤖 Sub-Agentes Programados

### Lyra - Curación de Contenido + Twitter Threads (diario)

**Horario:** 18 UTC → 15:00 AR

**Publicación:**
- Discord: Canal Lyra `1482027396193583244`
- Telegram: Grupo `-1003642418702`, Thread `38` (automatizaciones)
- Twitter: 2 hilos con los temas más atractivos para @gabipuricelli

```bash
# Verificar si es hora (18 UTC)
HOUR_UTC=$(date -u +%H)
if [[ "$HOUR_UTC" == "18" ]]; then
    # Paso 1: Lyra Curation
    openclaw sessions spawn \
        --runtime subagent \
        --agentId lyra \
        --mode run \
        --label "lyra-curation" \
        --task "Buscar y curar contenido trending sobre IA y tecnología. Crear 3 trend briefs. Publicar en Discord (1482027396193583244) y Telegram (-1003642418702 thread 38)."
    
    # Paso 2: Generar Twitter Threads (se ejecuta después de curation)
    openclaw sessions spawn \
        --runtime subagent \
        --agentId lyra \
        --mode run \
        --label "lyra-twitter-threads" \
        --task "Elegí los 2 temas más atractivos para Twitter de la Lyra Curation de hoy. Generá 2 hilos de Twitter para @gabipuricelli (5-8 tweets cada uno, hook fuerte, valor concreto, CTA al final, hashtags solo en último tweet). El main agent publicará vía xurl."
fi
```

### Kael - Revisión de GitHub (cada 12 horas)

**Horarios:** 02, 14 UTC → 23, 11 AR

```bash
# Verificar si es hora (02, 14 UTC)
HOUR_UTC=$(date -u +%H)
if [[ "$HOUR_UTC" == "02" || "$HOUR_UTC" == "14" ]]; then
    openclaw sessions spawn \
        --runtime subagent \
        --agentId dev \
        --mode run \
        --label "kael-github" \
        --task "Revisar issues y PRs pendientes en github.com/Taxgab/OpenClaw-Spock. Implementar fixes críticos y reportar."
fi
```

### Radar - Búsqueda de Tendencias (diario)

**Horario:** 11 UTC → 08 AM AR

**Publicación:**
- Discord: Canal Radar `1482027354799996951`
- Telegram: Grupo `-1003642418702`, Thread `38` (automatizaciones)

```bash
# Verificar si es hora (11 UTC)
HOUR_UTC=$(date -u +%H)
if [[ "$HOUR_UTC" == "11" ]]; then
    openclaw sessions spawn \
        --runtime subagent \
        --agentId radar \
        --mode run \
        --label "radar-scan" \
        --task "Escanear Hacker News, GitHub Trending, ArXiv y Reddit. Identificar 3 señales débiles sobre IA y agentes autónomos. Crear Trend Briefs. Publicar en Discord (1482027354799996951) y Telegram (-1003642418702 thread 38)."
fi
```

### Vera - Verificación de Seguridad (diario)

**Horario:** 06 UTC → 03 AM AR

```bash
# Verificar si es hora (06 UTC)
HOUR_UTC=$(date -u +%H)
if [[ "$HOUR_UTC" == "06" ]]; then
    openclaw sessions spawn \
        --runtime subagent \
        --agentId dev \
        --mode run \
        --label "vera-security" \
        --task "Verificar seguridad del sistema: revisar permisos, logs de errores, credenciales expuestas en .env, y generar reporte de vulnerabilidades."
fi
```

---

## 🕐 Resumen de Horarios (Argentina = UTC-3)

| Sub-Agente | Hora UTC | Hora AR | Frecuencia |
|------------|----------|---------|------------|
| Lyra Curation + Twitter | 18 | 15 | Diario |
| Kael GitHub | 02, 14 | 23, 11 | Cada 12 horas |
| Radar Scan | 11 | 08 | Diario |
| Vera Security | 06 | 03 | Diario |

---

## 📡 Radar Morning Scan - Protocolo de Escaneo Matutino

**Scheduler:** `skills/radar/scripts/morning-scan-scheduler.sh`

**Horario:** 8:00 AM Argentina (11:00 UTC)

**Objetivo:** Alimentar Twitter con contenido de altísimo valor sobre IA y Agentes Autónomos.

**Flujo:**
1. Radar escanea (últimas 24-48hs):
   - Hacker News
   - GitHub Trending
   - ArXiv (CS.AI)
   - Foros de nicho (Reddit, Discord)

2. Radar ignora ruido mainstream y busca 3 señales débiles:
   - Nuevos frameworks de agentes autónomos
   - Casos de uso de IA no convencionales
   - Herramientas de productividad con IA para devs

3. Radar entrega 3 Trend Briefs (formato estricto):
   - 📡 Radar Ping
   - 🔥 Temperatura
   - 👁️ Qué pasa
   - 🧠 Por qué importa
   - 🎯 Oportunidad

4. Publicar en:
   - **Discord:** Canal Radar `1482027354799996951`
   - **Telegram:** Grupo `-1003642418702`, Thread `38` (automatizaciones)

**Output esperado:**
- 3 Trend Briefs completos
- Mensajes en Discord y Telegram

---

## ✍️ Lyra Curation + Twitter Threads - Protocolo de Curación

**Horario:** 15:00 Argentina (18:00 UTC) - Diario

**Objetivo:** Crear contenido curado sobre IA y tecnología + generar hilos de Twitter.

**Flujo:**
1. Lyra investiga tendencias actuales
2. Crea 3 trend briefs con insights accionables
3. Publica en:
   - **Discord:** Canal Lyra `1482027396193583244`
   - **Telegram:** Grupo `-1003642418702`, Thread `38` (automatizaciones)
4. **Twitter:** Lyra elige los 2 temas más atractivos y genera 2 hilos (5-8 tweets c/u)
5. Main agent publica hilos en Twitter vía xurl (o guarda para manual si no hay créditos)

**Formato Twitter Threads:**
- Hook fuerte en tweet 1
- Valor concreto en cada tweet
- Emojis estratégicos
- CTA al final para engagement
- Hashtags solo en último tweet

---

## 📧 AgentMail - Políticas de Seguridad

| Remitente | Tipo | Tratamiento |
|-----------|------|-------------|
| `taxgab@gmail.com` | 🔒 PRIVADO | Acceso a info sensible, sistema, claves |
| Cualquier otro | 📮 PÚBLICO | Sin acceso a información privada |

---

## ⚠️ Cuándo Alertar

| Prioridad | Cuándo | Ejemplo |
|-----------|--------|---------|
| 🔴 **Inmediata** | Errores graves, gateway caído | "Gateway no responde" |
| 🟡 **Horario decente** | Memoria, git push pendiente | "Commits sin push" |
| 🟢 **No molestar** | 23:00-08:00 AR (excepto urgencias) | Health Check ok |

---

## 📚 Referencias

- **Logs:** `/tmp/openclaw/openclaw-*.log`
- **AgentMail:** `skills/agentmail/scripts/scheduler.log`
- **Config:** `.env`

---

## 🔧 Configuración de Canales

### Discord
| Canal | ID | Propósito |
|-------|-----|-----------|
| Lyra | `1482027396193583244` | Curación de contenido IA/tech |
| Radar | `1482027354799996951` | Señales débiles, trends |

### Telegram
| Destino | ID | Thread | Propósito |
|---------|-----|--------|-----------|
| Grupo | `-1003642418702` | `38` | Automatizaciones - Reports de Lyra/Radar |

---

**Versión:** 3.2  
**Última actualización:** 2026-03-17 10:50 UTC
