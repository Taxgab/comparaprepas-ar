#!/usr/bin/env node
/**
 * Cloudflare Crawl - Iniciar Crawl
 * Inicia un crawl de sitio web completo usando Browser Rendering API
 */

require('dotenv').config({ path: '/data/.openclaw/workspace/.env' });

const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
const API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;

if (!ACCOUNT_ID || !API_TOKEN) {
  console.error('❌ Error: Faltan credenciales de Cloudflare');
  console.error('   Configurar en .env:');
  console.error('   CLOUDFLARE_ACCOUNT_ID=your_account_id');
  console.error('   CLOUDFLARE_API_TOKEN=your_api_token');
  process.exit(1);
}

/**
 * Inicia un crawl de sitio web
 * @param {string} url - URL inicial para comenzar el crawl
 * @param {object} options - Opciones del crawl
 */
async function startCrawl(url, options = {}) {
  const defaultOptions = {
    maxPages: 50,
    maxDepth: 3,
    outputFormats: ['markdown', 'json'],
    render: true,
    respectRobotsTxt: true,
  };
  
  const config = { ...defaultOptions, ...options, url };
  
  console.log(`🕷️  Iniciando crawl de: ${url}`);
  console.log(`   Max páginas: ${config.maxPages}`);
  console.log(`   Max profundidad: ${config.maxDepth}`);
  console.log(`   Formatos: ${config.outputFormats.join(', ')}`);
  
  try {
    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/browser-rendering/crawl`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(config),
      }
    );
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.errors?.[0]?.message || 'Error al iniciar crawl');
    }
    
    console.log('✅ Crawl iniciado exitosamente!');
    console.log(`   Job ID: ${data.result?.id || data.id}`);
    console.log(`   Estado: ${data.result?.status || data.status}`);
    
    return data.result || data;
  } catch (error) {
    console.error('❌ Error al iniciar crawl:', error.message);
    throw error;
  }
}

// Si se ejecuta directamente
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.length < 1) {
    console.log('Uso: node crawl-start.js <url> [maxPages] [maxDepth]');
    console.log('Ejemplo: node crawl-start.js https://techcrunch.com 50 3');
    process.exit(1);
  }
  
  const [url, maxPages, maxDepth] = args;
  
  startCrawl(url, {
    maxPages: parseInt(maxPages) || 50,
    maxDepth: parseInt(maxDepth) || 3,
  }).catch(console.error);
}

module.exports = { startCrawl };
