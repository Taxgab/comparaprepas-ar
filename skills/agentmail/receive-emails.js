#!/usr/bin/env node
/**
 * AgentMail - Recibir Emails
 * Lee los emails recibidos en el inbox del agente
 */

require('dotenv').config({ path: '/data/.openclaw/workspace/.env' });
const { AgentMailClient } = require('agentmail');
const fs = require('fs');

const client = new AgentMailClient({
  apiKey: process.env.AGENTMAIL_API_KEY,
});

/**
 * Lista los emails recibidos
 * @param {number} limit - Cantidad máxima de emails a devolver (default: 10)
 */
async function receiveEmails(limit = 10) {
  try {
    // Cargar configuración del inbox
    const configPath = '/data/.openclaw/workspace/skills/agentmail/inbox.json';
    
    if (!fs.existsSync(configPath)) {
      throw new Error('Inbox no configurado. Ejecutá create-inbox.js primero.');
    }
    
    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    const inboxId = config.inboxId;
    
    console.log(`📥 Leyendo emails de ${config.email}...`);
    
    const result = await client.inboxes.messages.list(inboxId, { limit });
    
    if (!result.messages || result.messages.length === 0) {
      console.log('📭 No hay emails nuevos.');
      return [];
    }
    
    console.log(`✅ ${result.messages.length} email(s) encontrado(s):\n`);
    
    const emails = [];
    
    for (const msg of result.messages) {
      const email = {
        id: msg.id,
        from: msg.from,
        to: msg.to,
        subject: msg.subject,
        text: msg.text,
        html: msg.html,
        extractedText: msg.extracted_text,
        extractedHtml: msg.extracted_html,
        receivedAt: msg.received_at,
        hasAttachments: msg.attachments && msg.attachments.length > 0,
      };
      
      emails.push(email);
      
      console.log('─'.repeat(60));
      console.log(`📧 De: ${msg.from}`);
      console.log(`📝 Asunto: ${msg.subject}`);
      console.log(`🕐 Recibido: ${msg.received_at}`);
      console.log(`📄 Cuerpo:`);
      console.log(`   ${msg.extracted_text || msg.text || '(sin contenido)'}`);
      if (email.hasAttachments) {
        console.log(`📎 Adjuntos: ${msg.attachments.length}`);
      }
      console.log('');
    }
    
    // Guardar emails en archivo
    const outputPath = '/data/.openclaw/workspace/skills/agentmail/emails-received.json';
    fs.writeFileSync(outputPath, JSON.stringify(emails, null, 2));
    console.log(`💾 Emails guardados en: ${outputPath}`);
    
    return emails;
  } catch (error) {
    console.error('❌ Error al leer emails:', error.message);
    throw error;
  }
}

// Si se ejecuta directamente
if (require.main === module) {
  const limit = parseInt(process.argv[2]) || 10;
  receiveEmails(limit).catch(console.error);
}

module.exports = { receiveEmails };
