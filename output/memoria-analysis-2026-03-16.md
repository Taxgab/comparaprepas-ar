# 🔍 Análisis del Sistema de Memoria de OpenClaw

**Fecha:** 2026-03-16 14:15 UTC  
**Autor:** Kael (sub-agente dev)  
**Solicitante:** Taxgab (Gabriel)

---

## 📋 Resumen Ejecutivo

**Problema:** Las configuraciones críticas (IDs de canales, tokens, rutas) se pierden entre sesiones, obligando al usuario a reconfigurar 3 veces en el mismo día.

**Causa Raíz:** El sistema de memoria de OpenClaw tiene **limitaciones arquitecturales** que impiden la persistencia confiable de configuraciones críticas:

1. **MEMORY.md solo se carga en sesión main** - Los sub-agentes (lyra, radar, dev, vera) NO lo ven
2. **No hay garantía de orden de carga** - Los archivos en `memory/` no tienen prioridad por nombre
3. **Los archivos de configuración no están inyectados en el prompt del sistema** - Solo están "disponibles" pero no se cargan automáticamente
4. **Cada agente tiene contexto aislado** - No hay herencia de configuración entre sesiones

---

## 🔬 Análisis Técnico

### 1. Cómo Funciona la Inyección de Contexto

OpenClaw usa **inyección de prompt basada en workspace**. Los archivos se cargan en este orden:

```
┌─────────────────────────────────────────────────────────┐
│ 1. SOUL.md (siempre)                                    │
│ 2. USER.md (siempre)                                    │
│ 3. memory/YYYY-MM-DD.md (hoy + ayer)                   │
│ 4. MEMORY.md (SOLO en sesión main) ⚠️                  │
│ 5. Skills (SKILL.md de skills instaladas)              │
│ 6. Archivos adicionales (NO automáticos)               │
└─────────────────────────────────────────────────────────┘
```

**Problema:** `CONFIG-SISTEMA.md` y `memory/00-configuracion-critica.md` están en la categoría 6 → **NO se cargan automáticamente**.

### 2. Por Qué Se Pierde la Configuración

| Escenario | ¿Qué Pasa? | ¿Por Qué? |
|-----------|------------|-----------|
| **Sesión main → sub-agente** | Configuración se pierde | Sub-agentes no cargan MEMORY.md |
| **Reinicio de gateway** | Configuración se pierde | Solo se inyectan archivos específicos |
| **Cambio de agente (main → dev)** | Configuración se pierde | Cada agente tiene contexto aislado |
| **Nueva sesión después de horas** | Configuración se pierde | Solo se carga memory/YYYY-MM-DD (hoy/ayer) |

### 3. Archivos de Configuración Existentes

| Archivo | Ubicación | ¿Se carga auto? | ¿Persiste? |
|---------|-----------|-----------------|------------|
| `CONFIG-SISTEMA.md` | `/workspace/` | ❌ No | ✅ Sí (archivo permanente) |
| `memory/00-configuracion-critica.md` | `/workspace/memory/` | ❌ No | ✅ Sí (archivo permanente) |
| `MEMORY.md` | `/workspace/` | ✅ Solo main | ✅ Sí |
| `.env` | `/.openclaw/` | ❌ No | ✅ Sí |
| `openclaw.json` | `/.openclaw/` | ❌ No | ✅ Sí |

**Conclusión:** Los archivos **existen** pero **no se inyectan en el prompt** → el agente no los "ve" a menos que los lea explícitamente.

---

## 🎯 Mejoras Propuestas (Priorizadas)

### 🥇 #1: Crear `00-START-HERE.md` con Carga Prioritaria

**Objetivo:** Un archivo que SIEMPRE se cargue primero, antes que cualquier otro.

**Implementación:**
```markdown
# /data/.openclaw/workspace/00-START-HERE.md

## ⚙️ CONFIGURACIÓN CRÍTICA (NO BORRAR)

### Telegram
- Bot: `8342610374:AAH3TAo3sWtT5w8XyLJX5VC0b7NjBatCSpw`
- Grupo: `-1003642418702`
- Thread: `38`
- Usuario: `533617529`

### Discord
- Token: `MTQ3OTY2MDU2NTYwMDE0NTU4MQ.GX6T1i...`
- Lyra: `1482027396193583244`
- Radar: `1482027354799996951`
- Main: `1479095447741272066`

### Rutas
- Workspace: `/data/.openclaw/workspace`
- Output: `/data/.openclaw/workspace/output`
```

**Ventaja:** Al empezar con `00-`, los humanos lo leen primero. Podemos modificar OpenClaw para que lo inyecte automáticamente.

### 🥈 #2: Modificar AGENTS.md para Incluir Regla de Carga

**Objetivo:** Que TODOS los agentes (incluidos sub-agentes) lean configuraciones críticas.

