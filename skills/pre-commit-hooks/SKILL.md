# pre-commit:hooks - Hooks Automáticos para Calidad de Código

**Inspirado en:** Claude Code Best Practices + Superpowers  
**Autor:** Spock (OpenClaw)  
**Versión:** 1.0  
**Estado:** Activo

---

## 🎯 Propósito

Ejecutar **verificaciones automáticas** antes de commits y pushes:
- Tests deben pasar
- Linting sin errores
- Code review completado
- Formato consistente

**Regla de oro:** NUNCA permitir commits que rompan tests o质量标准.

---

## 📋 Cuándo se activa

**Triggers automáticos:**
- ✅ `git commit` → Pre-commit hook
- ✅ `git push` → Pre-push hook
- ✅ Post-commit → Notificaciones

**Triggers manuales:**
- Usuario pide "corré los tests antes de pushear"
- "Verificá que todo esté bien"

---

## 🔄 Flujo de Trabajo

### Hook 1: Pre-Commit (5-30 seg)

**Qué verifica:**
```bash
#!/bin/bash
# .git/hooks/pre-commit

echo "🔍 Pre-commit checks..."

# 1. Linting
echo "  → Linting..."
npm run lint || { echo "❌ Linting falló"; exit 1; }

# 2. Tests rápidos (unitarios)
echo "  → Tests unitarios..."
npm test -- --bail || { echo "❌ Tests fallaron"; exit 1; }

# 3. Formato
echo "  → Formato..."
npm run format:check || { echo "❌ Formato incorrecto"; exit 1; }

# 4. Secrets scan (no hardcodear tokens)
echo "  → Secrets scan..."
if grep -r "sk-" --include="*.md" --include="*.js" --include="*.py" . 2>/dev/null | grep -v node_modules; then
    echo "❌ Posibles secrets detectados"
    exit 1
fi

echo "✅ Pre-commit OK"
exit 0
```

**Si falla:**
- El commit se BLOQUEA
- Se muestra el error específico
- Usuario debe fixear antes de continuar

---

### Hook 2: Pre-Push (1-5 min)

**Qué verifica:**
```bash
#!/bin/bash
# .git/hooks/pre-push

echo "🚀 Pre-push checks..."

# 1. Tests completos (incluye integración)
echo "  → Tests completos..."
npm test || { echo "❌ Tests fallaron"; exit 1; }

# 2. Code review check (si existe archivo de review)
echo "  → Code review..."
if [[ -f ".github/pull-requests/review-pending.md" ]]; then
    echo "❌ Code review pendiente"
    exit 1
fi

# 3. CHANGELOG actualizado (para features)
echo "  → CHANGELOG..."
if git diff --cached --name-only | grep -q "src/"; then
    if ! git diff --cached --name-only | grep -q "CHANGELOG.md"; then
        echo "⚠️  CHANGELOG no actualizado (warning, no bloquea)"
    fi
fi

# 4. Build funciona
echo "  → Build..."
npm run build || { echo "❌ Build falló"; exit 1; }

echo "✅ Pre-push OK"
exit 0
```

---

### Hook 3: Post-Commit (opcional)

**Qué hace:**
```bash
#!/bin/bash
# .git/hooks/post-commit

# Notificar a Telegram
COMMIT_MSG=$(git log -1 --pretty=%B)
COMMIT_HASH=$(git log -1 --pretty=%h)

curl -s -X POST "https://api.telegram.org/bot$TELEGRAM_BOT_TOKEN/sendMessage" \
    -d "chat_id=$TELEGRAM_CHAT_ID" \
    -d "text=✅ Commit: $COMMIT_HASH%0A%0A$COMMIT_MSG" \
    > /dev/null 2>&1 || true

echo "📤 Notificación enviada a Telegram"
```

---

## 🛠️ Instalación

### Opción 1: Hooks locales (recomendado para desarrollo)

```bash
cd /data/.openclaw/workspace

# Crear carpeta de hooks
mkdir -p .git/hooks

# Copiar hooks
cp skills/pre-commit-hooks/scripts/pre-commit .git/hooks/
cp skills/pre-commit-hooks/scripts/pre-push .git/hooks/
cp skills/pre-commit-hooks/scripts/post-commit .git/hooks/

# Hacer ejecutables
chmod +x .git/hooks/*
```

### Opción 2: Husky (para proyectos Node.js)

```bash
npm install husky --save-dev
npx husky install

# Agregar hooks
npx husky add .husky/pre-commit "npm run lint && npm test"
npx husky add .husky/pre-push "npm run build"
```

### Opción 3: Pre-commit framework (Python/multi-lenguaje)

```bash
pip install pre-commit

# Crear .pre-commit-config.yaml
cat > .pre-commit-config.yaml << EOF
repos:
  - repo: https://github.com/pre-commit/pre-commit-hooks
    rev: v4.4.0
    hooks:
      - id: trailing-whitespace
      - id: end-of-file-fixer
      - id: check-yaml
      - id: detect-private-key
  
  - repo: local
    hooks:
      - id: npm-test
        name: Run Tests
        entry: npm test
        language: system
        pass_filenames: false
EOF

# Instalar
pre-commit install
```

