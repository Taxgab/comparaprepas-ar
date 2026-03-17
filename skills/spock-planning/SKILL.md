# spock:planning - Planificación en Tareas Atómicas

**Inspirado en:** Superpowers `writing-plans`  
**Autor:** Spock (OpenClaw)  
**Versión:** 1.0  
**Estado:** Activo

---

## 🎯 Propósito

Dividir tareas grandes en **tareas atómicas de 2-5 minutos** con:
- Archivos exactos (path completo)
- Código o descripción precisa
- Criterios de verificación claros

---

## 📋 Cuándo se activa

**Triggers:**
- Usuario pide algo complejo ("creá X", "implementá Y")
- Tarea estimada > 10 minutos
- Múltiples archivos involucrados
- Nueva feature desde cero

**No activar para:**
- Cambios simples (< 2 minutos)
- Consultas de información
- Tareas ya planificadas

---

## 🔄 Flujo de Trabajo

### Fase 1: Entender el objetivo (2-3 min)

```markdown
1. ¿Qué querés lograr realmente?
2. ¿Cuál es el problema de fondo?
3. ¿Hay restricciones técnicas?
4. ¿Cómo se ve "terminado"?
```

**Output:** Spec de 1-2 párrafos

---

### Fase 2: Diseñar la solución (5-10 min)

```markdown
## Arquitectura
- Componentes principales
- Flujo de datos
- Dependencias

## Archivos involucrados
- Nuevos: lista completa
- Modificados: lista con cambios esperados

## Riesgos conocidos
- X puede fallar por Y
- Z requiere validación externa
```

**Output:** Documento de diseño en `memory/plans/YYYY-MM-DD-nombre-plan.md`

---

### Fase 3: Plan de implementación (5-10 min)

Crear tabla de tareas atómicas:

| # | Tarea | Archivos | Tiempo est. | Verificación |
|---|-------|----------|-------------|--------------|
| 1 | Crear estructura de carpetas | `skills/nueva/` | 2 min | `ls skills/nueva/` |
| 2 | Escribir SKILL.md | `skills/nueva/SKILL.md` | 5 min | `cat` muestra contenido |
| 3 | Crear script helper | `skills/nueva/scripts/run.sh` | 3 min | `bash run.sh --help` funciona |
| 4 | Testear integración | Varios | 5 min | Ejecución completa OK |

**Reglas:**
- Cada tarea ≤ 5 minutos
- Cada tarea tiene archivos exactos
- Cada tarea tiene verificación clara
- Orden lógico (dependencias primero)

---

### Fase 4: Validar con el usuario (2-5 min)

Presentar:
1. Spec del diseño
2. Tabla de tareas
3. Preguntar: "¿Arranco?"

**Esperar confirmación antes de implementar.**

---

## 📝 Formato del Plan

```markdown
# Plan: [Nombre]

**Fecha:** YYYY-MM-DD  
**Autor:** Spock  
**Estado:** Pendiente / En progreso / Completado

## Objetivo
[Descripción clara en 1-2 párrafos]

## Diseño
[Arquitectura y decisiones técnicas]

## Tareas

### Tarea 1: [Nombre]
- **Archivos:** `path/to/file.ext`
- **Acción:** Crear/Modificar/Eliminar
- **Detalle:** Qué hacer exactamente
- **Verificación:** Cómo confirmar que está bien

### Tarea 2: [Nombre]
...

## Notas
- Riesgos conocidos
- Decisiones pendientes
- Dependencias externas
```

---

## 🛠️ Herramientas

- `write` → Crear/modificar archivos
- `exec` → Verificar cambios
- `memory_search` → Buscar planes anteriores
- `sessions_spawn` → Delegar tareas a subagentes

---

## ✅ Criterios de Calidad

- [ ] Todas las tareas ≤ 5 minutos
- [ ] Paths de archivos completos y correctos
- [ ] Verificación clara por tarea
- [ ] Orden lógico (sin dependencias circulares)
- [ ] Usuario aprobó el plan

---

## 📚 Ejemplos

### Ejemplo 1: Nueva skill

**Input:** "Creá una skill para weather"

**Output:** Plan con 6-8 tareas:
1. Crear carpeta `skills/weather/`
2. Escribir `SKILL.md` con triggers y flujo
3. Crear `scripts/fetch-weather.sh`
4. Agregar tests básicos
5. Documentar en README
6. Testear integración

### Ejemplo 2: Feature compleja

**Input:** "Quiero un sistema de backups automático"

**Output:** Plan con 10-12 tareas:
1. Analizar estructura actual
2. Diseñar formato de backup
3. Crear script de backup
4. Configurar cron job
5. Agregar logging
6. Testear restore
7. Documentar procedimiento
...

---

## ⚠️ Anti-patrones

| ❌ Mal | ✅ Bien |
|-------|--------|
| "Hacer X" (vago) | "Crear archivo Y con contenido Z" |
| Sin verificación | `ls path/` confirma existencia |
| Tareas de 30+ min | Dividir en 6 tareas de 5 min |
| Sin orden lógico | Dependencias primero |
| Empezar sin aprobación | Validar plan con usuario |

---

## 🔗 Referencias

- Superpowers `writing-plans`: https://github.com/obra/superpowers
- OpenClaw Skills Spec: `/data/.openclaw/workspace/docs/`

---

**Última actualización:** 2026-03-14
