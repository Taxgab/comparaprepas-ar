# agent:teams - Múltiples Agentes en Paralelo

**Inspirado en:** Claude Code Best Practices (Agent Teams)  
**Autor:** Spock (OpenClaw)  
**Versión:** 1.0  
**Estado:** Activo

---

## 🎯 Propósito

Coordinar **múltiples agentes trabajando en paralelo** para:
- Acelerar features complejas
- Separar concerns (backend vs frontend vs tests)
- Revisión cruzada entre agentes
- Mayor throughput de desarrollo

---

## 📋 Cuándo se activa

**Triggers:**
- ✅ Feature compleja con múltiples componentes
- ✅ Deadline ajustado que requiere velocidad
- ✅ Tareas independientes que pueden paralelizarse
- ✅ Code review + implementación simultánea

**No activar para:**
- Tareas simples (< 15 minutos)
- Cambios que requieren contexto compartido
- Cuando el overhead de coordinación > beneficio

---

## 🔄 Flujo de Trabajo

### Fase 1: Planificar División (5 min)

**Analizar la feature y dividir en streams independientes:**

```markdown
## Feature: Sistema de Autenticación

### Stream 1: Backend (Kael)
- API endpoints (/login, /logout, /refresh)
- JWT token generation
- Session management

### Stream 2: Frontend (Kael-FE)
- Login form UI
- Token storage
- Auth state management

### Stream 3: Tests (Kael-QA)
- Unit tests para backend
- Integration tests
- E2E tests

### Stream 4: Docs (Lyra)
- API documentation
- User guide
- Changelog
```

**Reglas de división:**
- Cada stream debe ser INDEPENDIENTE
- Minimizar puntos de sincronización
- Definir interfaces claras entre streams

---

### Fase 2: Spawnear Equipos (2-3 min)

**Desde Spock (coordinador):**

```bash
# Stream 1: Backend
sessions_spawn --runtime subagent --agentId dev \
  --label "auth-backend" \
  --task "Implementar API de autenticación: /login, /logout, /refresh. Usar JWT."

# Stream 2: Frontend
sessions_spawn --runtime subagent --agentId dev \
  --label "auth-frontend" \
  --task "Crear UI de login con form, validación y auth state."

# Stream 3: Tests
sessions_spawn --runtime subagent --agentId dev \
  --label "auth-tests" \
  --task "Escribir tests unitarios y de integración para auth."

# Stream 4: Docs
sessions_spawn --runtime subagent --agentId lyra \
  --label "auth-docs" \
  --task "Documentar API de autenticación y crear guía de usuario."
```

---

### Fase 3: Monitoreo Paralelo (variable)

**Spock monitorea el progreso:**

```bash
# Check status de cada agente
subagents list

# Ver logs específicos
sessions_history --sessionKey auth-backend
sessions_history --sessionKey auth-frontend
```

**Puntos de sincronización:**
- Cada 30 min: Check de progreso
- Cuando un stream bloquea a otro: Intervención inmediata
- Cuando todos terminan: Fase de integración

---

### Fase 4: Integración (10-20 min)

**Cuando todos los streams completan:**

```markdown
## Checklist de Integración

### Backend + Frontend
- [ ] API endpoints responden correctamente
- [ ] Frontend consume API sin errores
- [ ] Tokens se generan y validan

### Tests
- [ ] Todos los tests pasan
- [ ] Coverage > 80%
- [ ] Tests E2E verdes

### Docs
- [ ] API docs actualizadas
- [ ] README incluye ejemplos
- [ ] CHANGELOG.md actualizado
```

**Comandos de integración:**
```bash
# Mergear todos los cambios
cd /data/.openclaw/workspace

# Verificar tests
npm test

# Build final
npm run build

# Commit consolidado
git add -A
git commit -m "feat: sistema de autenticación completo

Streams:
- Backend: API endpoints + JWT
- Frontend: Login UI + auth state
- Tests: Unit + integration + E2E
- Docs: API docs + user guide

Agentes: @dev @dev-fe @dev-qa @lyra"
```

---

### Fase 5: Review Cruzado (5-10 min)

**Los agentes se revisan entre sí:**

```markdown
## Review Matrix

| Reviewer | Reviewa | Estado |
|----------|---------|--------|
| Kael (backend) | Tests de backend | ✅ |
| Kael-QA | Código backend | ✅ |
| Kael-FE | Integración frontend | ✅ |
| Spock | Todo + code quality | ✅ |
```

---

## 🛠️ Comandos Útiles

