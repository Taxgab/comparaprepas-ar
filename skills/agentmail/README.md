# AgentMail Skill - Email para IA

Skill para enviar y recibir emails usando AgentMail API.

## 📋 Configuración Inicial

### 1. Inbox Configurado

El inbox del agente ya está configurado:

**Email:** `spock.cco@agentmail.to`

La configuración está guardada en `inbox.json`.

### 2. Ver configuración

```bash
cat inbox.json
```

---

## 🚀 Comandos

### Enviar Email

```bash
node send-email.js <destinatario> "<asunto>" "<mensaje>"
```

**Ejemplo:**
```bash
node send-email.js usuario@example.com "Hola" "Este es un mensaje de prueba"
```

### Recibir Emails

```bash
node receive-emails.js [cantidad]
```

**Ejemplo:**
```bash
node receive-emails.js 10
```

---

## 📁 Archivos

| Archivo | Función |
|---------|---------|
| `create-inbox.js` | Crear inbox de email |
| `send-email.js` | Enviar emails |
| `receive-emails.js` | Leer emails recibidos |
| `inbox.json` | Configuración del inbox (auto-generado) |
| `emails-received.json` | Emails recibidos (auto-generado) |

---

## 🔗 API Reference

### Create Inbox
```javascript
const inbox = await client.inboxes.create({
  clientId: 'openclaw-spock-agent',
  displayName: 'Spock AI Agent',
});
```

### Send Email
```javascript
await client.inboxes.messages.send(inboxId, {
  to: 'usuario@example.com',
  subject: 'Asunto',
  text: 'Cuerpo del mensaje',
  html: '<p>Cuerpo en HTML</p>', // opcional
});
```

### Receive Emails
```javascript
const result = await client.inboxes.messages.list(inboxId, { limit: 10 });
```

---

## 💡 Casos de Uso

### 1. Enviar notificaciones automáticas
```javascript
sendEmail('usuario@example.com', 'Recordatorio', 'Tu turno es mañana a las 10:00');
```

### 2. Responder emails automáticamente
```javascript
const emails = await receiveEmails(1);
if (emails.length > 0) {
  sendEmail(emails[0].from, 'Re: ' + emails[0].subject, 'Gracias por tu mensaje...');
}
```

### 3. Forward de emails a Telegram
```javascript
const emails = await receiveEmails(5);
for (const email of emails) {
  // Enviar a Telegram vía bot
}
```

---

## 🔐 Seguridad

- La API key está en `/data/.openclaw/workspace/.env`
- El inbox.json contiene información sensible
- No commitear estos archivos a GitHub

---

## 📊 Límites

- Rate limit: 429 con header `Retry-After`
- Implementar backoff exponencial para retries
- Usar `clientId` en `create()` para idempotencia

---

**Documentación oficial:** https://docs.agentmail.to
