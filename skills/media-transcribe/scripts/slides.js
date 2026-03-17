#!/usr/bin/env node
/**
 * Terminal Slides - Generar presentaciones en terminal
 * Compatible con iTerm, WezTerm, y terminales con soporte de imágenes
 */

require('dotenv').config({ path: '/data/.openclaw/workspace/.env' });

// Detectar terminal
function detectTerminal() {
  const TERM = process.env.TERM_PROGRAM || '';
  const WEZTERM = process.env.WEZTERM_VERSION || '';
  
  if (WEZTERM) return 'wezterm';
  if (TERM.includes('iTerm')) return 'iterm';
  return 'generic';
}

/**
 * Generar slides desde texto
 * @param {string} content - Contenido a convertir en slides
 * @param {object} options - Opciones
 */
function generateSlides(content, options = {}) {
  const terminal = detectTerminal();
  console.log(`📊 Terminal detectado: ${terminal}`);
  
  // Parsear contenido en slides
  const slides = parseSlides(content);
  
  console.log(`\n📑 Slides generados: ${slides.length}\n`);
  
  // Mostrar cada slide
  slides.forEach((slide, index) => {
    showSlide(slide, index + 1, slides.length, terminal, options);
  });
  
  return slides;
}

/**
 * Parsear contenido en slides
 */
function parseSlides(content) {
  // Separar por secciones (## = nuevo slide)
  const sections = content.split(/^##\s+/m);
  
  const slides = [];
  
  sections.forEach(section => {
    if (!section.trim()) return;
    
    const lines = section.split('\n');
    const title = lines[0]?.trim() || 'Slide';
    const content = lines.slice(1).filter(l => l.trim()).join('\n');
    
    slides.push({ title, content });
  });
  
  // Si no hay secciones, crear un solo slide
  if (slides.length === 0) {
    slides.push({
      title: 'Presentación',
      content: content.slice(0, 1000),
    });
  }
  
  return slides;
}

/**
 * Mostrar slide en terminal
 */
function showSlide(slide, current, total, terminal, options) {
  const { title, content } = slide;
  
  // Limpiar pantalla
  console.clear();
  
  // Header
  console.log('╔' + '═'.repeat(78) + '╗');
  console.log('║' + centerText(`${current}/${total}`, 78) + '║');
  console.log('╠' + '═'.repeat(78) + '╣');
  console.log('║' + centerText(title, 78) + '║');
  console.log('╠' + '═'.repeat(78) + '╣');
  console.log('║' + ' '.repeat(78) + '║');
  
  // Contenido (word wrap a 76 caracteres)
  const wrappedContent = wrapText(content, 76);
  wrappedContent.forEach(line => {
    console.log('║ ' + line.padEnd(76) + ' ║');
  });
  
  // Padding si es necesario
  const remainingLines = 20 - wrappedContent.length;
  for (let i = 0; i < remainingLines; i++) {
    console.log('║' + ' '.repeat(78) + '║');
  }
  
  // Footer
  console.log('╠' + '═'.repeat(78) + '╣');
  console.log('║' + centerText('← Anterior | Espacio: Siguiente | Q: Salir', 78) + '║');
  console.log('╚' + '═'.repeat(78) + '╝');
  
  // Si es interactivo, esperar input
  if (options.interactive) {
    return waitForInput();
  }
}

/**
 * Centrar texto
 */
function centerText(text, width) {
  const padding = Math.max(0, Math.floor((width - text.length) / 2));
  return ' '.repeat(padding) + text + ' '.repeat(width - padding - text.length);
}

/**
 * Word wrap
 */
function wrapText(text, width) {
  const lines = [];
  const paragraphs = text.split('\n');
  
  paragraphs.forEach(para => {
    if (para.length <= width) {
      lines.push(para);
      return;
    }
    
    const words = para.split(' ');
    let line = '';
    
    words.forEach(word => {
      if ((line + word).length <= width) {
        line += (line ? ' ' : '') + word;
      } else {
        if (line) lines.push(line);
        line = word;
      }
    });
    
    if (line) lines.push(line);
  });
  
  return lines;
}

/**
 * Esperar input del usuario
 */
function waitForInput() {
  return new Promise(resolve => {
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.once('data', key => {
      process.stdin.setRawMode(false);
      process.stdin.pause();
      
      if (key.toString() === 'q') {
        resolve('quit');
      } else {
        resolve('next');
      }
    });
  });
}

/**
 * Mostrar imagen en terminal (iTerm/WezTerm)
 */
function showImage(imagePath, options = {}) {
  const terminal = detectTerminal();
  
  if (terminal === 'iterm') {
    // iTerm2 inline images
    const fs = require('fs');
    const image = fs.readFileSync(imagePath);
    const base64 = image.toString('base64');
    
    console.log('\n\x1b]1337;File=inline=1:' + base64 + '\x07');
  } else if (terminal === 'wezterm') {
    // WezTerm inline images
    const fs = require('fs');
    const image = fs.readFileSync(imagePath);
    const base64 = image.toString('base64');
    
    console.log('\x1b_Ga=T,d=F;' + base64 + '\x1b\\');
  } else {
    // Terminal genérico - mostrar placeholder
    console.log(`\n[Imagen: ${imagePath}]`);
  }
}

// Si se ejecuta directamente
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.length < 1) {
    console.log('Uso: node slides.js <archivo.md> [--interactive]');
    console.log('Ejemplo: node slides.js presentation.md');
    console.log('Ejemplo: node slides.js presentation.md --interactive');
    process.exit(1);
  }
  
  const [file, interactive] = args;
  const content = require('fs').readFileSync(file, 'utf8');
  
  generateSlides(content, { interactive: interactive === '--interactive' });
}

module.exports = { generateSlides, showImage, detectTerminal };
