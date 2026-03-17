# qmd - Referencia Futura

_Semantic Search Tool for Local Documents_

**URL:** https://github.com/tobi/qmd

**Fecha de referencia:** 2026-03-11

**Versión más reciente:** 2.0.1 (2026-03-10)

---

## 🎯 ¿Qué es qmd?

Herramienta de **búsqueda semántica local** que indexa documentos y permite búsquedas inteligentes.

**Características principales:**
- 🔍 Búsqueda híbrida (BM25 + vectores)
- 📚 Indexación de documentos
- 💾 Almacenamiento en SQLite
- 🧩 SDK como librería (Node.js)
- 🔌 Servidor MCP (Model Context Protocol)

---

## 🏗️ Arquitectura

```
┌─────────────────────────────────────────────────┐
│              qmd (SQLite + SDK)                 │
├─────────────────────────────────────────────────┤
│ 1. Indexación: Documentos → Embeddings          │
│ 2. Búsqueda: BM25 + Vectores (híbrida)          │
│ 3. SDK: QMDStore interface                      │
│ 4. MCP Server: Clean SDK consumer               │
└─────────────────────────────────────────────────┘
```

---

## 🔧 Funcionalidades Clave

| Feature | Descripción |
|---------|-------------|
| **Búsqueda híbrida** | BM25 (keywords) + vectores (semántica) |
| **SDK como librería** | `import { createStore } from '@tobilu/qmd'` |
| **Indexación automática** | Documentos locales → SQLite |
| **Colecciones/Contexto** | Organización de documentos |
| **MCP Server** | Integración con Model Context Protocol |
| **Node 25 support** | Compatible con versiones recientes |

---

## 📋 Comandos Disponibles

```bash
# Instalación
npm install -g @tobilu/qmd

# Indexar documentos
qmd index ./docs

# Búsqueda semántica
qmd search "¿cuándo configuré Notion?"

# Búsqueda con intent
qmd search "performance" --intent "optimización de código"

# Ver colecciones
qmd collections

# Mantenimiento
qmd maintenance
```

---

## 🤔 ¿Cuándo usar qmd?

### ✅ Casos donde sirve:

| Caso | ¿Aplica? | Por qué |
|------|----------|---------|
| **100+ archivos de memoria** | ✅ Sí | Búsqueda eficiente en gran volumen |
| **Búsqueda semántica** | ✅ Sí | Encuentra por significado, no keywords |
| **Documentación extensa** | ✅ Sí | Indexa docs, READMEs, logs |
| **MCP integration** | ✅ Sí | Servidor MCP limpio |

### ❌ Casos donde NO sirve:

| Caso | ¿Aplica? | Por qué |
|------|----------|---------|
| **Workspace chico (<20 archivos)** | ❌ No | Overkill |
| **Búsqueda simple alcanza** | ❌ No | Complejidad innecesaria |
| **Ya tenés memorySearch** | ❌ No | OpenClaw ya lo resuelve |

---

## 🔄 Alternativa: Lo que ya tenés (OpenClaw)

| qmd | OpenClaw (tu setup) |
|-----|---------------------|
| Búsqueda semántica | `memorySearch` con embeddings |
| Indexación SQLite | Archivos Markdown simples |
| SDK complejo | Búsqueda nativa de OpenClaw |
| MCP server | Herramientas nativas |
| SQLite DB | Archivos .md + JSON |

---

## 💡 Ideas para adaptar (futuro)

Si escalás a muchos documentos, podés tomar conceptos:

1. **Búsqueda semántica en memoria** → Mejorar `memorySearch` de OpenClaw
2. **Indexación automática** → Indexar daily logs automáticamente
3. **Colecciones por contexto** → Organizar memoria por temas/proyectos
4. **Snippet extraction** → Extraer fragmentos relevantes en búsquedas

---

## 📊 Veredicto

| Aspecto | Valor |
|---------|-------|
| **¿Lo necesitás ahora?** | ❌ No |
| **¿Es interesante?** | ✅ Sí (tecnología copada) |
| **¿Lo usarías en el futuro?** | 🤔 Quizás (si escalás a 100+ docs) |
| **¿Reemplaza memoria de OpenClaw?** | ❌ No (complementa) |

---

## 🔗 Links Relacionados

- **qmd Repo:** https://github.com/tobi/qmd
- **Releases:** https://github.com/tobi/qmd/releases
- **NPM:** https://www.npmjs.com/package/@tobilu/qmd
- **OpenClaw Memory:** https://docs.openclaw.ai/memory/overview

---

## 📝 Notas de Versión (Relevantes)

### v2.0.1 (2026-03-10)
- qmd skill install copia a `~/.claude/commands/`
- Fix en nombres de archivos GGUF (case-sensitive)
- Fix en symlinked global launcher path

### v2.0.0 (2026-03-10)
- **Stable SDK API** con QMDStore interface
- Unified `search()` para auto-expansion
- MCP server reescrito como SDK consumer
- Node 25 support
- better-sqlite3 ^12.4.5

### v1.1.6 (2026-03-09)
- **SDK / library mode:** `createStore({ dbPath, config })`
- Package exports para TypeScript

---

**Nota:** Este documento es referencia para el futuro. No implementar ahora.

---

_Last updated: 2026-03-11_
