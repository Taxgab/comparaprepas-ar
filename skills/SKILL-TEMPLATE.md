# SKILL.md Template - Mejorado con Best Practices

## Frontmatter Obligatorio

```yaml
---
name: nombre-de-la-skill
description: >
  [VERBO en imperativo] [qué hace]. 
  Usá cuando [condición de activación].
  Ejemplos: [2-3 ejemplos concretos]
allowed-tools: Read, Write, Edit, Glob, Grep, Bash
context: isolated  # o "shared" (default)
---
```

## Estructura del Body

```markdown
# [Nombre de la Skill]

## Objetivo

[1-2 oraciones describiendo qué hace esta skill]

## Workflow

### Paso 1: [Nombre del paso]
[Instrucciones claras y específicas]

### Paso 2: [Nombre del paso]
[Instrucciones claras y específicas]

### Paso 3: [Nombre del paso]
[Instrucciones claras y específicas]

## Validación

Antes de entregar el output:
- [ ] Verificá que [criterio 1]
- [ ] Verificá que [criterio 2]
- [ ] Ejecutá [test/comando] si corresponde
- [ ] Corregí errores automáticamente

## Herramientas Permitidas

Esta skill solo puede usar:
- `Read` - Para leer archivos
- `Write` - Para crear archivos
- `Edit` - Para editar archivos
- `Glob` - Para buscar archivos
- `Grep` - Para buscar contenido
- `Bash` - Para ejecutar comandos

## References

- [Link a documentación relevante]
- [Link a guías de estilo]

## Scripts

- `scripts/validate.sh` - Validación del output
- `scripts/generate.sh` - Generación de archivos

## Templates

- `templates/output-template.md` - Template para el output
```

## Ejemplo Real: Code Review Skill

```yaml
---
name: code-reviewer
description: >
  Revisá código para detectar bugs y mejorar calidad.
  Usá cuando el usuario pida "review", "revisá este PR", o "checkeá el código".
  Ejemplos: "revisá este PR", "hacé un code review", "checkeá si hay bugs"
allowed-tools: Read, Grep, Glob
context: shared
---

# Code Reviewer

## Objetivo

Revisar código para detectar bugs, problemas de legibilidad, y oportunidades de mejora antes de mergear a producción.

## Workflow

### Paso 1: Leer el código
- Leé todos los archivos modificados
- Identificá el lenguaje y framework
- Contextualizá el cambio (¿qué está intentando hacer?)

### Paso 2: Revisar legibilidad
- Funciones de más de 20 líneas → marcar como candidatas a refactorizar
- Variables con nombres poco claros → sugerir mejores nombres
- Comentarios faltantes en lógica compleja → agregar

### Paso 3: Revisar complejidad
- Anidamiento muy profundo (>3 niveles) → sugerir simplificación
- Condicionales complejas → sugerir extracción a funciones
- Duplicación de código → señalar y sugerir DRY

### Paso 4: Revisar performance
- Queries N+1 → señalar y sugerir eager loading
- Operaciones en loops → sugerir optimización
- Memoria no liberada → señalar

### Paso 5: Revisar seguridad
- Inputs no validados → señalar
- SQL injection risks → señalar urgentemente
- Secrets hardcoded → señalar urgentemente

## Validación

Antes de entregar el review:
- [ ] Verificá que todos los archivos fueron leídos
- [ ] Verificá que cada crítico tiene ejemplo de código
- [ ] Verificá que las sugerencias son accionables
- [ ] Verificá que el tono es constructivo

## Output Format

```markdown
## Code Review - [Archivos]

### 🔴 Críticos (bloquean merge)
- [ ] [Archivo:Línea] - [Problema] - [Solución]

### 🟡 Mejoras (recomendado)
- [ ] [Archivo:Línea] - [Problema] - [Solución]

### 🟢 Nice to have (opcional)
- [ ] [Archivo:Línea] - [Problema] - [Solución]

### Resumen
- [X] archivos revisados
- [X] críticos encontrados
- [X] mejoras sugeridas
```

## Herramientas Permitidas

Esta skill solo puede usar:
- `Read` - Para leer archivos de código
- `Grep` - Para buscar patrones
- `Glob` - Para encontrar archivos

**NO PUEDE:**
- `Write` - No modificar código
- `Edit` - No editar archivos
- `Bash` - No ejecutar comandos

## References

- [Clean Code by Robert Martin](https://...)
- [Google Style Guides](https://...)
```

## Reglas de Oro

1. **Descripción lo más importante:** Si es vaga, Claude no sabe cuándo activar la skill
2. **allowed-tools explícito:** Restringí herramientas para seguridad
3. **Workflow con pasos claros:** Paso 1, Paso 2, Paso 3 (sin ambigüedad)
4. **Validación obligatoria:** Checklist antes de entregar
5. **Menos de 500 líneas:** Si necesita más, mové a `references/`
6. **Probá con casos reales:** No solo ejemplos ideales
