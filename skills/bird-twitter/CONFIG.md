# Bird Twitter Skill - Configuración 🐦

## Instalado: 2026-03-09

### Estado: ✅ Configurado (Solo Lectura)

**Cuenta:** @gabipuricelli
**Configurado:** 2026-03-09
**Permisos:** Lectura (timeline, search, trending) - Posteo limitado por anti-bot de Twitter

---

## 🔑 Cómo obtener los tokens

### 1. Iniciar sesión en Twitter/X
Andá a [twitter.com](https://twitter.com) e iniciá sesión con tu cuenta.

### 2. Abrir Herramientas de Desarrollador
- Presioná `F12` (o clic derecho → "Inspeccionar")
- Andá a la pestaña **Application** (o "Almacenamiento" en Firefox)

### 3. Copiar Cookies
En **Application → Cookies → https://twitter.com**:

| Cookie | Variable de entorno |
|--------|---------------------|
| `auth_token` | `TWITTER_AUTH_TOKEN` |
| `ct0` | `TWITTER_CT0` |

### 4. Actualizar `.env`
Editá `/data/.openclaw/workspace/.env`:

```bash
TWITTER_AUTH_TOKEN=tu_auth_token_aqui
TWITTER_CT0=tu_ct0_aqui
```

---

## 📋 Comandos disponibles

Una vez configurado:

```bash
# Verificar login
bird whoami
bird check

# Postear tweet
bird tweet "Hola desde OpenClaw!"

# Responder a un tweet
bird reply <tweet-id> "Gracias por compartir!"

# Leer tweet
bird read <tweet-url>

# Buscar tweets
bird search "OpenClaw"

# Timeline
bird home
bird mentions

# Trending
bird trending
bird news
```

---

## ⚠️ Notas importantes

- **Los tokens expiran** — Twitter los rota periódicamente
- **Rate limits** — La API GraphQL tiene límites de uso
- **No oficial** — Usa la API interna de Twitter, puede romperse con actualizaciones
- **Riesgo de suspensión** — No usar para spam o automatización masiva

---

## 📦 Skill info

- **Nombre:** `bird-twitter`
- **Versión:** 1.0.0
- **Autor:** cyzi
- **Repositorio:** ClawHub
- **CLI:** `bird` (v0.8.0 - deprecado pero funcional)

---

*Documentación generada: 2026-03-09*
