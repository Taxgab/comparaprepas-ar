#!/usr/bin/env node
/**
 * Media Transcribe - Transcripción de audio/video
 * Soporta: AssemblyAI, Gemini, Groq Whisper
 */

require('dotenv').config({ path: '/data/.openclaw/workspace/.env' });
const fs = require('fs');
const path = require('path');

// Providers disponibles
const PROVIDERS = {
  assemblyai: process.env.ASSEMBLYAI_API_KEY,
  groq: process.env.GROQ_API_KEY,
  gemini: process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY,
};

/**
 * Transcribir archivo de audio/video
 * @param {string} filePath - Ruta del archivo
 * @param {string} provider - Provider a usar (assemblyai, groq, gemini)
 */
async function transcribeFile(filePath, provider = 'auto') {
  console.log(`🎙️  Transcribiendo: ${filePath}`);
  
  // Auto-seleccionar provider
  if (provider === 'auto') {
    if (PROVIDERS.assemblyai) provider = 'assemblyai';
    else if (PROVIDERS.groq) provider = 'groq';
    else if (PROVIDERS.gemini) provider = 'gemini';
    else {
      throw new Error('No hay API keys configuradas para transcripción');
    }
  }
  
  console.log(`   Provider: ${provider}`);
  
  // Verificar que el archivo existe
  if (!fs.existsSync(filePath)) {
    throw new Error(`Archivo no encontrado: ${filePath}`);
  }
  
  // Transcribir según provider
  let transcript;
  
  switch (provider) {
    case 'assemblyai':
      transcript = await transcribeWithAssemblyAI(filePath);
      break;
    case 'groq':
      transcript = await transcribeWithGroq(filePath);
      break;
    case 'gemini':
      transcript = await transcribeWithGemini(filePath);
      break;
    default:
      throw new Error(`Provider desconocido: ${provider}`);
  }
  
  console.log('✅ Transcripción completada');
  return transcript;
}

/**
 * Transcribir con AssemblyAI
 */
async function transcribeWithAssemblyAI(filePath) {
  const API_KEY = process.env.ASSEMBLYAI_API_KEY;
  
  console.log('   📡 Subiendo a AssemblyAI...');
  
  // Paso 1: Subir archivo
  const fileBuffer = fs.readFileSync(filePath);
  
  const uploadResponse = await fetch('https://api.assemblyai.com/v2/upload', {
    method: 'POST',
    headers: {
      'authorization': API_KEY,
      'content-type': 'application/octet-stream',
    },
    body: fileBuffer,
  });
  
  const uploadData = await uploadResponse.json();
  const uploadUrl = uploadData.upload_url;
  
  // Paso 2: Iniciar transcripción
  const transcriptResponse = await fetch('https://api.assemblyai.com/v2/transcript', {
    method: 'POST',
    headers: {
      'authorization': API_KEY,
      'content-type': 'application/json',
    },
    body: JSON.stringify({ audio_url: uploadUrl }),
  });
  
  const transcriptData = await transcriptResponse.json();
  const transcriptId = transcriptData.id;
  
  // Paso 3: Polling hasta completar
  console.log('   ⏳ Procesando...');
  
  let status = 'processing';
  let result;
  
  while (status === 'processing') {
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const statusResponse = await fetch(`https://api.assemblyai.com/v2/transcript/${transcriptId}`, {
      headers: { 'authorization': API_KEY },
    });
    
    result = await statusResponse.json();
    status = result.status;
  }
  
  if (status === 'error') {
    throw new Error(`AssemblyAI error: ${result.error}`);
  }
  
  return {
    text: result.text,
    confidence: result.confidence,
    words: result.words,
    provider: 'assemblyai',
  };
}

/**
 * Transcribir con Groq Whisper
 */
async function transcribeWithGroq(filePath) {
  const API_KEY = process.env.GROQ_API_KEY;
  
  console.log('   📡 Subiendo a Groq Whisper...');
  
  // Groq tiene límite de 30MB, hacer chunking si es necesario
  const fileSize = fs.statSync(filePath).size;
  const MAX_SIZE = 30 * 1024 * 1024; // 30MB
  
  if (fileSize > MAX_SIZE) {
    console.log('   ⚠️  Archivo > 30MB, usando chunking...');
    // TODO: Implementar chunking con ffmpeg
    throw new Error('Chunking no implementado aún para Groq');
  }
  
  const formData = new FormData();
  const fileStream = fs.createReadStream(filePath);
  
  // Usar FormData con node-fetch
  const { FormData: NodeFormData } = await import('formdata-node');
  const { fileFromPath } = await import('formdata-node/file-from-path');
  
  const nodeFormData = new NodeFormData();
  const file = await fileFromPath(filePath);
  nodeFormData.append('file', file);
  nodeFormData.append('model', 'whisper-large-v3');
  nodeFormData.append('response_format', 'json');
  nodeFormData.append('language', 'es');
  
  const response = await fetch('https://api.groq.com/openai/v1/audio/transcriptions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
    },
    body: nodeFormData,
  });
  
  const result = await response.json();
  
  return {
    text: result.text,
    provider: 'groq',
  };
}

/**
 * Transcribir con Gemini
 */
async function transcribeWithGemini(filePath) {
  const API_KEY = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
  
  console.log('   📡 Subiendo a Gemini...');
  
  // Gemini usa Files API para archivos grandes
  const fileBuffer = fs.readFileSync(filePath);
  const base64 = fileBuffer.toString('base64');
  
  // Detectar MIME type
  const ext = path.extname(filePath).toLowerCase();
  const mimeType = {
    '.mp3': 'audio/mp3',
    '.wav': 'audio/wav',
    '.mp4': 'video/mp4',
    '.mov': 'video/quicktime',
  }[ext] || 'application/octet-stream';
  
  // Usar Gemini para transcripción
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [{
        parts: [
          { text: 'Transcribe este audio/video completamente en español.' },
          { inline_data: { mime_type: mimeType, data: base64 } }
        ]
      }]
    }),
  });
  
  const result = await response.json();
  
  if (result.error) {
    throw new Error(`Gemini error: ${result.error.message}`);
  }
  
  return {
    text: result.candidates?.[0]?.content?.parts?.[0]?.text || '',
    provider: 'gemini',
  };
}

// Si se ejecuta directamente
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.length < 1) {
    console.log('Uso: node transcribe.js <archivo> [provider]');
    console.log('Providers: assemblyai, groq, gemini, auto (default)');
    console.log('Ejemplo: node transcribe.js audio.mp3 assemblyai');
    process.exit(1);
  }
  
  const [filePath, provider] = args;
  
  transcribeFile(filePath, provider || 'auto')
    .then(result => {
      console.log('\n📝 Transcripción:');
      console.log('─'.repeat(60));
      console.log(result.text);
      console.log('─'.repeat(60));
      
      // Guardar en archivo
      const outputPath = filePath + '.transcript.txt';
      fs.writeFileSync(outputPath, result.text);
      console.log(`💾 Guardado en: ${outputPath}`);
    })
    .catch(error => {
      console.error('❌ Error:', error.message);
      process.exit(1);
    });
}

module.exports = { transcribeFile, PROVIDERS };
