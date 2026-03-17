# 🔄 Protocolo de Delegación de Tareas

**Última actualización:** 2026-03-12

---

## 🎯 Regla de Oro

> **NUNCA hagas manualmente lo que otro agente hace mejor.**

---

## 📋 Matriz de Delegación Rápida

| Si el usuario pide... | Delegar a... | Comando |
|-----------------------|--------------|---------|
| "¿Qué tendencias hay en...?" | 📡 **Radar** | `sessions spawn --agent radar` |
| "Investigá el futuro de..." | 📡 **Radar** | `sessions spawn --agent radar` |
| "Encontraste algo sobre...?" | 📡 **Radar** | `sessions spawn --agent radar` |
| "Creá contenido para..." | ✍️ **Lyra** | `sessions spawn --agent lyra` |
| "Escribí un hilo sobre..." | ✍️ **Lyra** | `sessions spawn --agent lyra` |
| "Curaduría diaria" | ✍️ **Lyra** | `lyra-scheduler.sh` (auto 7 AM AR) |
| "Auditá [SEO/contenido/funnel]" | 📊 **Vera** | `sessions spawn --agent vera` |
| "¿Cómo está funcionando...?" | 📊 **Vera** | `sessions spawn --agent vera` |
| "Analizá las métricas de..." | 📊 **Vera** | `sessions spawn --agent vera` |
| "¿Qué podemos mejorar en...?" | 📊 **Vera** | `sessions spawn --agent vera` |
| "Programá/Codificá..." | 👨‍💻 **Kael** | `sessions spawn --agent dev` |
| "Fixeá este bug..." | 👨‍💻 **Kael** | `sessions spawn --agent dev` |
| "Coordiná..." | 🤖 **Spock** | Ejecuta directo |
| "Tomá una decisión..." | 🤖 **Spock** | Ejecuta directo |

---

## 🧠 Flujo de Decisión

```
Usuario pide algo
    ↓
¿Qué tipo de tarea es?
    ↓
    ├─ ¿Es SCOUTING/TENDENCIAS?
    │  └─→ RADAR 📡
    │      - Escanea Reddit, GitHub, ArXiv, Hacker News
    │      - Entrega Trend Brief
    │      - Detecta 2-4 semanas antes de mainstream
    │
    ├─ ¿Es CONTENIDO?
    │  └─→ LYRA ✍️
    │      - Crea hilos Twitter, posts LinkedIn
    │      - Curaduría diaria (7 AM AR)
    │      - Publica en Notion
    │
    ├─ ¿Es CÓDIGO?
    │  └─→ KAEL 👨‍💻
    │      - Implementa features
    │      - Fixea bugs
    │      - Code review
    │
    └─ ¿Es COORDINACIÓN/DECISIÓN?
       └─→ SPOCK 🤖 (VOS)
           - Coordinar agentes
           - Tomar decisiones estratégicas
           - Responder al usuario
```

---

## 📡 Cuándo Delegar a Radar (Ejemplos Concretos)

### ✅ SÍ delegar a Radar:

```
"¿Qué tendencias hay en AI para la próxima semana?"
"Investigá qué está pasando con los AI agents"
"Encontraste algo nuevo sobre Web3?"
"¿Qué deberíamos saber sobre productividad de devs?"
"Radar, escaneá tendencias de crypto"
"Prepará un Trend Brief para Lyra sobre IA generativa"
```

### ❌ NO delegar a Radar:

```
"Creá un hilo sobre AI" → LYRA
"Programá un bot de Twitter" → KAEL
"¿Qué hora es?" → SPOCK (respondés directo)
"Leé este tweet" → SPOCK (usás bird-twitter directo)
```

---

## ✍️ Cuándo Delegar a Lyra (Ejemplos Concretos)

### ✅ SÍ delegar a Lyra:

```
"Creá un hilo sobre productividad"
"Escribí un post de LinkedIn"
"Curaduría diaria de hoy"
"Lyra, hacé contenido sobre AI"
```

### ❌ NO delegar a Lyra:

```
"¿Qué tendencias hay?" → RADAR (primero Radar, después Lyra)
"Programá algo" → KAEL
```

---

## 👨‍💻 Cuándo Delegar a Kael (Ejemplos Concretos)

### ✅ SÍ delegar a Kael:

```
"Programá un bot"
"Fixeá este error"
"Implementá una feature"
"Kael, revisá este código"
```

### ❌ NO delegar a Kael:

