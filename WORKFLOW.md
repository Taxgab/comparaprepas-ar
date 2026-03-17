# 🔄 Workflow Global de Desarrollo

**Política de trabajo para TODOS los proyectos del workspace**

Esta política aplica a todos los repositorios y desarrollos realizados en este workspace de OpenClaw.

---

## 📋 Política de Pull Requests (PRs)

### Principios Generales

- ✅ **PRs tempranas:** Abrí una PR apenas el cambio tenga forma y se entienda el objetivo
- ✅ **No esperar al final:** No esperes a "terminar todo" para abrir la PR
- ✅ **Commits chicos:** Trabajá con commits chicos y temáticos
- ✅ **Push frecuente:** Hacé push cada 1 a 3 commits, o cada vez que cierres una unidad lógica verificable
- ✅ **Una PR por feature:** Mantené una sola PR por objetivo coherente

---

## 🎯 Qué incluir en una PR

### ✅ SÍ incluir:

- Cambios relacionados con un único feature/objetivo
- Commits que cuentan una historia lógica
- Tests para la nueva funcionalidad
- Documentación actualizada si corresponde

### ❌ NO mezclar en la misma PR:

- Features + refactor
- Fixes no relacionados
- Cambios de formato masivos
- Trabajo incidental no esencial

---

## 📏 Tamaño de PRs

| Tamaño | Líneas | Acción |
|--------|--------|--------|
| 🟢 Chica | < 400 | ✅ Ideal para review rápido |
| 🟡 Mediana | 400-800 | ✅ Aceptable, review en una sentada |
| 🔴 Grande | > 800 | ⚠️ Considerar dividir en múltiples PRs |

**Regla:** Si la PR supera ~800 líneas o mezcla concerns, partila en PRs más chicas.

---

## 🔀 Flujo de Trabajo Recomendado

```
1. Crear rama desde master/main
   ↓
2. Desarrollar feature (commits chicos)
   ↓
3. PR temprana (WIP si es necesario)
   ↓
4. Push cada 2-3 commits
   ↓
5. Review + feedback
   ↓
6. Ajustes
   ↓
7. Merge a master/main
```

---

## 📝 Convenciones de Commits

### Formato:

```
<tipo>: <descripción corta>

[descripción opcional más detallada]
```

### Tipos:

| Tipo | Descripción | Ejemplo |
|------|-------------|---------|
| `feat` | Nueva funcionalidad | `feat: alta de alumnos con validación` |
| `fix` | Corrección de bug | `fix: corregir cálculo de porcentaje` |
| `docs` | Cambios en documentación | `docs: agregar workflow de PRs` |
| `style` | Formato, sin cambios de lógica | `style: formato según prettier` |
| `refactor` | Refactor de código existente | `refactor: separar lógica de pagos` |
| `test` | Agregar/modificar tests | `test: agregar tests para CRUD` |
| `chore` | Tareas de mantenimiento | `chore: actualizar dependencias` |

### Ejemplos de buenos commits:

```bash
feat: alta de alumnos con validación de DNI

fix: corregir cálculo de porcentaje profesor

docs: agregar workflow de PRs

refactor: separar lógica de pagos en módulo

test: agregar tests para CRUD de profesores

chore: actualizar version de Node.js
```

---

## 🏷️ Naming de Ramas

### Formato:

```
<tipo>/<descripcion-corta>
```

### Ejemplos:

```bash
feat/alta-alumnos
fix/calculo-porcentajes
docs/workflow-prs
refactor/modulo-pagos
test/integration-email
chore/update-deps
```

---

## 📊 Checklist de PR

Antes de marcar una PR como lista para review:

- [ ] El código compila/ejecuta sin errores
- [ ] Los tests pasan (si corresponde)
- [ ] La descripción explica el "qué" y "por qué"
- [ ] Los commits son atómicos y temáticos
- [ ] No hay cambios de formato no relacionados
- [ ] La PR tiene un tamaño razonable (< 800 líneas)
- [ ] Se asignaron reviewers correspondientes

---

## 🔍 Proceso de Review

### Para el autor:

1. Abrir PR lo antes posible (incluso WIP)
2. Responder feedback en < 48hs (si es posible)
3. Mantener la PR actualizada con master/main
4. Squash commits si hay muchos commits de "fix"

### Para el reviewer:

1. Review en < 48hs (si es posible)
2. Comentarios constructivos y específicos
3. Aprobar o pedir cambios claros
4. No aprobar si hay issues de seguridad

---

## 🚫 Anti-patrones a Evitar

### ❌ PR "Megacommit"

```
❌ Un solo commit con 2000 líneas y 5 features
✅ Múltiples commits de 100-200 líneas cada uno
```

### ❌ PR "Cajón de sastre"

```
❌ feat + fix + refactor + style en una PR
✅ Una PR por tipo de cambio
```

### ❌ PR "Fantasma"

```
❌ Abrir PR y desaparecer por 2 semanas
✅ Mantener comunicación y updates frecuentes
```

### ❌ PR "Formato masivo"

```
❌ Cambiar indentación de 50 archivos en una PR con features
✅ PR separada solo para cambios de formato
```

---

## 📞 Comunicación

### Canales:

- **GitHub Issues:** Bugs y features requests
- **PR Comments:** Discusión de cambios específicos
- **Telegram:** Consultas rápidas y coordinación

### Cuándo comunicar:

- ✅ PR abierta (avisar en Telegram)
- ✅ Review solicitado
- ✅ Merge realizado
- ✅ Bloqueo o impedimento

---

## 🎯 Objetivos

Esta política busca:

1. **Reviews más rápidos** - PRs chicas se revisan en minutos
2. **Menos conflictos** - Merge frecuente reduce conflictos
3. **Mejor calidad** - Feedback continuo mejora el código
4. **Transparencia** - Todos ven el progreso en tiempo real
5. **Menos stress** - No hay "PRs gigantes" de última hora

---

## 📁 Proyectos que siguen esta política

| Proyecto | Repo | Estado |
|----------|------|--------|
| Go Magic Gym | github.com/Taxgab/go-magic-gym | ✅ Activo |
| OpenClaw Workspace | github.com/Taxgab/OpenClaw-Spock | ✅ Activo |
| AgentMail Skills | Local + GitHub | ✅ Activo |
| Typeform Integration | Local + GitHub | ✅ Activo |
| Lyra Curation | Local + GitHub | ✅ Activo |

---

## 📚 Referencias

- [GitHub Pull Requests](https://docs.github.com/es/pull-requests)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Atomic Commits](https://www.freshconsulting.com/atomic-commits/)
- [The PR Guide](https://github.com/google/eng-practices)

---

**Versión:** 1.0  
**Última actualización:** 2026-03-11  
**Aplica a:** Todos los proyectos del workspace  
**Revisión:** Anual o cuando haya cambios significativos

---

## ✅ Compromiso del Agente

Como agente de este workspace, me comprometo a:

1. ✅ Seguir esta política en TODOS los proyectos
2. ✅ Abrir PRs tempranas y frecuentes
3. ✅ Mantener commits atómicos y temáticos
4. ✅ No mezclar concerns en una misma PR
5. ✅ Mantener PRs bajo 800 líneas
6. ✅ Usar convenciones de commits
7. ✅ Documentar cambios en cada PR

---

**Firmado:** Spock AI Agent  
**Fecha:** 2026-03-11  
**Email:** spock.cco@agentmail.to
