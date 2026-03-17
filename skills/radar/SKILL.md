# Radar - Trend Scout Skill

Escaneo automático de fuentes de tecnología para identificar señales débiles de IA y agentes autónomos.

## 📋 Características

- 📡 **Multi-fuente:** Hacker News, GitHub Trending, ArXiv, Reddit
- 🎯 **Filtrado inteligente:** Ignora ruido mainstream, busca señales débiles
- 📝 **Trend Briefs:** Formato estructurado para Lyra
- 🔗 **Integración:** Notion + Telegram + Lyra

---

## 🔧 Instalación

```bash
cd /data/.openclaw/workspace/skills/radar
npm install node-fetch cheerio
```

---

## 🚀 Comandos

### Escaneo matutino completo

```bash
./scripts/radar-scan.sh
```

### Escanear fuente específica

```bash
node scripts/hn-scan.js      # Hacker News
node scripts/github-scan.js  # GitHub Trending
node scripts/arxiv-scan.js   # ArXiv CS.AI
node scripts/reddit-scan.js  # Reddit ML/AI
```

### Generar Trend Briefs

```bash
node scripts/generate-briefs.js
```

---

## 📁 Estructura

```
radar/
├── SKILL.md
├── scripts/
│   ├── radar-scan.sh        # Script principal
│   ├── hn-scan.js           # Hacker News
│   ├── github-scan.js       # GitHub Trending
│   ├── arxiv-scan.js        # ArXiv
│   ├── reddit-scan.js       # Reddit
│   ├── generate-briefs.js   # Genera Trend Briefs
│   └── morning-scan-scheduler.sh
├── output/
│   └── radar-YYYY-MM-DD.md  # Trend Briefs del día
└── morning-scan.log
```

---

## 📡 Fuentes Escaneadas

| Fuente | Qué busca | Frecuencia |
|--------|-----------|------------|
| Hacker News | "agent", "autonomous", "LLM" | Diaria |
| GitHub Trending | AI/ML repos con stars >100 | Diaria |
| ArXiv CS.AI | Papers con "agent", "multi-agent" | Diaria |
| Reddit r/MachineLearning | Posts con score >50 | Diaria |

---

## 🎯 Criterios de Filtrado

**Señales débiles (prioridad alta):**
- Nuevos frameworks de agentes autónomos
- Casos de uso no convencionales de IA
- Herramientas de productividad con IA para devs
- Integraciones surprising entre herramientas

**Ruido (ignorar):**
- Noticias de empresas grandes (OpenAI, Google, etc.)
- Anuncios de funding/rounds
- Posts puramente opinion sin código
- Contenido ya mainstream

---

## 📝 Formato Trend Brief

```markdown
## 📡 Radar Ping #N

**🔥 Temperatura:** XX/100
**📅 Fecha:** YYYY-MM-DD
**📍 Fuente:** Hacker News / GitHub / ArXiv / Reddit

### 👁️ Qué pasa
[Descripción concisa del trend]

### 🧠 Por qué importa
[Impacto potencial, por qué es relevante]

### 🎯 Oportunidad
[Acción concreta o insight accionable]
```

---

## 🔗 Integraciones

### Notion
- Publica en "Radar informes diarios"
- Database ID: `3217ee5c-2bd7-801b-93b4-d2291504bb82`

### Telegram
- Thread 38 del servidor
- Resumen con link a Notion

### Lyra
- Input: Trend Briefs en `output/radar-YYYY-MM-DD.md`
- Lyra crea contenido Twitter/LinkedIn

---

## 🕐 Horario

- **Ejecución:** 8:00 AM Argentina (11:00 UTC)
- **Frecuencia:** Diaria
- **Duración estimada:** 5-10 minutos

---

**Versión:** 1.0
**Última actualización:** 2026-03-13