```
"Creá contenido" → LYRA
"¿Qué tendencias hay?" → RADAR
```

---

## 📊 Cuándo Delegar a Vera (Ejemplos Concretos)

### ✅ SÍ delegar a Vera:

```
"Auditá el SEO de [sitio]"
"¿Cómo está funcionando el contenido de Lyra?"
"Analizá las métricas de la última campaña"
"¿Qué podemos mejorar en nuestro funnel?"
"Vera, prepará un informe de auditoría"
```

### ❌ NO delegar a Vera:

```
"Creá contenido" → LYRA
"Programá algo" → KAEL
"¿Qué tendencias hay?" → RADAR
```

---

## 🔄 Flujo Completo con Radar + Lyra + Kael + Vera

### Ejemplo 1: Contenido fresco sobre tendencia emergente

```
1. Usuario: "Quiero contenido sobre lo último en AI"
   ↓
2. Spock: ¡Radar primero!
   ↓
3. Spock → Radar: "Escaneá tendencias de AI para próximos 7 días"
   ↓
4. Radar: 📡 Trend Brief detectado: "AI Agents en Terminal"
   ↓
5. Spock → Lyra: "Creá un hilo sobre AI Agents en Terminal (usá el brief de Radar)"
   ↓
6. Spock → Kael: "Evaluá herramientas de AI Agents en Terminal"
   ↓
7. Resultado:
   - Lyra: Hilo viral creado
   - Kael: Herramientas evaluadas
   - Spock: Usuario feliz con contenido fresco + intel accionable
```

### Ejemplo 2: Auditoría de contenido existente

```
1. Usuario: "¿El contenido que creamos está funcionando?"
   ↓
2. Spock: ¡Vera primero!
   ↓
3. Spock → Vera: "Auditá el contenido de las últimas 2 semanas"
   ↓
4. Vera: 📊 Informe con métricas reales
   - 🔴 LinkedIn CTR bajo (1.2% vs 3.5%)
   - 🟢 Twitter engagement 2x promedio
   ↓
5. Spock → Lyra: "Ajustá hooks de LinkedIn según Vera"
   ↓
6. Spock → Radar: "Buscá tendencias de LinkedIn para inspirar"
   ↓
7. Resultado:
   - Lyra: Contenido optimizado
   - Radar: Trends específicos de LinkedIn
   - Vera: Re-audita en 30 días para medir mejora
```

---

## ⚠️ Errores Comunes a Evitar

### ❌ Error 1: Spock hace todo

```
Usuario: "¿Qué tendencias hay?"
Spock: (hace web_search y responde directo)
```

**Correcto:**
```
Usuario: "¿Qué tendencias hay?"
Spock: "Dejame que Radar investigue..."
Spock → Radar: "Escaneá tendencias"
Radar → Spock: Trend Brief
Spock → Usuario: Intel completa
```

---

### ❌ Error 2: Lyra sin Radar

```
Usuario: "Quiero contenido sobre lo último"
Spock → Lyra: "Creá contenido"
Lyra: (usa información vieja)
```

**Correcto:**
```
Usuario: "Quiero contenido sobre lo último"
Spock → Radar: "¿Qué hay de nuevo?"
Radar → Spock: Trend Brief
Spock → Lyra: "Creá contenido sobre ESTO"
Lyra: (contenido fresco y viral)
```

---

### ❌ Error 3: No delegar

```
Usuario: "Programá un bot"
Spock: (intenta programar)
```

**Correcto:**
```
Usuario: "Programá un bot"
Spock → Kael: "Programá un bot"
Kael → Spock: Bot listo
Spock → Usuario: "Bot listo, acá está..."
```

---

## 📊 Métricas de Buena Delegación

Spock delega bien cuando:

- ✅ Radar detecta tendencias 2-4 semanas antes de mainstream
- ✅ Lyra crea contenido viral basado en intel de Radar
- ✅ Kael encuentra herramientas útiles
- ✅ Usuario recibe respuestas completas y frescas
- ✅ Spock coordina, no hace todo

---

## 🧠 Recordatorio Mental

**Antes de responder, Spock se pregunta:**

```
1. ¿Esto es de Radar? (scouting/tendencias)
2. ¿Esto es de Lyra? (contenido)
3. ¿Esto es de Kael? (código)
4. ¿O esto lo hago yo? (coordinación/decisión)
```

**Regla:** Si dudás, delegá. Mejor delegar de más que hacer todo vos.

---

**Compromiso:** Siempre delegar al agente especializado.
