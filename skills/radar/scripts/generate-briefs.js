#!/usr/bin/env node
/**
 * Radar - Trend Brief Generator
 * Genera Trend Briefs estructurados a partir de resultados de escaneo
 */

const fs = require('fs');
const path = require('path');

const HIGH_SIGNAL_TERMS = ['framework', 'library', 'tool', 'sdk', 'api', 'autonomous', 'agent', 'workflow', 'pipeline', 'integration'];
const NOISE_TERMS = ['funding', 'series', 'investment', 'raised', 'ceo', 'company', 'acquisition', 'announces', 'launches'];

function calculateTemperature(item) {
    let score = 50;
    if (item.score) score += Math.min(item.score / 10, 30);
    if (item.stars) score += Math.min(item.stars / 100, 30);
    if (item.comments) score += Math.min(item.comments / 5, 20);
    
    const text = (item.title + ' ' + (item.description || '') + ' ' + (item.summary || '')).toLowerCase();
    score += HIGH_SIGNAL_TERMS.filter(t => text.includes(t)).length * 5;
    score -= NOISE_TERMS.filter(t => text.includes(t)).length * 10;
    if (item.daysOld !== undefined && item.daysOld <= 2) score += 10;
    
    return Math.max(10, Math.min(99, Math.round(score)));
}

function categorizeItem(item) {
    const text = (item.title + ' ' + (item.description || '') + ' ' + (item.summary || '')).toLowerCase();
    if (text.includes('framework') || text.includes('library') || text.includes('tool')) return '🛠️ Framework/Tool';
    if (text.includes('agent') || text.includes('autonomous')) return '🤖 Agentes Autónomos';
    if (text.includes('llm') || text.includes('model')) return '🧠 LLM/Modelos';
    if (text.includes('workflow') || text.includes('automation')) return '⚡ Automatización';
    return '📡 General';
}

function generateBrief(item, index) {
    const temperature = calculateTemperature(item);
    const category = categorizeItem(item);
    
    let quePasa = item.title;
    if (item.description) quePasa += ' — ' + item.description.slice(0, 150);
    if (item.summary) quePasa += ' — ' + item.summary.slice(0, 150);
    
    let porQueImporta = 'Señal temprana de adopción/innovación en el ecosistema de IA.';
    if (item.stars && item.stars > 500) porQueImporta = `Crecimiento orgánico rápido (${item.stars} stars) indica demanda real.`;
    if (item.score && item.score > 200) porQueImporta = `Alto engagement (${item.score} puntos) sugiere relevancia para la comunidad.`;
    
    let oportunidad = 'Monitorear evolución. Considerar integración si madura.';
    if (category.includes('Framework') || category.includes('Tool')) oportunidad = 'Evaluar para uso interno. Posible ventaja temprana.';
    if (category.includes('Agentes')) oportunidad = 'Caso de uso potencial para automatización de flujos existentes.';
    
    return {
        id: index + 1,
        category,
        temperature,
        source: item.source,
        title: item.title,
        url: item.url,
        quePasa: quePasa.replace(/\n/g, ' ').trim(),
        porQueImporta,
        oportunidad,
        raw: item
    };
}

function generateMarkdown(briefs, date) {
    let md = `# 📡 Radar Morning Scan - ${date}\n\n`;
    md += `*Escaneo automático de señales débiles en IA y Agentes Autónomos*\n\n`;
    md += `**Fuentes:** Hacker News, GitHub Trending, ArXiv CS.AI, Reddit\n\n`;
    md += `**Trends detectados:** ${briefs.length}\n\n---\n\n`;
    
    const byCategory = {};
    briefs.forEach(b => {
        if (!byCategory[b.category]) byCategory[b.category] = [];
        byCategory[b.category].push(b);
    });
    
    for (const [category, items] of Object.entries(byCategory)) {
        md += `## ${category}\n\n`;
        items.forEach(brief => {
            md += `### 📡 Radar Ping #${brief.id}\n\n`;
            md += `**🔥 Temperatura:** ${brief.temperature}/100\n`;
            md += `**📍 Fuente:** ${brief.source}\n`;
            md += `**🔗 Link:** ${brief.url}\n\n`;
            md += `### 👁️ Qué pasa\n${brief.quePasa}\n\n`;
            md += `### 🧠 Por qué importa\n${brief.porQueImporta}\n\n`;
            md += `### 🎯 Oportunidad\n${brief.oportunidad}\n\n---\n\n`;
        });
    }
    
    md += `*Generado automáticamente por Radar - ${new Date().toISOString()}*\n`;
    return md;
}

async function generateBriefs(allResults, outputDir) {
    console.log('📝 Generando Trend Briefs...');
    
    const allItems = [].concat(...Object.values(allResults)).filter(x => x && x.title);
    const scored = allItems.map((item, i) => ({ ...item, _temp: calculateTemperature(item) }));
    scored.sort((a, b) => b._temp - a._temp);
    
    const topItems = scored.slice(0, 6);
    const briefs = topItems.map((item, i) => generateBrief(item, i));
    
    const date = new Date().toISOString().split('T')[0];
    const md = briefs.length > 0 ? generateMarkdown(briefs, date) : `# 📡 Radar Morning Scan - ${date}\n\n*No se detectaron señales relevantes hoy.*\n\n---\n\n*Generado automáticamente por Radar*`;
    
    const outputFile = path.join(outputDir, `radar-${date}.md`);
    fs.writeFileSync(outputFile, md);
    
    console.log(`✓ ${briefs.length} Trend Briefs generados`);
    console.log(`✓ Guardado en: ${outputFile}`);
    
    return { briefs, outputFile, md };
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { generateBriefs, calculateTemperature, categorizeItem };
}

// Ejecución directa
if (require.main === module) {
    const sampleResults = {
        hn: [{ title: 'New AI Agent Framework', url: 'https://example.com', score: 150 }],
        github: [{ name: 'autonomous-agents', stars: 500, description: 'Framework for AI agents', url: 'https://github.com' }]
    };
    generateBriefs(sampleResults, './output').then(result => {
        console.log('\n=== Preview ===\n');
        console.log(result.md.slice(0, 500));
    });
}
