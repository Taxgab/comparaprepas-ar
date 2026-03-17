# AgentHub - Referencia Futura

_Karpathy's Agent-First Collaboration Platform_

**URL:** https://github.com/karpathy/agenthub

**Fecha de referencia:** 2026-03-10

---

## 🎯 ¿Qué es AgentHub?

Plataforma de colaboración para **enjambres de agentes de IA** trabajando en el mismo código base.

**Concepto:** GitHub simplificado para agentes, donde:
- ❌ No hay branch principal
- ❌ No hay PRs ni merges
- ✅ Solo un DAG de commits en todas direcciones
- ✅ Message board para coordinación

---

## 🏗️ Arquitectura

```
┌─────────────────────────────────────────────────┐
│     AgentHub Server (Go + SQLite + Git)         │
├─────────────────────────────────────────────────┤
│ 1. Git: Bare repo + git bundles                 │
│ 2. Message Board: Canales, posts, threads       │
│ 3. Auth: API key por agente + rate limiting     │
└─────────────────────────────────────────────────┘
```

---

## 🔧 Funcionalidades Clave

| Feature | Descripción |
|---------|-------------|
| **Git DAG** | Agentes push commits via bundles |
| **Message Board** | Canales, posts, replies para coordinación |
| **Auth por Agente** | API key única por agente |
| **Rate Limiting** | Límites de pushes/posts por hora |
| **CLI (`ah`)** | Wrapper para agentes usar la API |

---

## 📋 Comandos Disponibles

```bash
# Git operations
ah push                    # Push commit al hub
ah fetch <hash>            # Fetch un commit
ah log [--agent X]         # Commits recientes
ah children <hash>         # Qué se intentó después
ah leaves                  # Commits frontera (sin hijos)
ah lineage <hash>          # Ancestros hasta root
ah diff <a> <b>            # Diff entre commits

# Message board
ah channels                # Listar canales
ah post <channel> <msg>    # Postear
ah read <channel>          # Leer posts
ah reply <post-id> <msg>   # Responder
```

---

## 🤔 ¿Cuándo usar AgentHub?

### ✅ Casos donde sirve:

| Caso | ¿Aplica? | Por qué |
|------|----------|---------|
| **10+ agentes en paralelo** | ✅ Sí | Coordinación masiva |
| **Investigación autónoma** | ✅ Sí | Similar a autoresearch |
| **Experimentos distribuidos** | ✅ Sí | Agentes comparten resultados |
| **Comunidad de agentes** | ✅ Sí | Múltiples humanos contribuyen |

### ❌ Casos donde NO sirve:

| Caso | ¿Aplica? | Por qué |
|------|----------|---------|
| **Single agent** | ❌ No | Overkill |
| **Agente ya tiene memoria** | ❌ No | OpenClaw ya lo resuelve |
| **Coordinación simple** | ❌ No | Telegram + archivos basta |

---

## 🔄 Alternativa: Lo que ya tenés (OpenClaw)

| AgentHub | OpenClaw (tu setup) |
|----------|---------------------|
| Git bare repo | Git normal con workspace |
| Message board | Telegram + archivos de memoria |
| API por agente | `sessions_spawn` con runtime |
| CLI `ah` | Herramientas nativas de OpenClaw |
| SQLite DB | Archivos Markdown + JSON |

---

## 💡 Ideas para adaptar (futuro)

Si escalás a múltiples agentes, podés tomar conceptos:

1. **Message Board en Notion** → Lyra ya guarda curadurías ahí
2. **Git DAG para experimentos** → Cada feature en branch separado
3. **Coordinación vía Telegram** → Ya lo tenés con los grupos
4. **Rate limiting por agente** → Útil si hay muchos subagentes

---

## 📊 Veredicto

| Aspecto | Valor |
|---------|-------|
| **¿Lo necesitás ahora?** | ❌ No |
| **¿Es interesante?** | ✅ Sí (concepto innovador) |
| **¿Lo usarías en el futuro?** | 🤔 Quizás (si escalás a 10+ agentes) |
| **¿Inspiración para tu setup?** | ✅ Sí (message board + git DAG) |

---

## 🔗 Links Relacionados

- **AgentHub Repo:** https://github.com/karpathy/agenthub
- **Autoresearch:** https://github.com/karpathy/autoresearch
- **OpenClaw Subagents:** https://docs.openclaw.ai/tools/subagents

---

**Nota:** Este documento es referencia para el futuro. No implementar ahora.

---

_Last updated: 2026-03-10_
