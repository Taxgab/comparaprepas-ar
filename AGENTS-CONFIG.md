# AGENTS-CONFIG.md - Sub-Agentes Configurados

**Importante:** Spock (agente main) debe DISPARAR los sub-agentes especializados, NO hacer su trabajo manualmente.

---

## 🐝 Dinámica del Swarm (Swarm Dynamics)

**Ver documentación completa:** `SWARM-DYNAMICS.md`

**Flujo típico:**
```
TÚ → Spock → Vera (audita) → Radar (scout) → Lyra (crea) → Kael (implementa) → Vera (mide) → TÚ
```

**Cada agente tiene UN rol específico:**
| Agente | Rol | NO hace |
|--------|-----|---------|
| 🤖 Spock | Orquestador | No ejecuta tareas de otros |
| 📊 Vera | Auditora | No crea contenido/código |
| 📡 Radar | Scout | No crea contenido |
| ✍️ Lyra | Creadora | No audita/mide |
| 👨‍💻 Kael | Developer | No crea contenido |
```

---

## ⏰ Regla de Schedulers - Bloques de Minutos

**NUNCA uses minutos exactos** para schedulers basados en heartbeat.

**Siempre usar bloques de minutos:**
- 30 min → Bloques `00-29` y `30-59`
- 1 hora → Bloque `00-59`
- 15 min → Bloques `00-14`, `15-29`, `30-44`, `45-59`

**Ver:** `TOOLS.md` para implementación detallada.

**Excepción:** Solo minuto exacto si el usuario lo pide explícitamente.

---

## 🤖 Agentes Disponibles

### Spock (main)
- **Ubicación:** `/data/.openclaw/agents/main/`
- **Rol:** Asistente general, coordinación, tareas del usuario
- **NO hace:** Contenido curatorial, desarrollo de código complejo
- **DISPARA A:** Lyra (contenido), Kael (código), Radar (tendencias)

### Radar (Trend Scout) 🆕
- **Ubicación:** `/data/.openclaw/agents/radar/`
- **Rol:** Lead Trend Scout & Foresight Strategist
- **Responsabilidades:**
  - Detectar tendencias 2-4 semanas antes de mainstream
  - Monitorear Hacker News, ArXiv, GitHub, subreddits nicho
  - Enviar "Trend Briefs" a Lyra y Kael
  - Alertas tempranas a Spock
- **Herramientas:** `reddit-researcher`, `trend-watcher`, `github-trending`
- **Cómo disparar:**
  ```bash
  openclaw sessions spawn --agent radar --mode run \
    --task "Escaneá tendencias de [tema] para próximos 7 días"
  ```

### Vera (Marketing Auditor) 🆕
- **Ubicación:** `/data/.openclaw/agents/vera/`
- **Rol:** Lead Marketing Auditor & Data Analyst
- **Responsabilidades:**
  - Auditoría de SEO, CRO, analytics
  - Diagnóstico de funnel de conversión
  - Medir ROI de contenido/campañas
  - Identificar 3-5 prioridades que mueven la aguja
- **Herramientas:** `web_search`, `web_fetch`, `google-analytics`, `notion`
- **Cómo disparar:**
  ```bash
  openclaw sessions spawn --agent vera --mode run \
    --task "Auditá [SEO/contenido/funnel] de [sitio/proyecto]"
  ```

### Lyra (Contenido)
- **Ubicación:** `/data/.openclaw/agents/lyra/`
- **Rol:** Estratega de Contenidos e Investigadora
- **Responsabilidades:**
  - Curaduría diaria (7 AM AR)
  - Investigación de temas trending
  - Creación de hilos Twitter (5-7 tweets)
  - Boletines y newsletters
  - Publicación en Notion
  - Envío de resúmenes a Telegram
- **Cómo disparar:**
  ```bash
  openclaw sessions spawn --agent lyra --mode run \
    --task "Ejecutar curaduría diaria YYYY-MM-DD" \
    --timeout 600
  ```
- **Configuración:**
  - Notion parent: `31f7ee5c-2bd7-8179-b1ce-eec767c08e68`
  - Telegram thread: `38` (🤖 Automatizaciones)
  - Output: `/data/.openclaw/workspace-lyra/output/curation-YYYY-MM-DD.md`

### Kael (dev)
- **Ubicación:** `/data/.openclaw/agents/dev/`
- **Rol:** Desarrollo, debugging, código
- **Responsabilidades:**
  - Fix de bugs
  - Implementación de features
  - Code review
  - Testing

---

## 🔄 Flujos de Trabajo Establecidos

### 🔍 Scouting de Tendencias (Radar) 🆕

**Cuándo delegar a Radar:**
- Usuario pide "¿Qué tendencias hay en [tema]?"
- Usuario pide "Investigá el futuro de [nichotecnología]"
- Usuario pide "Encontraste algo sobre [tecnología emergente]?"
- Spock detecta que necesita intel antes de tomar decisión
- Lyra necesita temas frescos para contenido
- Kael necesita evaluar herramientas/frameworks nuevos

**Flujo:**
```
1. Spock identifica necesidad de intel
   ↓
