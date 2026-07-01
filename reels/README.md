# 🎬 Stack Your Silver: Local Zero-Cost Reel Pipeline

This directory contains the blueprint and instructions for setting up a **local, zero-cost AI video generation pipeline**. This allows the team to generate high-converting social media reels (Instagram, TikTok, YouTube Shorts) from blog topics without paying for cloud subscriptions (like Pictory, HeyGen, or InVideo).

## 🚀 Overview
The pipeline converts a text topic into a fully assembled vertical video:
1. **Scripting:** Local LLM (via Ollama) generates a 30-60 second script.
2. **Audio:** Kokoro-82M TTS generates high-quality human-like voiceover.
3. **Visuals:** CogVideoX or HunyuanVideo generates relevant AI b-roll.
4. **Assembly:** FFmpeg combines audio, video, and adds dynamic captions.

## 🛠️ Local Setup Instructions

### 1. Prerequisites
- **Hardware:** NVIDIA GPU (8GB+ VRAM recommended) or Apple Silicon Mac. CPU-only is possible but slow.
- **Tools:** Python 3.10+, FFmpeg installed on system path.

### 2. Install Dependencies
```bash
pip install -r requirements.txt
```

### 3. Setup Local AI Engines
- **Scripting:** Install [Ollama](https://ollama.com/) and pull Llama3: `ollama pull llama3`.
- **TTS:** Setup [Kokoro-82M](https://github.com/hexgrad/Kokoro-82M) (Open Source TTS).
- **Video:** Setup [MoneyPrinterTurbo](https://github.com/FujiwaraChoki/MoneyPrinterTurbo) or [CogVideoX](https://github.com/THUDM/CogVideo) for local generation.

## 🎞️ Generating a Reel
Run the pipeline with a specific topic:
```bash
python pipeline.py --topic "The loss of fiat purchasing power since 1970"
```

## 📂 Directory Structure
- `pipeline.py`: Main execution script.
- `assets/`: Temporary storage for generated audio/video clips.
- `output/`: Final rendered reels ready for posting.

## 💡 Strategy: Why Zero-Cost?
By running these models locally, we:
- Avoid $50-$200/mo in AI video subscription fees.
- Maintain 100% privacy and ownership of generated assets.
- Can iterate infinitely without credit limits.
