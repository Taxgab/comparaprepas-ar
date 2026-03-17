# systematic:debugging - Debugging Sistemático en 4 Fases

**Inspirado en:** Superpowers `systematic-debugging`  
**Autor:** Spock (OpenClaw)  
**Versión:** 1.0  
**Estado:** Activo

---

## 🎯 Propósito

Reemplazar el debugging por intuición con un **proceso sistemático** de 4 fases:
1. 🔍 Reproducir y aislar
2. 🧪 Hipótesis y tests
3. 🔬 Root cause analysis
4. 🛠️ Fix y prevención

**Regla de oro:** NUNCA intentar un fix sin entender la causa raíz.

---

## 📋 Cuándo se activa

**Triggers:**
- ❌ Error inesperado
- ❌ Test fallando sin razón obvia
- ❌ Comportamiento inconsistente
- ❌ "Funcionaba antes, ahora no"
- Usuario pide "arreglá este bug"

**No activar para:**
- Errores de sintaxis obvios
- Errores de configuración documentados
- Typos evidentes

---

## 🔄 Flujo de Trabajo

### Fase 1: Reproducir y Aislar (5-15 min)

**Objetivo:** Poder reproducir el error consistentemente.

#### Checklist:

```markdown
## 1.1: Reproducir el error
- [ ] ¿Puedo reproducirlo a voluntad?
- [ ] ¿Cuáles son los pasos exactos?
- [ ] ¿Ocurre siempre o es intermitente?

## 1.2: Aislar el problema
- [ ] ¿En qué componente ocurre?
- [ ] ¿Qué inputs lo triggeran?
- [ ] ¿Qué inputs NO lo triggeran?

## 1.3: Minimizar el caso de test
- [ ] ¿Puedo crear un MRE (Minimal Reproducible Example)?
- [ ] ¿Eliminé variables innecesarias?
- [ ] ¿El MRE es < 50 líneas?
```

**Output:** Script/caso de test que reproduce el bug consistentemente.

---

### Fase 2: Hipótesis y Tests (10-20 min)

**Objetivo:** Generar hipótesis y testearlas sistemáticamente.

#### Proceso:

```markdown
## Hipótesis generadas:

| # | Hipótesis | Probabilidad | Test para verificar |
|---|-----------|--------------|---------------------|
| 1 | Variable X es null | Alta | Loggear X antes del error |
| 2 | Race condition | Media | Agregar delays/sync |
| 3 | Encoding incorrecto | Baja | Forzar UTF-8 |

## Tests ejecutados:

### Test Hipótesis 1:
- **Acción:** Agregar log `echo "X=$X"` línea 42
- **Resultado:** X está vacío ❌
- **Conclusión:** Hipótesis CONFIRMADA

### Test Hipótesis 2:
- **Acción:** ...
- **Resultado:** ...
- **Conclusión:** ...
```

**Reglas:**
- Testear UNA hipótesis a la vez
- Documentar CADA test y resultado
- No saltar a conclusiones

---

### Fase 3: Root Cause Analysis (5-15 min)

**Objetivo:** Encontrar la causa PROFUNDA, no el síntoma.

#### Técnica: "Los 5 Porqués"

```
Problema: El script falla con "Permission denied"

1. ¿Por qué? → El archivo no tiene permisos de escritura
2. ¿Por qué? → Se creó con umask incorrecto
3. ¿Por qué? → El script no establece umask explícitamente
4. ¿Por qué? → No se consideró el umask del sistema
5. ¿Por qué? → Falta documentación de requisitos del sistema

Root cause: Script asume umask del sistema sin validarlo
```

#### Técnica: Fishbone Diagram (simplificado)

```
Categorías a explorar:
- 📝 Código (lógica, bugs, edge cases)
- 🔧 Configuración (env vars, archivos de config)
- 🖥️ Entorno (OS, permisos, recursos)
- 📦 Dependencias (versiones, compatibilidad)
- 👤 Usuario (input incorrecto, mal uso)
```

**Output:** Declaración clara de la causa raíz.

---

### Fase 4: Fix y Prevención (10-20 min)

**Objetivo:** Arreglar el bug y prevenir que vuelva.

#### Checklist:

```markdown
## 4.1: Implementar fix
- [ ] El fix aborda la causa raíz (no el síntoma)
- [ ] El fix es mínimo (no over-engineering)
- [ ] El fix no introduce nuevos bugs

## 4.2: Verificar el fix
- [ ] El caso de test original ahora pasa
- [ ] Tests existentes siguen pasando
- [ ] Se probaron edge cases relacionados

## 4.3: Prevenir regresión
- [ ] Se agregó test permanente para este bug
- [ ] Se documentó en regressions.md
- [ ] Se consideró si aplica a otros lugares

## 4.4: Comunicar
- [ ] Se explicó la causa raíz al usuario
- [ ] Se documentó el fix (commit message claro)
- [ ] Se actualizó documentación si corresponde
```

---

## 🛠️ Herramientas de Debugging

