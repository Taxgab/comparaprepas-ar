#!/usr/bin/env node
/**
 * YouTube Crawl para Lyra
 * Descarga y transcribe videos de YouTube
 */

require('dotenv').config({ path: '/data/.openclaw/workspace/.env' });
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const { transcribeFile } = require('./transcribe');

// Canales tech/crypto para Lyra
const LYRA_CHANNELS = {
  tech: [
    'UCBJycsmduvYEL83R_U4JriQ', // Marques Brownlee
    'UCXuqSBlHAE6Xw-yeJA0Tunw', // Linus Tech Tips
    'UC9-y-6csu5WGm29I7JiwpnA', // Computerphile
  ],
  crypto: [
    'UCl2oCaw8hdR_kbq-yqd2pIA', // Coin Bureau
    'UCRvqjQPttWw8Ex_8lVKhXJw', // Crypto Banter
  ],
  ai: [
    'UCWN3xxRkmTPmbKwht9FuE5A', // Siraj Raval
    'UCbfYPyITQ-7l4upoX8nvctg', // Two Minute Papers
  ],
};

/**
 * Descargar video de YouTube
 * @param {string} url - URL del video o canal
 * @param {string} outputDir - Directorio de salida
 */
async function downloadYouTube(url, outputDir = '/tmp/youtube-dl') {
  console.log(`📺 Descargando: ${url}`);
  
  // Crear directorio
  fs.mkdirSync(outputDir, { recursive: true });
  
  return new Promise((resolve, reject) => {
    const cmd = `yt-dlp \
      --extract-audio \
      --audio-format mp3 \
      --output "${outputDir}/%(title)s.%(ext)s" \
      --write-description \
      --write-thumbnail \
      "${url}"`;
    
    console.log('   Ejecutando yt-dlp...');
    
    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        reject(new Error(`yt-dlp error: ${stderr}`));
        return;
      }
      
      // Encontrar archivo descargado
      const files = fs.readdirSync(outputDir)
        .filter(f => f.endsWith('.mp3'))
        .sort()
        .reverse();
      
      if (files.length === 0) {
        reject(new Error('No se descargó ningún archivo'));
        return;
      }
      
      const audioFile = path.join(outputDir, files[0]);
      console.log(`✅ Descargado: ${audioFile}`);
      
      resolve({
        audioFile,
        files: files.map(f => path.join(outputDir, f)),
      });
    });
  });
}

/**
 * Crawlear canal de YouTube para Lyra
 * @param {string} channelId - ID del canal
 * @param {number} maxVideos - Máximo de videos a procesar
 */
async function crawlChannelForLyra(channelId, maxVideos = 3) {
  console.log(`🔍 Crawleando canal: ${channelId}`);
  console.log(`   Máx videos: ${maxVideos}`);
  
  const url = `https://www.youtube.com/channel/${channelId}/videos`;
  const outputDir = `/tmp/youtube-lyra/${channelId}`;
  
  try {
    // Descargar últimos videos
    const result = await downloadYouTube(url, outputDir);
    
    // Transcribir cada video
    const transcripts = [];
    
    for (const file of result.files.slice(0, maxVideos)) {
      console.log(`\n🎙️  Transcribiendo: ${path.basename(file)}`);
      
      const transcript = await transcribeFile(file, 'auto');
      
      transcripts.push({
        file: path.basename(file),
        transcript: transcript.text,
        provider: transcript.provider,
      });
      
      // Limpiar archivo de audio
      fs.unlinkSync(file);
    }
    
    // Guardar resultados
    const outputFile = path.join(outputDir, 'transcripts.json');
    fs.writeFileSync(outputFile, JSON.stringify(transcripts, null, 2));
    
    console.log(`\n💾 Transcripciones guardadas: ${outputFile}`);
    
    return transcripts;
  } catch (error) {
    console.error('❌ Error:', error.message);
    throw error;
  }
}

// Si se ejecuta directamente
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.length < 1) {
    console.log('Uso: node youtube-crawl.js <url|channel_id> [maxVideos]');
    console.log('Ejemplo: node youtube-crawl.js UCl2oCaw8hdR_kbq-yqd2pIA 3');
    console.log('Ejemplo: node youtube-crawl.js https://youtube.com/watch?v=abc123');
    process.exit(1);
  }
  
  const [url, maxVideos] = args;
  
  if (url.startsWith('UC')) {
    // Es un channel ID
    crawlChannelForLyra(url, parseInt(maxVideos) || 3)
      .then(transcripts => {
        console.log('\n📝 Resumen:');
        transcripts.forEach((t, i) => {
          console.log(`\n${i+1}. ${t.file}`);
          console.log(t.transcript.slice(0, 200) + '...');
        });
      })
      .catch(console.error);
  } else {
    // Es una URL directa
    downloadYouTube(url)
      .then(async result => {
        const transcript = await transcribeFile(result.audioFile, 'auto');
        console.log('\n📝 Transcripción:');
        console.log(transcript.text.slice(0, 500) + '...');
      })
      .catch(console.error);
  }
}

module.exports = { downloadYouTube, crawlChannelForLyra, LYRA_CHANNELS };
