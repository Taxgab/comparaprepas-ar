#!/usr/bin/env node
/**
 * AgentMail - Enviar Email
 * Envía un email desde el inbox del agente
 */

require('dotenv').config({ path: '/data/.openclaw/workspace/.env' });
const { AgentMailClient } = require('agentmail');
const fs = require('fs');

const client = new AgentMailClient({
  apiKey: process.env.AGENTMAIL_API_KEY,
});

/**
 * Envía un email
 * @param {string} to - Email del destinatario
 * @param {string} subject - Asunto del email
 * @param {string} text - Cuerpo del email (texto plano)
 * @param {string} html - Cuerpo del email (HTML, opcional)
 */
async function sendEmail(to, subject, text, html = null) {
  try {
    // Cargar configuración del inbox
    const configPath = '/data/.openclaw/workspace/skills/agentmail/inbox.json';
    
    if (!fs.existsSync(configPath)) {
      throw new Error('Inbox no configurado. Ejecutá create-inbox.js primero.');
    }
    
    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    const inboxId = config.inboxId;
    
    console.log(`📧 Enviando email desde ${config.email}...`);
    
    const result = await client.inboxes.messages.send(inboxId, {
      to,
      subject,
      text,
      html: html || null,
    });
    
    console.log('✅ Email enviado exitosamente!');
    console.log(`   Message ID: ${result.messageId}`);
    console.log(`   Enviado: ${result.sentAt}`);
    
    return result;
  } catch (error) {
    console.error('❌ Error al enviar email:', error.message);
    throw error;
  }
}

// Si se ejecuta directamente con argumentos
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.length < 3) {
    console.log('Uso: node send-email.js <to> <subject> <text>');
    console.log('Ejemplo: node send-email.js usuario@example.com "Hola" "Mensaje de prueba"');
    process.exit(1);
  }
  
  const [to, subject, ...textParts] = args;
  const text = textParts.join(' ');
  
  sendEmail(to, subject, text).catch(console.error);
}

module.exports = { sendEmail };
