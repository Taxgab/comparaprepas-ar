# CONVENCIONES.md - Reglas de Trabajo

_Acuerdos y reglas establecidas con Gabriel._

---

## 📖 Documentación Oficial - PRIMERA REFERENCIA

**OpenClaw Docs:** https://docs.openclaw.ai/start/getting-started

**Regla de oro:** ANTES de configurar o reparar algo → Consultar docs oficiales.

**Secciones clave:**
| Tema | URL |
|------|-----|
| Getting Started | https://docs.openclaw.ai/start/getting-started |
| Configuration | https://docs.openclaw.ai/gateway/configuration-reference |
| Troubleshooting | https://docs.openclaw.ai/troubleshooting |
| Subagents | https://docs.openclaw.ai/tools/subagents |
| CLI Reference | https://docs.openclaw.ai/cli/overview |
| Security | https://docs.openclaw.ai/gateway/security |

**Cuándo consultar:**
- ✅ Antes de modificar `openclaw.json`
- ✅ Antes de configurar plugins
- ✅ Antes de spawnear subagentes
- ✅ Cuando haya errores de gateway
- ✅ Antes de cambiar políticas de seguridad

---

## 🤖 Arquitectura de Agentes

**Spock (main) = Coordinador/Orquestador**
- ✅ Sistema, configuración, memoria
- ✅ Orquestación de agentes
- ✅ Mensajería y comunicación
- ✅ Consultas generales
- ✅ **REVIEW + PUSH de trabajo de subagentes**
- ❌ NO coding directo (para eso está Kael)
- ❌ NO contenido creativo (para eso está Lyra)

**Kael (dev) = Desarrollo de Código**
- ✅ Código nuevo, debugging, code review
- ✅ Scripts, DevOps, automatización técnica
- ✅ PRs, issues, CI/CD
- ✅ Todos los repos PRIVADOS por defecto
- ❌ NO hace push a GitHub (Spock revisa y pushea)

**Lyra (content) = Contenido y Comunicación**
- ✅ Posts, tweets, LinkedIn, newsletters
- ✅ Blogs, marketing, copywriting
- ✅ Trend research y curaduría
- ✅ Repurposing de contenido
- ❌ NO publica directamente (Spock revisa)

**Regla de Delegación:**
```
¿Es coding/dev?     → Kael
¿Es contenido?      → Lyra
¿Es sistema/coord?  → Spock
```

---

## 🔄 FLUJO DE TRABAJO CON SUBAGENTES

### **Cuando Spock delega a Kael/Lyra:**

1. **Spock delega** → `sessions_spawn(agentId: "dev"|"lyra", ...)`
2. **Subagente trabaja** → Completa la tarea
3. **Subagente reporta** → Push-based (mensaje al usuario)
4. **Spock revisa** → Verifica que todo esté correcto
5. **Spock hace push** → Publica cambios en GitHub
6. **Spock notifica** → Confirma al usuario que está publicado

### **Checklist de Review (Spock):**

**Para Kael (código):**
- [ ] ¿El código compila/sin errores de sintaxis?
- [ ] ¿Los fixes aplican correctamente?
- [ ] ¿Commit message es descriptivo?
- [ ] ¿Issue relacionado se cierra (si aplica)?
- [ ] ✅ **HACER PUSH A GITHUB**

**Para Lyra (contenido):**
- [ ] ¿El contenido es correcto?
- [ ] ¿El tono es adecuado?
- [ ] ¿Los datos son precisos?
- [ ] ✅ **PUBLICAR/ENVIAR** (si está OK)

### **Regla de Oro:**

> **NUNCA dejar commits locales pendientes después de que un subagente termina.**
> 
> Spock SIEMPRE revisa y pushea inmediatamente, a menos que el usuario indique lo contrario.

---

## 📝 Formatos de Archivos - Plantillas

**Archivo:** `.file-formats.md` → Plantillas exactas de todos los archivos.

**Regla de oro para `edit`:**
1. Leer archivo completo ANTES de editar
2. Copiar texto EXACTO (mismos saltos de línea)
3. Usar última entrada como plantilla
4. Si hay duda → Usar `write` en lugar de `edit`

**Formato regressions.md:**
```markdown
### [DATE] - [TITLE]

**Síntomas:**
- [Bullet]

**Causa raíz:**
- [Bullet]

**Fix:**
- [Bullet]

**Prevención:**
- [Bullet]

---

_Last updated: [YYYY-MM-DD]_
```

---

