# Media Transcribe Skill

Transcripción de audio/video y generación de slides para OpenClaw.

## 📋 Características

- 🎙️ **Transcripción de audio/video** (AssemblyAI, Groq Whisper, Gemini)
- 📺 **YouTube para Lyra** (descarga + transcripción de canales)
- 📊 **Slides en terminal** (iTerm, WezTerm, genérico)

---

## 🔧 Instalación

### 1. Instalar dependencias

```bash
cd /data/.openclaw/workspace/skills/media-transcribe
npm install formdata-node node-fetch
```

### 2. Instalar yt-dlp (para YouTube)

```bash
# Ubuntu/Debian
sudo apt install yt-dlp ffmpeg

# macOS
brew install yt-dlp ffmpeg
```

### 3. Configurar API keys

Agregar al `.env`:

```env
# Transcripción (al menos uno)
ASSEMBLYAI_API_KEY=xxx
GROQ_API_KEY=xxx
GEMINI_API_KEY=xxx

# YouTube (opcional, yt-dlp no requiere API)
```

---

## 🚀 Comandos

### Transcribir audio/video

```bash
node scripts/transcribe.js <archivo> [provider]
```

**Ejemplos:**

```bash
# Auto-detectar provider
node scripts/transcribe.js audio.mp3

# Usar AssemblyAI específicamente
node scripts/transcribe.js video.mp4 assemblyai

# Usar Groq Whisper
node scripts/transcribe.js nota-de-voz.mp3 groq
```

---

### YouTube para Lyra

```bash
node scripts/youtube-crawl.js <url|channel_id> [maxVideos]
```

**Ejemplos:**

```bash
# Crawlear canal (últimos 3 videos)
node scripts/youtube-crawl.js UCl2oCaw8hdR_kbq-yqd2pIA 3

# URL directa de video
node scripts/youtube-crawl.js https://youtube.com/watch?v=abc123
```

**Canales pre-configurados:**

```javascript
const LYRA_CHANNELS = {
  tech: [
    'UCBJycsmduvYEL83R_U4JriQ', // Marques Brownlee
    'UCXuqSBlHAE6Xw-yeJA0Tunw', // Linus Tech Tips
  ],
  crypto: [
    'UCl2oCaw8hdR_kbq-yqd2pIA', // Coin Bureau
  ],
  ai: [
    'UCbfYPyITQ-7l4upoX8nvctg', // Two Minute Papers
  ],
};
```

---

### Generar slides

```bash
node scripts/slides.js <archivo.md> [--interactive]
```

**Ejemplos:**

```bash
# Slides desde markdown
node scripts/slides.js lyra-report.md

# Modo interactivo (navegar con espacio/q)
node scripts/slides.js lyra-report.md --interactive
```

---

## 📁 Estructura

```
media-transcribe/
├── scripts/
│   ├── transcribe.js      # Transcripción de audio/video
│   ├── youtube-crawl.js   # YouTube para Lyra
│   └── slides.js          # Slides en terminal
├── package.json
└── README.md
```

---

## 🔗 API Reference

### Transcribir archivo

```javascript
const { transcribeFile } = require('./scripts/transcribe');

const result = await transcribeFile('audio.mp3', 'auto');
console.log(result.text);
console.log(result.provider); // 'assemblyai', 'groq', o 'gemini'
```

### YouTube Crawl

```javascript
const { crawlChannelForLyra } = require('./scripts/youtube-crawl');

const transcripts = await crawlChannelForLyra('UCl2oCaw8hdR_kbq-yqd2pIA', 3);
transcripts.forEach(t => {
  console.log(t.file, t.transcript);
});
```

### Generar slides

```javascript
const { generateSlides } = require('./scripts/slides');

const content = `
## Slide 1: Introducción
Contenido del primer slide...

## Slide 2: Conclusiones
Contenido del segundo slide...
`;

generateSlides(content, { interactive: false });
```

---

## 💡 Casos de Uso

### 1. Lyra - YouTube Crawl

```bash
# Agregar al lyra-scheduler.sh
node scripts/youtube-crawl.js UCl2oCaw8hdR_kbq-yqd2pIA 2
```

**Resultado:** Últimos 2 videos de Coin Bureau transcritos para curaduría.

---

### 2. Telegram - Notas de voz

```javascript
// Cuando llega nota de voz de Telegram
const transcript = await transcribeFile('voice_message.ogg', 'groq');
// Responder con texto transcrito
```

---

### 3. Daily Report - Slides

```bash
# Generar slides del reporte diario
node scripts/slides.js daily-report.md --interactive
```

---

## ⚙️ Providers de Transcripción

| Provider | Límite | Velocidad | Calidad |
|----------|--------|-----------|---------|
| **AssemblyAI** | Sin límite | Media | Alta |
| **Groq Whisper** | 30MB | Rápida | Muy alta |
| **Gemini** | 100MB | Media | Alta |

---

## 🛡️ Consideraciones

- **YouTube:** Respeta términos de servicio, solo uso personal
- **Transcripción:** Archivos temporales se borran después de procesar
- **Slides:** Compatible con iTerm2, WezTerm, y terminales genéricos

---

**Versión:** 1.0  
**Última actualización:** 2026-03-12
