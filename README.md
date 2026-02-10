# AiRGAP - Air-Gapped AI Assistant

A completely offline AI assistant with web and mobile interfaces. No internet connection required for operation.

## Overview

AiRGAP is designed to provide AI assistant capabilities in completely offline, air-gapped environments. It supports:

- **Offline AI Models**: Integration with Hugging Face, Ollama, and other pretrained models
- **Web Interface**: React-based responsive web application
- **Mobile Interface**: React Native (Expo) cross-platform mobile app
- **Local API**: FastAPI backend for model inference and management

## Project Structure

```
AiRGAP/
├── backend/          # Python FastAPI backend
│   ├── app/          # Application code
│   ├── config/       # Configuration files
│   ├── models/       # AI model storage (gitignored)
│   └── requirements.txt
├── web/              # React web interface
│   ├── public/
│   ├── src/
│   └── package.json
├── mobile/           # React Native mobile app
│   ├── App.js
│   ├── app.json
│   └── package.json
└── docs/             # Documentation
```

## Quick Start

### Prerequisites

- Python 3.8+
- Node.js 16+
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create and activate a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Run the API server:
```bash
python -m app.main
```

The API will be available at http://localhost:8000

### Web Interface Setup

1. Navigate to the web directory:
```bash
cd web
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The web interface will be available at http://localhost:3000

### Mobile App Setup

1. Navigate to the mobile directory:
```bash
cd mobile
```

2. Install dependencies:
```bash
npm install
```

3. Start the Expo development server:
```bash
npm start
```

Follow the Expo instructions to run on iOS, Android, or web.

## AI Models

Place your pretrained AI models in the `backend/models/` directory. Supported formats include:

- Hugging Face Transformers models
- GGUF models (for llama.cpp integration)
- ONNX models
- PyTorch models (.pt, .pth)

## Features

### Current
- ✅ Basic project structure
- ✅ FastAPI backend with health check endpoints
- ✅ React web interface with API status monitoring
- ✅ React Native mobile app with API connectivity

### Planned
- 🔲 AI model loading and inference
- 🔲 Chat interface (web & mobile)
- 🔲 Model management UI
- 🔲 Conversation history
- 🔲 Multiple model support
- 🔲 Offline model download tools

## Architecture

```
┌─────────────┐         ┌─────────────┐
│ Web Client  │◄───────►│             │
├─────────────┤         │   FastAPI   │
│             │         │   Backend   │
│   React     │         │             │
└─────────────┘         │  Port 8000  │
                        │             │
┌─────────────┐         │             │
│   Mobile    │◄───────►│             │
├─────────────┤         └──────┬──────┘
│             │                │
│ React Native│                │
└─────────────┘                ▼
                        ┌─────────────┐
                        │ AI Models   │
                        ├─────────────┤
                        │ Hugging Face│
                        │   Ollama    │
                        │    GGUF     │
                        └─────────────┘
```

## Security

This project is designed for air-gapped environments where:
- No internet connectivity is available
- All data stays local
- Models are pre-downloaded and stored locally
- No telemetry or external API calls

## Contributing

Contributions are welcome! Please feel free to submit pull requests.

## License

[Add your license here]

## Support

For issues and questions, please open an issue on GitHub. 