## 🔄 Continuidad Post-Reinicio / Post-Error

**Regla establecida:** 2026-03-10

**Comportamiento requerido:**

1. **Después de reiniciar el gateway** O **después de un error:**
   - ✅ Releer los últimos 5-10 mensajes de la conversación
   - ✅ Identificar si quedamos en medio de una tarea inconclusa
   - ✅ Si hay algo pendiente → Continuar exactamente donde quedamos
   - ✅ Si todo está finalizado → No hacer nada (HEARTBEAT_OK)

2. **Qué NO hacer:**
   - ❌ No empezar de cero como si nada hubiera pasado
   - ❌ No preguntar "¿en qué estábamos?" si el contexto es claro
   - ❌ No ignorar tareas que quedaron a mitad de ejecución

3. **Ejemplo de aplicación:**
   ```
   Contexto: Estábamos listando repos de GitHub → reinicio → 
   Acción: Volver a ejecutar `gh repo list Taxgab` sin pedir aprobación de nuevo
   ```

---

## 📋 Otras Convenciones

### Comunicación
- Directo, técnico cuando se necesita
- Sin relleno corporativo ("Great question!", "I'd be happy to help!")
- Preguntar antes de asumir datos entre plataformas

### GitHub
- Todos los repos nuevos se crean PRIVADOS por defecto
- Usuario correcto: `Taxgab` (no asumir `Purigabriel`)
- **Token:** Usar `GITHUB_TOKEN` del archivo `.env` para autenticación

### Credenciales y Tokens
- **PRIMERO:** Buscar en `/data/.openclaw/workspace/.env`
- **NUNCA:** Pedir credenciales que ya están guardadas
- **SIEMPRE:** Verificar `.env` antes de ejecutar comandos que requieren auth
- **Actualizar:** Agregar nuevas credenciales al `.env` cuando se configuran

### 🔐 SEGURIDAD - Credenciales y API Keys (CRÍTICO)

**REGLA DE ORO NÚMERO 1:** API keys, tokens y secretos SOLO en `.env`.

**NUNCA commitear:**
- ❌ Tokens de Telegram (`BOT_TOKEN`)
- ❌ API keys de servicios (`sk-...`, `ghp_...`)
- ❌ Client secrets de OAuth
- ❌ Contraseñas de bases de datos
- ❌ Private keys de SSH
- ❌ Credenciales de servicios cloud

**Único lugar válido:** `/data/.openclaw/workspace/.env`

**Para código de ejemplo:**
- Usar placeholders: `TU_TOKEN_AQUI`, `API_KEY_PLACEHOLDER`
- Nunca usar tokens reales aunque sean "temporales"
- Documentar cómo obtener las credenciales (links oficiales)

---

### 🔴 SEGURIDAD - Datos Sensibles (CRÍTICO)

**REGLA DE ORO:** NUNCA exponer datos sensibles en repos públicos o documentación.

**Checklist PRE-PUSH (obligatorio antes de cualquier commit/push):**
- ❌ ¿Hay Telegram IDs reales? → Reemplazar con `123456789`
- ❌ ¿Hay emails personales? → Reemplazar con `tu-email@ejemplo.com`
- ❌ ¿Hay números de documento? → Reemplazar con `XX.XXX.XXX`
- ❌ ¿Hay direcciones físicas? → Eliminar o generalizar
- ❌ ¿Hay tokens o contraseñas? → Eliminar completamente
- ❌ ¿Hay nombres completos? → Usar solo nombre de pila o genérico

**Datos de ejemplo SIEMPRE ficticios:**
| Tipo | Ejemplo Válido | Ejemplo Inválido |
|------|----------------|------------------|
| Telegram ID | `123456789` | `533617529` (real) |
| Email | `tu-email@ejemplo.com` | `taxgab@gmail.com` (real) |
| Documento | `XX.XXX.XXX` | `30.954.700` (real) |
| Teléfono | `+XX XXXX-XXXX` | `+54 11 3137-0003` (real) |
| Token | `TU_TOKEN_AQUI` | Token real |

**Verificación automática:**
- Antes de push: Escanear archivos modificados en busca de patrones sensibles
- Si hay duda: Preguntar al usuario "¿Este dato es sensible?"

### Memoria
- Datos personales sensibles → `memory/personal-data.md`
- Errores recurrentes → `memory/regressions.md`
- Info de largo plazo → `MEMORY.md`
- Perfil actualizado → `USER.md`

---

_Última actualización: 2026-03-10_
