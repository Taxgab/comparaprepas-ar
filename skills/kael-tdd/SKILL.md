# kael:tdd - Test-Driven Development

**Inspirado en:** Superpowers `test-driven-development`  
**Autor:** Spock (OpenClaw)  
**Versión:** 1.0  
**Estado:** Activo

---

## 🎯 Propósito

Imponer el ciclo **RED-GREEN-REFACTOR**:
1. 🔴 Escribir test que falla
2. 🟢 Escribir código mínimo que pasa
3. 🔵 Refactorizar manteniendo tests verdes

**Regla de oro:** NUNCA escribir código de producción sin un test que lo valide primero.

---

## 📋 Cuándo se activa

**Triggers obligatorios:**
- ✅ Nueva función/método
- ✅ Nueva feature completa
- ✅ Bug fix (primero el test que reproduce el bug)
- ✅ Refactor de lógica crítica

**Triggers opcionales:**
- Usuario menciona "tests" o "TDD"
- Proyecto nuevo desde cero

**No activar para:**
- Scripts desechables (< 20 líneas)
- Prototipos rápidos explícitos
- Configuración/archivos estáticos

---

## 🔄 Flujo de Trabajo

### Fase 1: Entender qué testear (3 min)

```markdown
1. ¿Qué comportamiento se va a implementar?
2. ¿Cuáles son los casos de uso?
3. ¿Cuáles son los edge cases?
4. ¿Qué puede fallar?
```

**Output:** Lista de scenarios a testear

---

### Fase 2: Escribir test FALLANDO (5-10 min)

**Reglas:**
- Escribir UN test a la vez
- El test DEBE fallar (no está implementado aún)
- Test debe ser específico y legible

**Estructura del test:**

```bash
# Ejemplo: test para script bash
@test "debe crear archivo si no existe" {
    run crear_archivo "/tmp/test.txt"
    [ "$status" -eq 0 ]
    [ -f "/tmp/test.txt" ]
}

@test "debe fallar si el path no es válido" {
    run crear_archivo "/no-existe/path.txt"
    [ "$status" -ne 0 ]
}
```

**Verificación:**
```bash
# El test DEBE fallar
 bats tests/mi_test.bats
 # Expected: ✗ falla (función no implementada)
```

---

### Fase 3: Escribir código MÍNIMO que pasa (5-15 min)

**Reglas:**
- Escribir SOLO lo necesario para pasar el test
- No optimizar prematuramente (YAGNI)
- No agregar features no testeadas

**Ejemplo:**
```bash
# Test pide: crear archivo si no existe
# Código mínimo:
crear_archivo() {
    local path="$1"
    touch "$path"
}
```

**Verificación:**
```bash
bats tests/mi_test.bats
# Expected: ✓ todos pasan
```

---

### Fase 4: Refactorizar (3-5 min)

**Checklist:**
- [ ] ¿El código es legible?
- [ ] ¿Nombres de variables claros?
- [ ] ¿Funciones cortas (< 30 líneas)?
- [ ] ¿Sin duplicación?
- [ ] ¿Manejo de errores adecuado?

**Regla:** Los tests deben seguir pasando después del refactor.

---

### Fase 5: Commit (2 min)

```bash
git add tests/ src/
git commit -m "feat: implementar X con TDD

- Test: [descripción del test]
- Implementación: [descripción breve]
- Tests: bats tests/x.bats"
```

---

## 🛠️ Herramientas por lenguaje

| Lenguaje | Framework | Comando |
|----------|-----------|---------|
| **Bash** | Bats | `bats tests/*.bats` |
| **Python** | pytest | `pytest tests/` |
| **JavaScript** | Jest | `npm test` |
| **Node.js** | Mocha | `mocha tests/` |
| **Go** | testing | `go test ./...` |
| **Rust** | cargo test | `cargo test` |

---

## 📝 Estructura de carpetas

```
project/
├── src/
│   └── mi_script.sh
├── tests/
│   └── mi_script.bats
└── Makefile
```

---

## ✅ Criterios de Calidad

### Tests buenos:
- [ ] Nombres descriptivos (`debe_hacer_X_cuando_Y`)
- [ ] Aislan una sola cosa
- [ ] Son determinísticos (sin timing, random)
- [ ] Fáciles de leer
- [ ] Rápidos (< 1 segundo cada uno)

### Tests malos:
- [ ] Testean múltiples cosas
- [ ] Dependen de estado externo
- [ ] Tienen sleeps o waits
- [ ] Son frágiles (cambian con refactor)

---

## 📚 Ejemplos

### Ejemplo 1: Script bash nuevo

**Input:** "Creá un script que backup archivos"

**Flujo TDD:**

1. **Test 1 (falla):**
```bash
@test "backup debe crear copia del archivo" {
    echo "contenido" > /tmp/original.txt
    run backup /tmp/original.txt /tmp/backup.txt
    [ "$status" -eq 0 ]
    diff /tmp/original.txt /tmp/backup.txt
}
```

2. **Código mínimo:**
```bash
backup() {
    cp "$1" "$2"
}
```

3. **Test pasa ✓**

4. **Refactor:** Agregar validación de paths

5. **Test 2 (falla):**
```bash
@test "backup debe fallar si el archivo no existe" {
    run backup /no-existe.txt /tmp/backup.txt
    [ "$status" -ne 0 ]
}
```

6. **Repetir ciclo...**

---

### Ejemplo 2: Bug fix

**Input:** "El script falla con paths con espacios"

**Flujo TDD:**

1. **Test que reproduce el bug:**
```bash
@test "debe manejar paths con espacios" {
    echo "contenido" > "/tmp/mi archivo.txt"
    run backup "/tmp/mi archivo.txt" "/tmp/copia.txt"
    [ "$status" -eq 0 ]
}
```

2. **Verificar que falla** (reproduce el bug)

3. **Fix:** Usar quotes en variables
```bash
backup() {
    cp "$1" "$2"  # Quotes importantes!
}
```

4. **Test pasa ✓**

---

## ⚠️ Anti-patrones

| ❌ Mal | ✅ Bien |
|-------|--------|
| Escribir código antes del test | Test primero, SIEMPRE |
| Tests gigantes | Un test = una cosa |
| Testear implementación | Testear comportamiento |
| Ignorar edge cases | Testear casos límite |
| Tests lentos | Tests rápidos (<1s) |
| Tests frágiles | Tests estables |

---

## 🔗 Integración con otras skills

| Skill | Integración |
|-------|-------------|
| `spock:planning` | Incluir tests en el plan |
| `spock:code-review` | Verificar que tests existen |
| `github` | CI debe pasar tests antes de merge |

---

## 📖 Referencias

- Superpowers TDD: https://github.com/obra/superpowers
- Test-Driven Development (Kent Beck)
- Red-Green-Refactor: https://martinfowler.com/bliki/TestDrivenDevelopment.html

---

**Última actualización:** 2026-03-14