**Cambio en AGENTS.md:**
```markdown
## Every Session (ACTUALIZADO)

Antes de hacer CUALQUIER cosa:

1. ✅ Leer `00-START-HERE.md` (configuración crítica)
2. Leer `SOUL.md` (quién sos)
3. Leer `USER.md` (a quién ayudás)
4. Leer `memory/YYYY-MM-DD.md` (hoy + ayer)
5. **Si estás en MAIN:** También leer `MEMORY.md`
6. **Si necesitás canales/tokens:** Leer `CONFIG-SISTEMA.md`
```

### 🥉 #3: Crear Hook de Bootstrap para Carga Automática

**Objetivo:** Inyectar configuraciones críticas ANTES de que el agente empiece a pensar.

**Implementación:**
```bash
# /data/.openclaw/hooks/bootstrap-config/HOOK.md
name: bootstrap-config
description: Inject critical config before session starts
triggers: agent:bootstrap
```

```typescript
// handler.ts
export async function handle(event: 'agent:bootstrap') {
  const configFiles = [
    '00-START-HERE.md',
    'CONFIG-SISTEMA.md',
    'memory/00-configuracion-critica.md'
  ];
  
  // Inject into system prompt
  for (const file of configFiles) {
    const content = await readFile(file);
    injectIntoPrompt(`## ${file}\n\n${content}`);
  }
}
```

### 🏅 #4: Sistema de "Memoria Permanente" en openclaw.json

**Objetivo:** Configurar en openclaw.json qué archivos cargar SIEMPRE.

**Implementación:**
```json
{
  "agents": {
    "list": [
      {
        "id": "main",
        "memory": {
          "alwaysLoad": [
            "00-START-HERE.md",
            "CONFIG-SISTEMA.md",
            "memory/00-configuracion-critica.md"
          ]
        }
      },
      {
        "id": "dev",
        "memory": {
          "alwaysLoad": [
            "00-START-HERE.md",
            "CONFIG-SISTEMA.md"
          ]
        }
      }
    ]
  }
}
```

### 🎖️ #5: Script de Verificación de Configuración

**Objetivo:** Detectar automáticamente si faltan configuraciones críticas.

**Implementación:**
```bash
#!/bin/bash
# /data/.openclaw/workspace/scripts/verify-config.sh

REQUIRED_FILES=(
  "00-START-HERE.md"
  "CONFIG-SISTEMA.md"
  "memory/00-configuracion-critica.md"
)

MISSING=()
for file in "${REQUIRED_FILES[@]}"; do
  if [ ! -f "/data/.openclaw/workspace/$file" ]; then
    MISSING+=("$file")
  fi
done

