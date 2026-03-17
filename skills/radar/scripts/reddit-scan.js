#!/usr/bin/env node
/**
 * Radar - Reddit Scanner
 * Escanea subreddits de ML/AI buscando tendencias
 */

const https = require('https');

const SUBREDDITS = ['MachineLearning', 'artificial', 'LocalLLaMA', 'LangChain', 'AutoGPT'];
const SEARCH_TERMS = ['agent', 'autonomous', 'llm', 'ai agent', 'multi-agent', 'framework', 'tool'];
const MIN_SCORE = 30;

function fetchJson(url) {
    return new Promise((resolve, reject) => {
        https.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (compatible; Radar/1.0)'
            }
        }, res => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    resolve(JSON.parse(data));
                } catch (e) {
                    reject(e);
                }
            });
        }).on('error', reject);
    });
}

async function scanSubreddit(subreddit) {
    try {
        const data = await fetchJson(`https://www.reddit.com/r/${subreddit}/hot.json?limit=25`);
        const posts = data.data?.children || [];
        
        return posts
            .filter(post => {
                const d = post.data;
                const titleLower = d.title.toLowerCase();
                const selftextLower = (d.selftext || '').toLowerCase();
                
                return d.score >= MIN_SCORE &&
                       !d.title.startsWith('Moderation') &&
                       SEARCH_TERMS.some(term => titleLower.includes(term) || selftextLower.includes(term));
            })
            .map(post => {
                const d = post.data;
                return {
                    source: `Reddit r/${subreddit}`,
                    title: d.title,
                    url: `https://reddit.com${d.permalink}`,
                    score: d.score,
                    comments: d.num_comments,
                    author: d.author,
                    time: new Date(d.created_utc * 1000).toISOString(),
                    daysOld: Math.round((Date.now() - d.created_utc * 1000) / (1000 * 60 * 60 * 24))
                };
            });
    } catch (e) {
        return [];
    }
}

async function scan() {
    const allResults = [];
    
    for (const subreddit of SUBREDDITS) {
        const results = await scanSubreddit(subreddit);
        allResults.push(...results);
    }
    
    const recent = allResults.filter(r => r.daysOld <= 7);
    recent.sort((a, b) => b.score - a.score);
    
    return recent.slice(0, 15);
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { scan };
}

// Ejecución directa
if (require.main === module) {
    scan().then(results => {
        if (process.stdout.isTTY) {
            console.log('\n=== Resultados ===');
            results.forEach((r, i) => {
                console.log(`${i + 1}. [${r.score} ↑] ${r.title.slice(0, 50)}...`);
                console.log(`   ${r.url}`);
            });
        }
        console.log(JSON.stringify(results, null, 2));
    }).catch(console.error);
}
