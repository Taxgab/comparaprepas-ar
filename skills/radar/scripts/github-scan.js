#!/usr/bin/env node
/**
 * Radar - GitHub Trending Scanner
 * Escanea GitHub Trending buscando repos de IA y agentes
 */

const https = require('https');

const GITHUB_TRENDING = 'https://github.com/trending';
const SEARCH_TERMS = ['agent', 'autonomous', 'llm', 'ai', 'machine-learning', 'copilot', 'automation', 'workflow'];
const MIN_STARS = 50;

function fetchUrl(url) {
    return new Promise((resolve, reject) => {
        https.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (compatible; Radar/1.0)'
            }
        }, res => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve(data));
        }).on('error', reject);
    });
}

async function scan() {
    console.log('📡 Escaneando GitHub Trending...');
    
    try {
        const html = await fetchUrl(GITHUB_TRENDING);
        const results = [];
        
        // Parseo simple sin cheerio
        const repoRegex = /<a href="\/([^"]+)"[^>]*>\s*([\w-]+\/[\w-]+)\s*<\/a>/g;
        const starsRegex = /<svg[^>]*star[^>]*<\/svg>[^<]*<span[^>]*>([^<]+)<\/span>/g;
        const descRegex = /<p[^>]*>([^<]*)<\/p>/g;
        
        let match;
        let starsMatches = [];
        let descMatches = [];
        
        while ((match = starsRegex.exec(html)) !== null) {
            starsMatches.push(match[1]);
        }
        while ((match = descRegex.exec(html)) !== null) {
            descMatches.push(match[1]);
        }
        
        const repoMatches = [];
        while ((match = repoRegex.exec(html)) !== null) {
            repoMatches.push({ name: match[2], path: match[1] });
        }
        
        repoMatches.forEach((repo, i) => {
            const desc = (descMatches[i] || '').trim().slice(0, 200);
            const starsText = (starsMatches[i] || '0').trim();
            const stars = parseInt(starsText.replace(/,/g, '').replace(/k/i, '000')) || 0;
            
            const textLower = (desc + repo.name).toLowerCase();
            const matches = SEARCH_TERMS.some(term => textLower.includes(term));
            
            if (matches && stars >= MIN_STARS) {
                results.push({
                    source: 'GitHub Trending',
                    name: repo.name,
                    url: `https://github.com/${repo.path}`,
                    description: desc,
                    stars: stars,
                    time: new Date().toISOString()
                });
            }
        });
        
        console.log(`✓ GitHub: ${results.length} repos relevantes encontrados`);
        return results;
        
    } catch (e) {
        console.log(`⚠️ Error escaneando GitHub: ${e.message}`);
        return [];
    }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { scan };
}

// Ejecución directa
if (require.main === module) {
    scan().then(results => {
        console.log('\n=== Resultados ===');
        results.forEach((r, i) => {
            console.log(`${i + 1}. [${r.stars} ⭐] ${r.name}`);
            console.log(`   ${r.description.slice(0, 80)}...`);
            console.log(`   ${r.url}`);
        });
        console.log('\n' + JSON.stringify(results, null, 2));
    }).catch(console.error);
}