if [ ${#MISSING[@]} -gt 0 ]; then
  echo "⚠️ FALTAN ARCHIVOS CRÍTICOS:"
  for file in "${MISSING[@]}"; do
    echo "  - $file"
  done
  exit 1
fi

echo "✅ Configuración crítica verificada"
```

---

## 📦 Implementación Inmediata

### Paso 1: Crear `00-START-HERE.md`

```bash
cat > /data/.openclaw/workspace/00-START-HERE.md << 'EOF'
# ⚙️ CONFIGURACIÓN CRÍTICA - LEER PRIMERO

**Este archivo se carga en TODAS las sesiones.**

---

## 📡 Canales (PERMANENTES)

### Telegram
- Bot Token: `8342610374:AAH3TAo3sWtT5w8XyLJX5VC0b7NjBatCSpw`
- Grupo ID: `-1003642418702`
- Thread: `38`
- Usuario (Gabriel): `533617529`

### Discord
- Bot Token: `MTQ3OTY2MDU2NTYwMDE0NTU4MQ.GX6T1i...`
- Canal Lyra: `1482027396193583244`
- Canal Radar: `1482027354799996951`
- Canal Main: `1479095447741272066`

---

## 📂 Rutas Críticas

- Workspace: `/data/.openclaw/workspace`
- Output: `/data/.openclaw/workspace/output`
- Logs: `/tmp/openclaw/`

---

## 🤖 Agentes

- `main` = Spock (coordinador)
- `dev` = Kael (código)
- `lyra` = Lyra (contenido)
- `radar` = Radar (tendencias)
- `vera` = Vera (auditoría)

---

**REGLA:** Si perdés esta config, revisá `CONFIG-SISTEMA.md` (backup completo).
EOF
```

### Paso 2: Actualizar AGENTS.md

Agregar al inicio de la sección "Every Session":

```markdown
### 🚨 PRIMERO: Configuración Crítica

**Antes de cualquier otra cosa:**
1. Leer `00-START-HERE.md` → IDs de canales, tokens, rutas
2. Si no existe → Leer `CONFIG-SISTEMA.md`
3. Si no existe → Leer `memory/00-configuracion-critica.md`

**Estos archivos NUNCA cambian.** Una vez configurados, son permanentes.
```

### Paso 3: Crear Script de Verificación

```bash
cat > /data/.openclaw/workspace/scripts/verify-config.sh << 'EOF'
#!/bin/bash
# Verifica que existan archivos de configuración crítica

WORKSPACE="/data/.openclaw/workspace"
REQUIRED=(
  "00-START-HERE.md"
  "CONFIG-SISTEMA.md"
  "memory/00-configuracion-critica.md"
)

echo "🔍 Verificando configuración crítica..."

MISSING=()
for file in "${REQUIRED[@]}"; do
  if [ ! -f "$WORKSPACE/$file" ]; then
    MISSING+=("$file")
    echo "  ❌ $file"
  else
    echo "  ✅ $file"
  fi
done

if [ ${#MISSING[@]} -gt 0 ]; then
  echo ""
  echo "⚠️  FALTAN ${#MISSING[@]} archivos críticos!"
  echo "   Restaurar desde backup o GitHub."
  exit 1
fi

echo ""
echo "✅ Configuración crítica verificada"
EOF

chmod +x /data/.openclaw/workspace/scripts/verify-config.sh
```

### Paso 4: Agregar a HEARTBEAT.md

```markdown
## Verificación de Configuración (Cada 3 días)

- [ ] Ejecutar `./scripts/verify-config.sh`
- [ ] Verificar que IDs de canales no cambiaron
- [ ] Confirmar tokens vigentes (especialmente Twitter)
```

---

## 🎯 Flujo Ideal de Persistencia

```
┌─────────────────────────────────────────────────────────────┐
│                    INICIO DE SESIÓN                         │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│ 1. Hook bootstrap-config inyecta:                           │
│    - 00-START-HERE.md (SIEMPRE)                             │
│    - CONFIG-SISTEMA.md (SIEMPRE)                            │
│    - memory/00-configuracion-critica.md (SIEMPRE)           │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│ 2. AGENTS.md instruye leer en orden:                        │
│    - 00-START-HERE.md → Configuración crítica              │
│    - SOUL.md → Identidad                                    │
│    - USER.md → Usuario                                      │
│    - memory/YYYY-MM-DD.md → Contexto reciente              │
│    - MEMORY.md → Solo si es sesión main                    │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│ 3. Agente tiene TODA la configuración antes de actuar       │
│    ✅ IDs de canales disponibles                            │
│    ✅ Tokens disponibles                                    │
│    ✅ Rutas disponibles                                     │
│    ✅ Contexto de sesiones anteriores                       │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│ 4. Antes de finalizar (opcional):                           │
│    - Verificar si hay cambios de configuración             │
│    - Si sí → Actualizar CONFIG-SISTEMA.md                  │
│    - Commit automático a GitHub                            │
└─────────────────────────────────────────────────────────────┘
```

---

## 📊 Comparación: Antes vs Después

| Aspecto | Antes | Después |
|---------|-------|---------|
| **Carga de config** | Manual, inconsistente | Automática, garantizada |
| **Sub-agentes** | Sin configuración | Heredan config crítica |
| **Persistencia** | Dependía de MEMORY.md | Múltiples capas de backup |
| **Recuperación** | Reconfigurar desde cero | Restaurar desde 00-START-HERE.md |
| **Verificación** | Ninguna | Script automático + heartbeat |

---

## ⚠️ Advertencias Importantes

1. **NO guardar tokens sensibles en archivos de texto plano** → Usar `.env` con permisos restringidos
2. **Commit a GitHub con cuidado** → Excluir `.env` y tokens reales del repo
3. **Backup múltiple** → Tener copias en:
   - `/data/.openclaw/workspace/CONFIG-SISTEMA.md`
   - `/data/.openclaw/workspace/memory/00-configuracion-critica.md`
   - GitHub repo privado
   - Google Drive (exportado)

---

## ✅ Checklist de Implementación

- [ ] Crear `00-START-HERE.md`
- [ ] Actualizar `AGENTS.md` con regla de carga
- [ ] Crear script `scripts/verify-config.sh`
- [ ] Agregar verificación a `HEARTBEAT.md`
- [ ] (Opcional) Crear hook `bootstrap-config`
- [ ] (Opcional) Modificar `openclaw.json` para carga automática
- [ ] Probar en sesión nueva
- [ ] Probar en sub-agente (dev/lyra/radar)
- [ ] Documentar en `memory/regressions.md`

---

## 📝 Conclusión

El problema NO es que los archivos de configuración no existan → **existen y están actualizados**.

El problema es que **no se inyectan automáticamente en el prompt del sistema** → el agente no los "ve" a menos que los lea explícitamente.

**Solución:** Crear una capa de carga prioritaria que garantice que TODOS los agentes (main y sub-agentes) tengan acceso a la configuración crítica ANTES de empezar a trabajar.

**Implementación mínima viable:**
1. `00-START-HERE.md` (archivo de carga prioritaria)
2. Actualizar `AGENTS.md` (instrucción de lectura)
3. Script de verificación (detección de problemas)

**Implementación completa:**
- Agregar hook de bootstrap
- Modificar openclaw.json
- Commit automático de cambios

---

**Próximo paso:** Implementar solución mínima viable y probar en sesión nueva.