| Herramienta | Uso | Comando |
|-------------|-----|---------|
| **Logging** | Ver valores en tiempo real | `echo`, `console.log`, `logger` |
| **Debugger** | Step-through execution | `bash -x`, `pdb`, `node --inspect` |
| **Strace** | System calls (Linux) | `strace -f command` |
| **Diff** | Comparar estados | `diff file1 file2` |
| **Git blame** | Ver quién cambió qué | `git blame file` |
| **Git bisect** | Encontrar commit que rompió | `git bisect start` |

---

## 📝 Template de Reporte de Bug

```markdown
# Bug Report: [Título descriptivo]

**Fecha:** YYYY-MM-DD  
**Reporter:** [Nombre]  
**Severidad:** 🔴 Crítico / 🟡 Importante / 🟢 Menor

## Síntomas
[Qué se observa cuando falla]

## Pasos para reproducir
1. [Paso 1]
2. [Paso 2]
3. [Error ocurre aquí]

## Comportamiento esperado
[Qué debería pasar]

## Comportamiento actual
[Qué pasa realmente]

## Environment
- OS: [ej: Ubuntu 22.04]
- Versión: [ej: OpenClaw 2026.3.8]
- Otros: [dependencias relevantes]

## Root Cause
[Causa raíz encontrada]

## Fix
[Descripción del fix]

## Prevención
- [ ] Test agregado: `tests/test_bug_xxx.bats`
- [ ] Documentado en: `memory/regressions.md`
- [ ] Aplica a otros lugares: [sí/no, cuáles]
```

---

## 📚 Ejemplos

### Ejemplo 1: Script bash falla intermitentemente

**Síntoma:** "El backup a veces no se crea"

**Fase 1 - Reproducir:**
```bash
# MRE encontrado:
for i in {1..100}; do
    ./backup.sh /src /dst
done
# Falla ~30% de las veces
```

**Fase 2 - Hipótesis:**
| # | Hipótesis | Test | Resultado |
|---|-----------|------|-----------|
| 1 | Race condition | Agregar `sleep 1` | ❌ Sigue fallando |
| 2 | Variable sin quotes | `set -u` para detectar | ✅ Error: `dst: unbound variable` |
| 3 | Path con espacios | Test con "mi carpeta" | ✅ Confirma falla |

**Fase 3 - Root Cause:**
```
¿Por qué falla? → Variable $dst está vacía
¿Por qué está vacía? → Se pasa sin quotes
¿Por qué sin quotes? → Función asume paths sin espacios
Root cause: No se validan paths con espacios
```

**Fase 4 - Fix:**
```bash
# Antes:
cp $src $dst

# Después:
cp "$src" "$dst"
```

---

### Ejemplo 2: API devuelve error 500

**Síntoma:** "POST /api/users devuelve 500"

**Fase 1 - Reproducir:**
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name": "test"}'
# Response: 500 Internal Server Error
```

**Fase 2 - Hipótesis:**
| # | Hipótesis | Test | Resultado |
|---|-----------|------|-----------|
| 1 | DB connection | Verificar logs DB | ✅ Error: connection timeout |
| 2 | Validación | Enviar payload completo | ❌ Sigue 500 |
| 3 | Auth | Enviar con token | ❌ Sigue 500 |

**Fase 3 - Root Cause:**
```
¿Por qué 500? → DB connection timeout
¿Por qué timeout? → Pool de conexiones agotado
¿Por qué agotado? → Conexiones no se liberan
¿Por qué no se liberan? → Falta `conn.close()` en error handler
Root cause: Fuga de conexiones en error handler
```

**Fase 4 - Fix:**
```python
# Antes:
try:
    conn = db.connect()
    result = conn.execute(query)
    return result
except Exception as e:
    log.error(e)
    raise

# Después:
try:
    conn = db.connect()
    result = conn.execute(query)
    return result
except Exception as e:
    log.error(e)
    conn.close()  # <-- Fix
    raise
finally:
    if conn:
        conn.close()
```

---

## ⚠️ Anti-patrones

| ❌ Mal | ✅ Bien |
|-------|--------|
| "Probemos esto a ver" | Hipótesis → Test → Conclusión |
| Cambiar 5 cosas a la vez | Cambiar UNA cosa por test |
| "Funciona en mi máquina" | Reproducir en ambiente controlado |
| Fix sin entender causa | Entender causa → Fix |
| No documentar el bug | Agregar a regressions.md |
| Sin test de regresión | Test permanente |

---

## 🔗 Integración con otras skills

| Skill | Integración |
|-------|-------------|
| `spock:code-review` | Review fix antes de push |
| `kael:tdd` | Agregar test que reproduce el bug |
| `memory/regressions.md` | Documentar bug y fix |

---

## 📖 Referencias

- Superpowers `systematic-debugging`: https://github.com/obra/superpowers
- The Debugging Mindset (David Agans)
- Rubber Duck Debugging: https://rubberduckdebugging.com/

---

**Última actualización:** 2026-03-14