---

## 📝 Scripts Incluidos

### `scripts/pre-commit`
```bash
#!/bin/bash
set -e

echo "🔍 Pre-commit hooks..."

# Linting
if command -v npm &> /dev/null && [[ -f "package.json" ]]; then
    npm run lint || exit 1
fi

# Python linting
if command -v pylint &> /dev/null; then
    git diff --cached --name-only --diff-filter=ACM | grep '\.py$' | xargs -r pylint || exit 1
fi

# Bash linting
if command -v shellcheck &> /dev/null; then
    git diff --cached --name-only --diff-filter=ACM | grep '\.sh$' | xargs -r shellcheck || exit 1
fi

# Secrets scan
echo "🔒 Scanning for secrets..."
if git diff --cached | grep -E "(sk-|pk-|api[_-]?key|token|secret)" | grep -v "^\+" | grep -v "\.env"; then
    echo "❌ Posibles secrets en el diff"
    exit 1
fi

echo "✅ Pre-commit passed"
```

### `scripts/pre-push`
```bash
#!/bin/bash
set -e

echo "🚀 Pre-push hooks..."

# Tests completos
if command -v npm &> /dev/null && [[ -f "package.json" ]]; then
    npm test || exit 1
fi

# Build
if command -v npm &> /dev/null && [[ -f "package.json" ]]; then
    npm run build || exit 1
fi

# Git status limpio (sin cambios sin commitear)
if [[ -n $(git status --porcelain) ]]; then
    echo "⚠️  Hay cambios sin commitear"
fi

echo "✅ Pre-push passed"
```

### `scripts/post-commit`
```bash
#!/bin/bash

# Solo notificar si hay Telegram configurado
if [[ -z "$TELEGRAM_BOT_TOKEN" ]] || [[ -z "$TELEGRAM_CHAT_ID" ]]; then
    exit 0
fi

COMMIT_HASH=$(git log -1 --pretty=%h)
COMMIT_MSG=$(git log -1 --pretty=%s)
BRANCH=$(git branch --show-current)

MSG="📝 *Commit en $BRANCH*%0A%0A\`${COMMIT_HASH}\` $COMMIT_MSG"

curl -s -X POST "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage" \
    -d "chat_id=${TELEGRAM_CHAT_ID}" \
    -d "text=${MSG}" \
    -d "parse_mode=Markdown" \
    > /dev/null 2>&1 || true
```

---

## ✅ Checklist de Configuración

### Instalación inicial:
- [ ] Scripts en `skills/pre-commit-hooks/scripts/`
- [ ] Hooks en `.git/hooks/`
- [ ] Permisos de ejecución (`chmod +x`)
- [ ] Tests de hooks (verificar que corren)

### Por proyecto:
- [ ] `package.json` tiene scripts `lint`, `test`, `build`
- [ ] `.pre-commit-config.yaml` si usa framework
- [ ] `.husky/` configurado si usa Husky

### Verificación:
- [ ] `git commit` dispara pre-commit
- [ ] `git push` dispara pre-push
- [ ] Fallos bloquean correctamente
- [ ] Notificaciones post-commit funcionan

---

## 📚 Ejemplos

### Ejemplo 1: Commit con tests fallando

```bash
$ git commit -m "feat: nueva función"
🔍 Pre-commit hooks...
  → Linting... ✅
  → Tests unitarios... ❌

Test failed: expected 5 but got 4
    at test.js:42:15

❌ Tests fallaron
Commit aborted. Fix errors and try again.
```

### Ejemplo 2: Push exitoso

```bash
$ git push origin main
🚀 Pre-push hooks...
  → Tests completos... ✅ (142 tests)
  → Code review... ✅
  → Build... ✅
✅ Pre-push passed

Enumerating objects: 15, done.
...
```

### Ejemplo 3: Secret detectado

```bash
$ git commit -m "config: agregar API key"
🔍 Pre-commit hooks...
  → Secrets scan... ❌

Possible secret detected:
+ const API_KEY = "sk-1234567890abcdef";

❌ Posibles secrets detectados
Commit aborted. Never commit secrets!
```

---

## ⚠️ Anti-patrones

| ❌ Mal | ✅ Bien |
|-------|--------|
| Hooks que tardan >5 min | Hooks rápidos (<1 min ideal) |
| Tests que fallan aleatoriamente | Tests determinísticos |
| Hooks sin mensaje de error claro | Errores específicos y accionables |
| Bloquear por warnings menores | Warning ≠ error |
| No tener hooks en CI | Hooks locales + CI |

---

## 🔗 Integración con otras skills

| Skill | Integración |
|-------|-------------|
| `spock:code-review` | Review como paso pre-push |
| `kael:tdd` | Tests como parte del pre-commit |
| `git:worktrees` | Hooks corren en cada worktree |

---

## 📖 Referencias

- Git Hooks: https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks
- Husky: https://typicode.github.io/husky/
- Pre-commit Framework: https://pre-commit.com/
- Superpowers TDD: https://github.com/obra/superpowers

---

**Última actualización:** 2026-03-14
