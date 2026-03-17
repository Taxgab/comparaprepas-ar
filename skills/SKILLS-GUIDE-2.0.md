# Skills 2.0 - Guía Completa de Implementación

**Basado en:** [The Complete Guide to Building Skills for Claude](https://resources.anthropic.com/hubfs/The-Complete-Guide-to-Building-Skill-for-Claude.pdf)

---

## 🎯 ¿Qué es una Skill?

Una Skill son **instrucciones persistentes** que le enseñan a Claude **cómo trabajar** en tu contexto específico.

**Analogía:** Un chef sabe cocinar. Pero si entra a tu restaurante sin conocer tus recetas, va a cocinar bien, pero **a su manera**. Una Skill es la **receta**.

---

## 📁 Estructura de una Skill

```
nombre-de-la-skill/
├── SKILL.md              # Obligatorio - Instrucciones principales
├── references/           # Opcional - Documentación extra
│   ├── style-guide.md
│   └── examples.md
├── scripts/              # Opcional - Scripts ejecutables
│   ├── validate.sh
│   └── generate.sh
└── templates/            # Opcional - Templates de output
    └── output-template.md
```

---

## 📝 Frontmatter Obligatorio

```yaml
---
name: nombre-de-la-skill
description: >
  [VERBO en imperativo] [qué hace]. 
  Usá cuando [condición de activación].
  Ejemplos: [2-3 ejemplos concretos]
allowed-tools: Read, Write, Edit, Glob, Grep, Bash
context: shared  # o "isolated"
---
```

### Reglas de Descripción

**❌ MAL (vago):**
```yaml
description: Revisá código
```

**✅ BIEN (específico):**
```yaml
description: >
  Revisá código para detectar bugs y mejorar calidad.
  Usá cuando el usuario pida "review", "revisá este PR", o "checkeá el código".
  Ejemplos: "revisá este PR", "hacé un code review", "checkeá si hay bugs"
```

---

## 🔒 allowed-tools (Seguridad)

**Propósito:** Restringir qué herramientas puede usar la skill.

**Ejemplo:**
```yaml
allowed-tools: Read, Grep, Glob
```

**Significa:**
- ✅ Puede LEER archivos
- ✅ Puede BUSCAR contenido
- ✅ Puede ENCONTRAR archivos
- ❌ NO puede ESCRIBIR
- ❌ NO puede EDITAR
- ❌ NO puede ejecutar BASH

**Casos de uso:**
- **Code Review:** `allowed-tools: Read, Grep, Glob` (solo lectura)
- **Generador:** `allowed-tools: Read, Write` (lee contexto, escribe output)
- **Automatización:** `allowed-tools: Read, Write, Bash` (completo)

---

## 🧠 context (Aislamiento)

**Propósito:** Controlar si la skill corre en contexto compartido o aislado.

### `context: shared` (default)

**Cuándo usar:**
- Skills que necesitan contexto de la conversación
- Code review que necesita entender el proyecto
- Generadores que usan información previa

**Comportamiento:**
- Tiene acceso al historial de la conversación
- Puede referenciar mensajes anteriores
- Ideal para workflows colaborativos

### `context: isolated`

**Cuándo usar:**
- Research que no necesita contexto previo
- Tasks independientes
- Evitar contaminación de contexto

**Comportamiento:**
- No tiene acceso al historial
- Corre en aislamiento
- Ideal para tasks específicas

**Ejemplo:**
```yaml
context: isolated
```

---

## 📋 Body del SKILL.md

### Secciones Obligatorias

1. **Objetivo** (1-2 oraciones)
2. **Workflow** (pasos claros 1, 2, 3...)
3. **Validación** (checklist antes de entregar)
4. **Herramientas Permitidas** (qué puede y no puede usar)

### Secciones Opcionales

5. **Output Format** (template de output)
6. **Best Practices** (consejos específicos)
7. **References** (links a docs)
8. **Scripts** (scripts disponibles)
9. **Templates** (templates de output)

---

## ✅ Validación (Crítico)

**Propósito:** Asegurar calidad consistente del output.

**Ejemplo:**
```markdown
## Validación

Antes de entregar el output:
- [ ] Verificá que [criterio 1]
- [ ] Verificá que [criterio 2]
- [ ] Ejecutá [test/comando] si corresponde
- [ ] Corregí errores automáticamente
```

**Por qué importa:** Sin validación, Claude puede entregar outputs inconsistentes.

---

## 🔄 Cómo Claude Carga una Skill

### Nivel 1: Nombre y Descripción

**Cuándo:** Inicio de cada sesión

**Qué carga:**
- Solo el frontmatter (nombre + descripción)
- Todas las skills disponibles

**Propósito:** Claude decide cuál activar basado en tu prompt.

**Importancia:** La descripción es **LO MÁS IMPORTANTE**. Si es vaga, Claude no sabe cuándo activar.

### Nivel 2: SKILL.md Completo

**Cuándo:** Cuando activás la skill manualmente o matchea automáticamente

**Qué carga:**
- Todo el body del SKILL.md
- Workflow, validación, herramientas

**Propósito:** Claude sigue las instrucciones para la tarea.

### Nivel 3: Scripts, References, Templates

**Cuándo:** Solo si la skill los necesita para esa tarea específica

**Qué carga:**
- Scripts específicos
- References relevantes
- Templates necesarios

**Propósito:** Progressive disclosure - no cargar todo si no se necesita.

---

## 🎯 Cuándo Crear una Skill

### ✅ SÍ Crear una Skill

**Señal clara:** Si te encontrás escribiendo el mismo contexto en cada conversación, ya tenés una Skill sin escribir.

**Casos concretos:**

1. **Cuando el output depende de contexto que el modelo no tiene**
   - Tu stack, tus convenciones, cómo trabaja tu equipo
   - Ejemplo: "Usá Tailwind, props con defaults, estilos inline"

2. **Cuando el resultado tiene que ser consistente**
   - Code reviews que siguen siempre el mismo formato
   - Presentaciones con estructura fija
   - Documents con template específico

3. **Cuando el proceso tiene pasos que se olvidan**
   - "Siempre revisá seguridad antes de sugerir refactors"
   - "Primero validá los inputs, después procesés"

### ❌ NO Crear una Skill

1. **Para algo que hacés una vez**
   - No vale la pena el overhead

2. **Para tareas donde el contexto cambia tanto**
   - Instrucciones fijas no ayudan

3. **Para algo que ya es claro por defecto**
   - "Escribí código limpio" → muy vago

---

## 📊 Métricas de una Skill Exitosa

### Consistencia

**Test:** Ejecutá la misma tarea 3 veces.

**✅ Exitosa:** Cada ejecución produce output similar

**❌ Fallida:** Cada ejecución parece una conversación distinta

### Calidad

**Test:** Compará output CON skill vs SIN skill.

**✅ Exitosa:** Output con skill es notablemente mejor

**❌ Fallida:** No hay diferencia clara

### Activación

**Test:** ¿La skill se activa cuando debería?

**✅ Exitosa:** Se activa automáticamente cuando corresponde

**❌ Fallida:** Tenés que invocarla manualmente siempre

---

## 🚨 Señales de que una Skill Necesita Trabajo

### 1. El agente ignora instrucciones

**Síntoma:** Le pediste que valide antes de ejecutar y lo saltea.

**Causa:** Instrucciones enterradas o ambiguas.

**❌ MAL:** "Tené en cuenta la seguridad"

**✅ BIEN:** "Antes de ejecutar cualquier query, validá que los inputs no contengan caracteres especiales"

### 2. La descripción no matchea

**Síntoma:** La skill se activa cuando no debería, o no se activa cuando sí.

**Causa:** Descripción vaga o incorrecta.

**Solución:** Revisá la descripción ANTES que el body.

### 3. El output es genérico

**Síntoma:** Se parece a lo que Claude haría sin la skill.

**Causa:** Instrucciones demasiado genéricas.

**❌ MAL:** "Hacé un buen code review"

**✅ BIEN:** "Revisá legibilidad primero, después complejidad, marcá funciones de más de 20 líneas como candidatas a refactorizar, y terminá con un resumen ordenado por impacto"

---

## 🛠️ Proceso de Creación (Paso a Paso)

### Paso 1: Detectá la repetición

**Esta semana, cada vez que le des contexto al agente antes de pedirle algo, anotalo:**

- "Tené en cuenta que usamos Tailwind"
- "El formato tiene que ser este"
- "Primero validá antes de procesar"

**Si lo escribiste más de 3 veces → es candidata a Skill.**

### Paso 2: Creá la carpeta

```bash
mkdir ~/.claude/skills/nombre-de-tu-skill
touch ~/.claude/skills/nombre-de-tu-skill/SKILL.md
```

O pedile a Claude que lo haga por vos.

### Paso 3: Escribí la versión mínima

**Solo lo esencial para el caso más común.**

**Regla:** Una Skill de 5 líneas que funciona bien vale más que una de 100 que el agente sigue a medias.

### Paso 4: Probala con casos reales

**Test:** Ejecutá la misma tarea CON y SIN la skill.

**Pregunta:** ¿El output con Skill es notablemente mejor?

**Si no ves diferencia → las instrucciones son demasiado genéricas.**

### Paso 5: Iterá en base a lo que falla

**Cada vez que el agente haga algo que no querías, preguntate:**

¿Esta corrección debería estar en la Skill?

Si le estás diciendo "no, el resumen va al principio" por tercera vez → eso va a la Skill.

### Paso 6: Usá a Claude para mejorarla

**Prompt:**
```
Acá está mi SKILL.md. Revisalo y:
1. Identificá instrucciones ambiguas
2. Sugerí ejemplos concretos
3. Mejorá la descripción para que matchee mejor
```

Claude entiende el formato y puede ayudarte a iterar mucho más rápido.

---

## 🎓 Buenas Prácticas (Según Anthropic)

### 1. Sé conciso

**Claude ya es inteligente. No le expliques cosas que ya sabe.**

Cada línea que escribís compite con el resto del contexto.

**Si te preguntás "¿realmente necesita saber esto?" → probablemente no.**

### 2. La descripción lo es todo

**Escribila en tercera persona, que incluya QUÉ hace y CUÁNDO activarla.**

**❌ MAL:** "Procesa archivos Excel"

**✅ BIEN:** "Analizá spreadsheets, creá pivot tables y generá gráficos. Usá cuando el usuario mencione archivos Excel, datos tabulares o .xlsx"

### 3. Mantené el SKILL.md bajo 500 líneas

**Si necesitás más → mové el contenido a archivos separados en `references/`.**

**Regla:** Un nivel de profundidad, no más.

### 4. Usá workflows con pasos claros

**Para tareas complejas, definí el orden exacto.**

**Ejemplo:**
```markdown
### Paso 1: [Nombre]
[Instrucciones]

### Paso 2: [Nombre]
[Instrucciones]

### Paso 3: [Nombre]
[Instrucciones]
```

**Sin esto, Claude decide solo qué hacer primero.**

### 5. Implementá loops de validación

**Si la Skill genera algo, que valide el output antes de darlo por terminado.**

**Ejemplo:**
```markdown
## Validación

Antes de entregar:
1. Ejecutá → validá → corregí → repetí
```

**Mejora enormemente la calidad.**

### 6. Dale el nivel de libertad correcto

**Si la tarea tiene una sola forma correcta de hacerse → dásela exacta.**

**Si tiene múltiples enfoques válidos → dejale margen.**

**No todo necesita instrucciones estrictas.**

### 7. Probala con casos reales, no con ejemplos ideales

**Una Skill puede funcionar perfecto en teoría y fallar en la práctica.**

**Testear con tareas reales es lo único que revela los gaps.**

---

## 🚀 Skills + MCP: El Siguiente Nivel

**Las Skills se pueden combinar con tools y servidores MCP.**

**Resultado:** El agente no solo sigue instrucciones, sino que puede **interactuar con servicios externos**.

**Ejemplo:** Skill que automatiza el flujo completo de un PR en GitHub.

**Le pedís:** "revisá y mergeá el PR #42"

**El agente ejecuta:**
1. Lee el PR con MCP de GitHub
2. Revisa el código con la Skill
3. Comenta con feedback
4. Mergea si está aprobado

**Vos solo pedís el resultado.**

---

## 📚 Resources

- [The Complete Guide to Building Skills for Claude](https://resources.anthropic.com/hubfs/The-Complete-Guide-to-Building-Skill-for-Claude.pdf)
- [Skill authoring best practices](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices)
- [Agent Skills — Claude Code Docs](https://code.claude.com/docs/en/skills)
- [Anthropic Skills Repository](https://github.com/anthropics/skills)
- [ClawHub - Community Skills](https://clawhub.ai)

---

**Última actualización:** 2026-03-12  
**Versión:** 2.0
