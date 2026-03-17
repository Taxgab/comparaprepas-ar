# spock:code-review - Review Sistemático de Código

**Inspirado en:** Superpowers `requesting-code-review`  
**Autor:** Spock (OpenClaw)  
**Versión:** 1.0  
**Estado:** Activo

---

## 🎯 Propósito

Revisar código **antes de hacer push** para detectar:
- Bugs potenciales
- Desviaciones del plan
- Problemas de seguridad
- Código innecesario
- Mejoras de calidad

---

## 📋 Cuándo se activa

**Triggers obligatorios:**
- ✅ Kael terminó una tarea de coding
- ✅ Spock escribió código complejo (>50 líneas)
- ✅ Antes de cualquier `git push`
- ✅ Nueva feature completada

**Triggers opcionales:**
- PR abierto en GitHub
- Usuario pide "revisá este código"
- Después de refactor grande

---

## 🔄 Flujo de Trabajo

### Fase 1: Contexto (2 min)

```markdown
1. ¿Qué archivo(s) se revisan?
2. ¿Cuál era el objetivo original?
3. ¿Hay plan/spec de referencia?
4. ¿Qué cambios se hicieron?
```

**Acción:** Leer plan original si existe (`memory/plans/`)

---

### Fase 2: Review estático (5-10 min)

#### Checklist de review:

| Categoría | Qué buscar |
|-----------|------------|
| **Correctitud** | ¿El código hace lo que debería? |
| **Seguridad** | ¿Hay datos sensibles expuestos? ¿Inyecciones? |
| **Calidad** | ¿Nombres claros? ¿Funciones cortas? |
| **TDD** | ¿Hay tests? ¿Cubren casos críticos? |
| **DRY** | ¿Hay duplicación innecesaria? |
| **YAGNI** | ¿Hay código que no se usa? |
| **Errores** | ¿Manejo adecuado de errores? |
| **Logs** | ¿Logging suficiente para debug? |

---

### Fase 3: Clasificar hallazgos (3 min)

| Severidad | Acción | Ejemplo |
|-----------|--------|---------|
| 🔴 **CRÍTICO** | Bloquea push | Bug de seguridad, lógica rota |
| 🟡 **IMPORTANTE** | Corregir antes de merge | Código duplicado, nombres confusos |
| 🟢 **SUGERENCIA** | Opcional | Mejoras de estilo, optimizaciones |

---

### Fase 4: Reportar resultados (2-5 min)

**Formato de reporte:**

```markdown
## 🔍 Code Review: [Archivo/Feature]

**Reviewer:** Spock  
**Fecha:** YYYY-MM-DD  
**Estado:** ✅ Aprobado / ⚠️ Con cambios / ❌ Rechazado

### Resumen
- 🔴 Críticos: X
- 🟡 Importantes: Y
- 🟢 Sugerencias: Z

### Hallazgos

#### 🔴 CRÍTICO #1: [Título]
**Ubicación:** `path/to/file.ext:línea`  
**Problema:** Descripción clara  
**Impacto:** Qué puede pasar si no se fija  
**Fix sugerido:** Código o descripción de la solución

#### 🟡 IMPORTANTE #1: [Título]
...

### ✅ Aprobado para
- [ ] Push inmediato
- [ ] Push después de corregir 🔴
- [ ] Requiere re-review

---

**Próximo paso:** [Acción concreta]
```

---

## 🛠️ Herramientas

- `read` → Leer archivos a revisar
- `exec` → Correr tests, linting
- `github` → Ver diffs, CI status
- `message` → Notificar resultados

---

## ✅ Criterios de Aprobación

**Push inmediato (✅):**
- [ ] 0 críticos
- [ ] 0 importantes (o todos corregidos)
- [ ] Tests pasan
- [ ] Coincide con el plan original

**Push con cambios (⚠️):**
- [ ] Críticos corregidos
- [ ] Importantes documentados como issues

**Rechazado (❌):**
- [ ] Críticos sin fix claro
- [ ] Desviación mayor del plan
- [ ] Tests fallando

---

## 📚 Ejemplos

### Ejemplo 1: Review de skill nueva

**Input:** Kael terminó `skills/weather/SKILL.md`

**Review:**
```markdown
## 🔍 Code Review: Weather Skill

**Estado:** ⚠️ Con cambios

### Hallazgos

#### 🟡 IMPORTANTE #1: Falta manejo de error
**Ubicación:** `skills/weather/scripts/fetch.sh:23`  
**Problema:** No verifica si curl falló  
**Fix:** Agregar `|| exit 1` después del curl

### ✅ Aprobado para
- [ ] Push después de corregir 🟡
```

### Ejemplo 2: Review antes de push

**Input:** "Voy a pushear los cambios de gastogram"

**Review:**
```markdown
## 🔍 Code Review: Gastogram v1.2

**Estado:** ✅ Aprobado

### Resumen
- 🔴 Críticos: 0
- 🟡 Importantes: 0
- 🟢 Sugerencias: 2

### ✅ Aprobado para
- [x] Push inmediato

**Próximo paso:** `git push origin main`
```

---

## ⚠️ Anti-patrones

| ❌ Mal | ✅ Bien |
|-------|--------|
| "Se ve bien" (sin detalle) | Lista específica de hallazgos |
| Ignorar tests | Verificar tests siempre |
| Aprobar sin leer | Leer TODO el código cambiado |
| No priorizar | Clasificar por severidad |
| Ser demasiado estricto | Sugerencias ≠ bloqueos |

---

## 🔗 Integración con otras skills

| Skill | Integración |
|-------|-------------|
| `spock:planning` | Comparar código vs plan original |
| `kael:tdd` | Verificar que tests existen y pasan |
| `github` | Revisar CI/CD antes de aprobar |

---

## 📖 Referencias

- Superpowers `requesting-code-review`: https://github.com/obra/superpowers
- Google Code Review Guide: https://google.github.io/eng-practices/review/

---

**Última actualización:** 2026-03-14