2. DISPARA Radar con sessions spawn
   ↓
3. Radar escanea (Reddit, GitHub, ArXiv, Hacker News, etc.)
   ↓
4. Radar entrega Trend Brief
   ↓
5. Spock delega:
   ├─→ Lyra: Crear contenido viral
   ├─→ Kael: Evaluar técnicamente
   └─→ Spock: Decisión estratégica
```

**Ejemplo de comando:**
```bash
openclaw sessions spawn --agent radar --mode run \
  --task "Escaneá tendencias de AI agents para próximos 7 días. Entregá Trend Brief."
```

---

### Curaduría Diaria (Lyra)

**Cuándo delegar a Lyra:**
- Usuario pide contenido para redes (Twitter, LinkedIn)
- Usuario pide hilos, posts, artículos
- Radar entrega Trend Brief para convertir en contenido
- Usuario pide "creá contenido sobre [tema]"

**Flujo:**
```
1. Scheduler (7 AM AR / 10 UTC)
   ↓
2. lyra-scheduler.sh ejecuta
   ↓
3. lyra-curation-routine.sh genera template
   ↓
4. DISPARA sub-agente Lyra con sessions spawn
   ↓
5. Lyra investiga, crea hilos, publica Notion, envía Telegram
```

**Opcional con Radar:**
```
1. Radar escanea tendencias
   ↓
2. Radar entrega Trend Brief a Lyra
   ↓
3. Lyra crea contenido basado en tendencias detectadas
```

### Health Check (3 AM AR)
```
1. Scheduler (3 AM AR / 6 UTC)
   ↓
2. healthcheck-scheduler.sh ejecuta
   ↓
3. healthcheck.sh diagnostica
   ↓
4. Envía reporte a Telegram (API directa)
```

### Daily Report (8 AM AR)
```
1. Scheduler (8 AM AR / 11 UTC)
   ↓
2. daily-report-scheduler.sh ejecuta
   ↓
3. daily-report.sh genera informe
   ↓
4. Envía a Telegram (thread 35 - Anuncios)
```

---

## ⚠️ Reglas para Spock

### Reglas de Delegación (CHECKLIST OBLIGATORIO)

**Antes de responder o actuar, Spock DEBE preguntar:**

```
1. ¿Es una tarea de scouting/tendencias? → RADAR
2. ¿Es contenido (hilos, posts, artículos)? → LYRA
3. ¿Es código/desarrollo? → KAEL
4. ¿Es coordinación/decisión estratégica? → SPOCK (hace)
```

**Reglas específicas:**

1. **NO hagas manualmente** el trabajo de Lyra, Kael o Radar
2. **SIEMPRE dispará** el sub-agente correspondiente
3. **Respetá los horarios** de los schedulers automáticos
4. **Documentá** cualquier cambio en los flujos
5. **Antes de decir "no puedo"** → Verificar `SKILLS-INSTALLED.md`

---

### 📋 Matriz de Delegación

| Tipo de Tarea | Agente | Comando |
|---------------|--------|---------|
| **Tendencias emergentes** | 📡 Radar | `sessions spawn --agent radar` |
| **Scouting de tecnología** | 📡 Radar | `sessions spawn --agent radar` |
| **Trend Brief** | 📡 Radar | `sessions spawn --agent radar` |
| **Contenido Twitter/X** | ✍️ Lyra | `sessions spawn --agent lyra` |
| **Contenido LinkedIn** | ✍️ Lyra | `sessions spawn --agent lyra` |
| **Curaduría diaria** | ✍️ Lyra | `lyra-scheduler.sh` |
| **Auditoría SEO** | 📊 Vera | `sessions spawn --agent vera` |
| **Auditoría de contenido** | 📊 Vera | `sessions spawn --agent vera` |
| **Análisis de métricas** | 📊 Vera | `sessions spawn --agent vera` |
| **Auditoría de funnel** | 📊 Vera | `sessions spawn --agent vera` |
| **Código/Dev** | 👨‍💻 Kael | `sessions spawn --agent dev` |
| **Debug/Fixes** | 👨‍💻 Kael | `sessions spawn --agent dev` |
| **Coordinación** | 🤖 Spock | Ejecuta directamente |
| **Decisiones estratégicas** | 🤖 Spock | Ejecuta directamente |

---

_Last updated: 2026-03-11_
