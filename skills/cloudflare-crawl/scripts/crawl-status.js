#!/usr/bin/env node
/**
 * Cloudflare Crawl - Chequear Status
 * Verifica el estado y resultados de un crawl en progreso
 */

require('dotenv').config({ path: '/data/.openclaw/workspace/.env' });

const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
const API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;

if (!ACCOUNT_ID || !API_TOKEN) {
  console.error('❌ Error: Faltan credenciales de Cloudflare');
  process.exit(1);
}

/**
 * Chequea el status de un crawl
 * @param {string} jobId - ID del job de crawl
 */
async function checkCrawlStatus(jobId) {
  console.log(`📊 Chequeando status del crawl: ${jobId}`);
  
  try {
    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/browser-rendering/crawl/${jobId}`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${API_TOKEN}`,
        },
      }
    );
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.errors?.[0]?.message || 'Error al chequear status');
    }
    
    const result = data.result || data;
    const status = result.status;
    
    console.log(`   Estado: ${status}`);
    console.log(`   Páginas procesadas: ${result.pagesProcessed || 0}`);
    console.log(`   Páginas totales: ${result.totalPages || 'calculando...'}`);
    
    if (status === 'completed') {
      console.log(`   ✅ Crawl completado!`);
      console.log(`   URLs encontradas: ${result.urls?.length || 0}`);
      
      // Guardar resultados
      if (result.urls && result.urls.length > 0) {
        const fs = require('fs');
        const outputPath = `/data/.openclaw/workspace/skills/cloudflare-crawl/results/crawl-${jobId}.json`;
        fs.mkdirSync('/data/.openclaw/workspace/skills/cloudflare-crawl/results', { recursive: true });
        fs.writeFileSync(outputPath, JSON.stringify(result, null, 2));
        console.log(`   💾 Resultados guardados en: ${outputPath}`);
      }
    } else if (status === 'failed') {
      console.log(`   ❌ Crawl fallido: ${result.error || 'Error desconocido'}`);
    } else {
      console.log(`   ⏳ En progreso...`);
    }
    
    return result;
  } catch (error) {
    console.error('❌ Error al chequear status:', error.message);
    throw error;
  }
}

// Si se ejecuta directamente
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.length < 1) {
    console.log('Uso: node crawl-status.js <jobId>');
    console.log('Ejemplo: node crawl-status.js abc123xyz');
    process.exit(1);
  }
  
  checkCrawlStatus(args[0]).catch(console.error);
}

module.exports = { checkCrawlStatus };
