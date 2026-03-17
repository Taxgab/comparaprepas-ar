---
name: twitter-thread-generator
description: >
  Generá hilos de Twitter virales basados en temas o artículos.
  Usá cuando el usuario pida "creá un hilo", "convertí esto en tweets", o "hacé un thread sobre".
  Ejemplos: "creá un hilo sobre AI agents", "convertí este artículo en tweets", "hacé un thread viral"
allowed-tools: Read, Write, Bash
context: shared
---

# Twitter Thread Generator 🧵

## Objetivo

Crear hilos de Twitter optimizados para engagement basados en temas, artículos o ideas proporcionadas por el usuario.

## Workflow

### Paso 1: Entender el tema
- Leé el tema/artículo proporcionado
- Identificá los 3-5 puntos clave
- Determiná el ángulo viral (controversial, educativo, inspirador)

### Paso 2: Crear el hook
- Escribí 3 opciones de hook diferentes
- Elegí el más fuerte (debe generar curiosidad en <3 segundos)
- Máximo 280 caracteres

### Paso 3: Desarrollar el cuerpo
- 5-7 tweets para el cuerpo principal
- Cada tweet debe tener 1 idea clara
- Máximo 280 caracteres por tweet
- Usá saltos de línea para legibilidad

### Paso 4: Crear la CTA
- CTA clara y específica
- Puede ser pregunta, link, o acción
- Máximo 280 caracteres

### Paso 5: Validar
- Contá caracteres por tweet (<280)
- Verificá que cada tweet se entiende solo
- Verificá que el hilo tiene flujo lógico

## Validación

Antes de entregar el hilo:
- [ ] Verificá que cada tweet tiene ≤280 caracteres
- [ ] Verificá que el hook genera curiosidad
- [ ] Verificá que cada tweet tiene 1 idea clara
- [ ] Verificá que hay CTA al final
- [ ] Ejecutá `bird read` en un tweet de prueba para validar formato

## Output Format

```markdown
# Twitter Thread: [Tema]

## Hook (Tweet 1):
[Texto del hook - ≤280 caracteres]

## Cuerpo:

### Tweet 2:
[Texto - ≤280 caracteres]

### Tweet 3:
[Texto - ≤280 caracteres]

### Tweet 4:
[Texto - ≤280 caracteres]

### Tweet 5:
[Texto - ≤280 caracteres]

### Tweet 6:
[Texto - ≤280 caracteres]

## CTA (Tweet 7):
[Texto - ≤280 caracteres]

## Metadata:
- Total tweets: [X]
- Caracteres promedio: [X]
- Ángulo: [controversial/educativo/inspirador]
```

## Herramientas Permitidas

Esta skill solo puede usar:
- `Read` - Para leer artículos/temas de referencia
- `Write` - Para guardar borradores de hilos
- `Bash` - Para ejecutar comandos `bird` de validación

**NO PUEDE:**
- `Edit` - No editar tweets publicados sin permiso

## Best Practices

### Hooks que Funcionan
- "La mayoría de la gente está equivocada sobre [tema]"
- "Pasé [X tiempo] investigando [tema]. Esto es lo que aprendí:"
- "[Número] lecciones que desearía haber aprendido antes:"
- "El secreto de [resultado] que nadie te cuenta:"

### Estructura Viral
1. Hook (curiosidad)
2. Contexto (por qué importa)
3-6. Cuerpo (valor, datos, ejemplos)
7. CTA (acción, pregunta, link)

### Errores Comunes
- ❌ Hooks genéricos ("Hablemos de AI")
- ❌ Tweets muy largos (>250 caracteres)
- ❌ Múltiples ideas por tweet
- ❌ CTA débil o ausente
- ❌ Sin flujo lógico entre tweets

## References

- [The Complete Guide to Writing Viral Twitter Threads](https://...)
- [Hook Handbook by Justin Welsh](https://...)
- [Twitter Thread Analyzer](https://...)

## Scripts

- `scripts/validate-thread.sh` - Valida formato y caracteres
- `scripts/post-thread.sh` - Publica el hilo automáticamente

## Templates

- `templates/thread-template.md` - Template base para hilos
- `templates/hook-examples.md` - Ejemplos de hooks probados
