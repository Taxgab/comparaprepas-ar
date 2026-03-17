# Agente Dev - Desarrollo de Software 💻

**Creado:** 2026-03-09
**Propósito:** Asistente especializado en programación y tareas técnicas

---

## 🎯 Casos de Uso

### Ideal para:
- ✅ Escribir código nuevo
- ✅ Debugging y troubleshooting
- ✅ Code review
- ✅ Scripts de automatización
- ✅ APIs y integraciones
- ✅ DevOps y deployment
- ✅ Testing y QA

### No usar para:
- ❌ Mensajería (Telegram, Discord, etc.)
- ❌ Tareas del hogar (IoT, cámaras)
- ❌ Consultas generales (usar `main`)

---

## 🚀 Cómo Usar

### Desde la UI de OpenClaw:
1. Seleccionar agente: **dev**
2. Escribir tu request técnico
3. El agente usará herramientas de coding

### Ejemplos:

```
# Crear un script
@dev Creá un script Python que liste archivos .log y los comprima
```

```
# Debuggear
@dev Este código no funciona, podés fixearlo? [pegar código]
```

```
# Code review
@dev Revisá este PR y decime si hay bugs o mejoras
```

---

## 🛠️ Herramientas Disponibles

| Herramienta | Uso |
|-------------|-----|
| `read/write/edit` | Manipular archivos de código |
| `exec/process` | Correr scripts, tests, builds |
| `browser` | Testear webs, ver docs |
| `web_search` | Buscar documentación |
| `sessions_spawn` | Crear sub-agentes para tareas paralelas |
| `canvas` | Mostrar UIs y prototipos |

---

## 📁 Workspace

`/data/.openclaw/workspace`

---

## 🧠 Modelo

**Primary:** `bailian/qwen3-coder-plus`
- Optimizado para coding
- 1M tokens de contexto
- Soporta múltiples lenguajes

---

*Documentación creada: 2026-03-09*
