#!/usr/bin/env node
/**
 * Radar - Hacker News Scanner
 * Escanea Hacker News buscando tendencias de IA y agentes autónomos
 */

const SEARCH_TERMS = ['agent', 'autonomous', 'llm', 'ai agent', 'multi-agent', 'copilot', 'automation'];
const MIN_SCORE = 10;
const HN_API = 'https://hacker-news.firebaseio.com/v0';

async function fetchItem(id) {
    const res = await fetch(`${HN_API}/item/${id}.json`);
    return res.json();
}

async function getTopStories(limit = 30) {
    const res = await fetch(`${HN_API}/topstories.json`);
    const ids = await res.json();
    return ids.slice(0, limit);
}

async function scan() {
    const topIds = await getTopStories(50);
    const results = [];
    
    for (const id of topIds) {
        try {
            const item = await fetchItem(id);
            if (!item || !item.title || item.score < MIN_SCORE) continue;
            
            const titleLower = item.title.toLowerCase();
            const url = item.url || '';
            
            const matches = SEARCH_TERMS.some(term => 
                titleLower.includes(term) || url.toLowerCase().includes(term)
            );
            
            if (matches && !url.includes('ycombinator.com')) {
                results.push({
                    source: 'Hacker News',
                    title: item.title,
                    url: item.url || `https://news.ycombinator.com/item?id=${id}`,
                    score: item.score,
                    by: item.by,
                    time: new Date(item.time * 1000).toISOString(),
                    comments: item.descendants || 0
                });
            }
        } catch (e) {
            // Ignorar errores individuales
        }
    }
    
    return results;
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { scan };
}

// Ejecución directa
if (require.main === module) {
    scan().then(results => {
        // Solo imprimir resultados formateados si es TTY (no redirigido)
        if (process.stdout.isTTY) {
            console.log('\n=== Resultados ===');
            results.forEach((r, i) => {
                console.log(`${i + 1}. [${r.score} pts] ${r.title}`);
                console.log(`   ${r.url}`);
            });
        }
        // Siempre imprimir JSON para piping
        console.log(JSON.stringify(results, null, 2));
    }).catch(console.error);
}