| Comando | Descripción |
|---------|-------------|
| `sessions_spawn --label X --task Y` | Crear nuevo agente |
| `subagents list` | Ver agentes activos |
| `sessions_history --sessionKey X` | Ver historial de agente |
| `sessions_send --label X --message Y` | Enviar mensaje a agente |
| `subagents kill --target X` | Terminar agente |

---

## 📊 Patrones de Equipos

### Patrón 1: Feature Completa

```
Spock (Coordinador)
├── Kael-Backend (API, DB)
├── Kael-Frontend (UI, UX)
├── Kael-QA (Tests)
└── Lyra (Docs, Contenido)
```

**Ideal para:** Features full-stack completas

---

### Patrón 2: Review en Paralelo

```
Spock (Coordinador)
├── Kael-Implementa (Código nuevo)
└── Kael-Review (Code review simultáneo)
```

**Ideal para:** Features críticas que necesitan review inmediato

---

### Patrón 3: Migración

```
Spock (Coordinador)
├── Kael-V1 (Mantener v1)
├── Kael-V2 (Construir v2)
└── Kael-Migrate (Script de migración)
```

**Ideal para:** Migraciones grandes sin downtime

---

### Patrón 4: Bug Squad

```
Spock (Coordinador)
├── Kael-Diagnóstico (Root cause)
├── Kael-Fix (Implementar fix)
└── Kael-Verify (Verificar fix + tests)
```

**Ideal para:** Bugs críticos que requieren velocidad

---

## ✅ Checklist por Equipo

### Setup:
- [ ] Streams definidos y documentados
- [ ] Agentes spawneados con labels claros
- [ ] Interfaces entre streams definidas

### Durante:
- [ ] Check-ins cada 30 min
- [ ] Bloqueos resueltos rápidamente
- [ ] Comunicación clara entre agentes

### Integración:
- [ ] Todos los streams completados
- [ ] Tests pasando
- [ ] Review cruzado completado

### Cleanup:
- [ ] Agentes terminados (kill)
- [ ] Commits consolidados
- [ ] Lecciones aprendidas documentadas

---

## 📚 Ejemplos

### Ejemplo 1: Feature completa

**Input:** "Crear sistema de pagos con Stripe"

**Equipos:**
```bash
# Backend
sessions_spawn --label "payments-backend" --task "
  Integrar Stripe API:
  - Crear customer
  - Crear payment intent
  - Webhook handler
  - Guardar en DB
"

# Frontend
sessions_spawn --label "payments-frontend" --task "
  UI de pagos:
  - Stripe Elements form
  - Manejo de estados (loading, success, error)
  - Historial de pagos
"

# Tests
sessions_spawn --label "payments-tests" --task "
  Tests de pagos:
  - Mock de Stripe API
  - Tests de webhook
  - E2E con Stripe test mode
"
```

**Resultado:** Feature completa en 2 horas vs 6 horas secuencial

---

### Ejemplo 2: Bug crítico

**Input:** "Usuarios no pueden hacer login - URGENTE"

**Equipos:**
```bash
# Diagnóstico
sessions_spawn --label "bug-diagnosis" --task "
  Identificar root cause del bug de login.
  Revisar logs, DB, auth flow.
"

# Fix (en paralelo)
sessions_spawn --label "bug-fix" --task "
  Esperando diagnóstico. Preparado para implementar fix.
"
```

**Timeline:**
- 0-5 min: Diagnóstico identifica el problema
- 5-15 min: Fix implementado
- 15-25 min: Tests + deploy

---

## ⚠️ Anti-patrones

| ❌ Mal | ✅ Bien |
|-------|--------|
| Agentes duplicando trabajo | Streams claramente separados |
| Sin puntos de sincronización | Check-ins regulares |
| Demasiados agentes (>5) | Equipos pequeños (2-4) |
| Comunicación confusa | Labels claros, tareas específicas |
| No limpiar agentes | Kill después de completar |

---

## 🔗 Integración con otras skills

| Skill | Integración |
|-------|-------------|
| `spock:planning` | Plan define streams del equipo |
| `spock:code-review` | Review cruzado entre agentes |
| `git:worktrees` | Cada agente en worktree separado |
| `pre-commit:hooks` | Tests corren antes de integrar |

---

## 📖 Referencias

- Claude Code Agent Teams: https://code.claude.com/docs/en/agent-teams
- Boris Cherny on Teams: https://x.com/bcherny/status/2019472394696683904
- OpenClaw sessions_spawn: /data/.openclaw/workspace/docs/

---

**Última actualización:** 2026-03-14
