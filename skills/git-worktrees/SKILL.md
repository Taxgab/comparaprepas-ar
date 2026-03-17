# git:worktrees - Git Worktrees para Desarrollo Aislado

**Inspirado en:** Claude Code Best Practices (Boris Cherny)  
**Autor:** Spock (OpenClaw)  
**Versión:** 1.0  
**Estado:** Activo

---

## 🎯 Propósito

Crear **branches aislados en carpetas separadas** para:
- Trabajar en múltiples features en paralelo
- Mantener `main` siempre limpio
- Evitar conflictos de merge
- Testing aislado por feature

---

## 📋 Cuándo se activa

**Triggers:**
- ✅ Nueva feature compleja (> 3 tareas)
- ✅ Bug fix que requiere testing extensivo
- ✅ Experimento/refactor riesgoso
- ✅ Múltiples features en paralelo

**No activar para:**
- Cambios simples (< 5 minutos)
- Hotfixes urgentes de producción
- Documentación menor

---

## 🔄 Flujo de Trabajo

### Fase 1: Crear Worktree (2 min)

```bash
# Desde el repo principal
cd /data/.openclaw/workspace

# Crear worktree para nueva feature
git worktree add ../workspace-feature-name -b feature/name

# Ver worktrees existentes
git worktree list
```

**Estructura resultante:**
```
/data/
├── .openclaw/workspace/          # main (producción)
├── .openclaw/workspace-feature1/ # feature/login
├── .openclaw/workspace-feature2/ # feature/dashboard
└── .openclaw/workspace-bugfix/   # bugfix/issue-123
```

---

### Fase 2: Trabajar Aislado (variable)

**Reglas:**
- [ ] Todo commit va al worktree, NO a main
- [ ] Tests deben pasar antes de salir del worktree
- [ ] Documentar cambios en `CHANGELOG.md` del worktree

**Ventajas:**
- `main` siempre estable
- Podés tener 5 features en progreso
- Cada worktree tiene su propio estado (staging, commits)

---

### Fase 3: Review y Merge (5-10 min)

```bash
# Desde el worktree
cd /data/.openclaw/workspace-feature-name

# 1. Correr tests
npm test # o el comando del proyecto

# 2. Code review (usar spock:code-review)
# 3. Si todo OK, mergear a main
cd /data/.openclaw/workspace
git merge feature/name --no-ff
```

---

### Fase 4: Limpiar (2 min)

```bash
# Después de mergear exitosamente
git worktree remove ../workspace-feature-name
git branch -d feature/name
```

---

## 🛠️ Comandos Útiles

| Comando | Descripción |
|---------|-------------|
| `git worktree add ../path -b branch` | Crear nuevo worktree |
| `git worktree list` | Listar worktrees activos |
| `git worktree remove ../path` | Eliminar worktree |
| `git worktree prune` | Limpiar worktrees inválidos |
| `cd ../worktree && git checkout` | Cambiar entre worktrees |

---

## 📝 Convenciones de Nombres

| Tipo | Patrón | Ejemplo |
|------|--------|---------|
| Feature | `feature/nombre` | `feature/login-oauth` |
| Bugfix | `bugfix/issue-NNN` | `bugfix/issue-142` |
| Hotfix | `hotfix/descripcion` | `hotfix/security-patch` |
| Experimento | `experiment/idea` | `experiment/new-arch` |
| Worktree path | `workspace-nombre` | `workspace-login` |

---

## ✅ Checklist por Worktree

### Creación:
- [ ] Branch creado con nombre descriptivo
- [ ] Worktree en carpeta separada
- [ ] `git worktree list` muestra el nuevo

### Desarrollo:
- [ ] Commits frecuentes y atómicos
- [ ] Tests pasan localmente
- [ ] Code review completado

### Merge:
- [ ] Tests pasan en main también
- [ ] Conflictos resueltos
- [ ] Commit de merge con mensaje claro

### Limpieza:
- [ ] Worktree removido
- [ ] Branch eliminado
- [ ] `git worktree list` limpio

---

## 📚 Ejemplos

### Ejemplo 1: Feature nueva

```bash
# Contexto: Crear sistema de backups
cd /data/.openclaw/workspace

# Crear worktree
git worktree add ../workspace-backups -b feature/backups

# Trabajar en el worktree
cd ../workspace-backups
# ... implementar ...
git commit -m "feat: agregar script de backup"

# Review y merge
cd /data/.openclaw/workspace
git merge feature/backups --no-ff -m "feat: sistema de backups"

# Limpiar
git worktree remove ../workspace-backups
git branch -d feature/backups
```

### Ejemplo 2: Múltiples features en paralelo

```bash
# Feature 1: Login
git worktree add ../workspace-login -b feature/login

# Feature 2: Dashboard
git worktree add ../workspace-dashboard -b feature/dashboard

# Trabajar en paralelo:
cd ../workspace-login && # ... implementar login ...
cd ../workspace-dashboard && # ... implementar dashboard ...

# Mergear cuando estén listas
cd /data/.openclaw/workspace
git merge feature/login --no-ff
git merge feature/dashboard --no-ff

# Limpiar
git worktree prune
git branch -d feature/login feature/dashboard
```

---

## ⚠️ Anti-patrones

| ❌ Mal | ✅ Bien |
|-------|--------|
| Commit directo a main | Worktree para features |
| Branch sin worktree | Worktree + branch aislado |
| Mergear sin tests | Tests → Review → Merge |
| No limpiar worktrees | Remove después de merge |
| Nombres vagos | `feature/login-oauth` no `feature1` |

---

## 🔗 Integración con otras skills

| Skill | Integración |
|-------|-------------|
| `spock:planning` | Crear worktree por feature del plan |
| `spock:code-review` | Review antes de mergear |
| `kael:tdd` | Tests en worktree antes de merge |

---

## 📖 Referencias

- Git Worktrees: https://git-scm.com/docs/git-worktree
- Boris Cherny on Worktrees: https://x.com/bcherny/status/2025007393290272904
- Atlassian Git Worktrees: https://www.atlassian.com/git/tutorials/git-worktree

---

**Última actualización:** 2026-03-14
