#!/usr/bin/env node
/**
 * AgentMail - Crear Inbox
 * Crea un inbox de email para el agente
 */

require('dotenv').config({ path: '/data/.openclaw/workspace/.env' });
const { AgentMailClient } = require('agentmail');

const client = new AgentMailClient({
  apiKey: process.env.AGENTMAIL_API_KEY,
});

async function createInbox() {
  try {
    console.log('📧 Creando inbox de AgentMail...');
    
    // Crear inbox con ID único para el agente
    const inbox = await client.inboxes.create({
      clientId: 'openclaw-spock-agent',
      displayName: 'Spock AI Agent',
    });
    
    console.log('✅ Inbox creado exitosamente!');
    console.log('');
    console.log('📋 Detalles:');
    console.log(`   Inbox ID: ${inbox.inboxId}`);
    console.log(`   Email: ${inbox.email}`);
    console.log(`   Username: ${inbox.username}`);
    console.log(`   Domain: ${inbox.domain}`);
    console.log('');
    
    // Guardar configuración
    const fs = require('fs');
    const config = {
      inboxId: inbox.inboxId,
      email: inbox.email,
      username: inbox.username,
      domain: inbox.domain,
      createdAt: new Date().toISOString(),
    };
    
    fs.writeFileSync(
      '/data/.openclaw/workspace/skills/agentmail/inbox.json',
      JSON.stringify(config, null, 2)
    );
    
    console.log('💾 Configuración guardada en: /data/.openclaw/workspace/skills/agentmail/inbox.json');
    
    return config;
  } catch (error) {
    console.error('❌ Error al crear inbox:', error.message);
    throw error;
  }
}

// Si se ejecuta directamente
if (require.main === module) {
  createInbox().catch(console.error);
}

module.exports = { createInbox };
