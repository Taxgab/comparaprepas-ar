#!/usr/bin/env node
/**
 * Cloudflare Crawl - Lyra Integration
 * Wrapper para Lyra que usa Cloudflare Crawl en vez de web_search
 */

require('dotenv').config({ path: '/data/.openclaw/workspace/.env' });
const { startCrawl } = require('./crawl-start');
const { checkCrawlStatus } = require('./crawl-status');

/**
 * Sitios recomendados para Lyra
 */
const LYRA_SOURCES = {
  tech: [
    'https://techcrunch.com',
    'https://www.theverge.com',
    'https://arstechnica.com',
  ],
  crypto: [
    'https://www.coindesk.com',
    'https://cointelegraph.com',
    'https://decrypt.co',
  ],
  ai: [
    'https://openai.com/blog',
    'https://www.anthropic.com/news',
    'https://deepmind.google/discover/blog/',
  ],
};

/**
 * Crawl fuentes para Lyra
 * @param {string} topic - Tema a crawlear (tech, crypto, ai)
 * @param {number} maxPages - Máximo de páginas por sitio
 */
async function crawlForLyra(topic = 'all', maxPages = 30) {
  console.log(`📰 Lyra Crawl - Tema: ${topic}`);
  console.log(`   Máx páginas por sitio: ${maxPages}`);
  console.log('');
  
  const topics = topic === 'all' ? Object.keys(LYRA_SOURCES) : [topic];
  const jobs = [];
  
  for (const t of topics) {
    console.log(`\n🔍 Crawleando ${t.toUpperCase()}...`);
    
    for (const url of LYRA_SOURCES[t]) {
      try {
        const job = await startCrawl(url, {
          maxPages,
          maxDepth: 2,
          outputFormats: ['markdown'],
          modifiedSince: new Date(Date.now() - 86400000).toISOString(), // Últimas 24hs
        });
        
        jobs.push({ topic: t, url, jobId: job.id || job.result?.id, status: job.status });
        
        // Pequeño delay para no saturar la API
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (error) {
        console.error(`   ❌ Error con ${url}: ${error.message}`);
      }
    }
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('📋 Jobs iniciados:');
  jobs.forEach(job => {
    console.log(`   - ${job.topic}: ${job.jobId} (${job.status})`);
  });
  
  // Guardar jobs para polling posterior
  const fs = require('fs');
  const jobsFile = '/data/.openclaw/workspace/skills/cloudflare-crawl/lyra-jobs.json';
  fs.writeFileSync(jobsFile, JSON.stringify({
    date: new Date().toISOString(),
    topic,
    jobs,
  }, null, 2));
  
  console.log(`\n💾 Jobs guardados en: ${jobsFile}`);
  
  return jobs;
}

// Si se ejecuta directamente
if (require.main === module) {
  const topic = process.argv[2] || 'all';
  const maxPages = parseInt(process.argv[3]) || 30;
  
  crawlForLyra(topic, maxPages).catch(console.error);
}

module.exports = { crawlForLyra, LYRA_SOURCES };
