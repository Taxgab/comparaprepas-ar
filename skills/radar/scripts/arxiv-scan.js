#!/usr/bin/env node
/**
 * Radar - ArXiv Scanner
 * Escanea ArXiv CS.AI buscando papers de agentes autónomos
 */

const fetch = require('node-fetch');

const ARXIV_API = 'http://export.arxiv.org/api/query';
const SEARCH_TERMS = ['autonomous agent', 'multi-agent system', 'llm agent', 'ai agent', 'agent framework'];
const MAX_RESULTS = 20;

async function scan() {
    console.log('📡 Escaneando ArXiv CS.AI...');
    
    const results = [];
    
    // Buscar por términos clave en CS.AI
    for (const term of SEARCH_TERMS) {
        try {
            const searchQuery = `cat:cs.AI+AND+all:${term.replace(/\s+/g, '+')}`;
            const url = `${ARXIV_API}?search_query=${searchQuery}&start=0&max_results=5&sortBy=submittedDate&sortOrder=descending`;
            
            const res = await fetch(url);
            const xml = await res.text();
            
            // Parse XML simple
            const entries = xml.split('<entry>');
            
            for (let i = 1; i < entries.length && i <= 3; i++) {
                const entry = entries[i];
                
                const titleMatch = entry.match(/<title>([^<]+)<\/title>/);
                const summaryMatch = entry.match(/<summary>([^<]+)<\/summary>/);
                const idMatch = entry.match(/<id>([^<]+)<\/id>/);
                const publishedMatch = entry.match(/<published>([^<]+)<\/published>/);
                
                if (titleMatch && idMatch) {
                    const title = titleMatch[1].replace(/\s+/g, ' ').trim();
                    const summary = summaryMatch ? summaryMatch[1].replace(/\s+/g, ' ').trim().slice(0, 300) : '';
                    const id = idMatch[1];
                    const published = publishedMatch ? publishedMatch[1] : new Date().toISOString();
                    
                    // Filtrar papers muy viejos
                    const pubDate = new Date(published);
                    const daysOld = (Date.now() - pubDate.getTime()) / (1000 * 60 * 60 * 24);
                    
                    if (daysOld < 30 && !results.find(r => r.id === id)) {
                        results.push({
                            source: 'ArXiv CS.AI',
                            title: title,
                            url: id.replace('http://', 'https://'),
                            summary: summary,
                            published: published,
                            daysOld: Math.round(daysOld)
                        });
                    }
                }
            }
        } catch (e) {
            // Continuar con el siguiente término
        }
    }
    
    // Ordenar por fecha (más reciente primero)
    results.sort((a, b) => new Date(b.published) - new Date(a.published));
    
    console.log(`✓ ArXiv: ${results.length} papers relevantes encontrados`);
    return results.slice(0, MAX_RESULTS);
}

// Export para uso modular
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { scan };
}

// Ejecución directa
if (require.main === module) {
    scan().then(results => {
        console.log('\n=== Resultados ===');
        results.forEach((r, i) => {
            console.log(`${i + 1}. [${r.daysOld} días] ${r.title.slice(0, 60)}...`);
            console.log(`   ${r.url}`);
        });
        console.log('\n' + JSON.stringify(results, null, 2));
    });
}
