# AiRGAP Architecture

## Overview

AiRGAP follows a client-server architecture with a Python backend and multiple frontend clients (web and mobile).

## System Components

### 1. Backend (FastAPI)

**Location**: `backend/`

The backend is built with FastAPI, a modern Python web framework that provides:

- **RESTful API**: JSON-based API for client communication
- **Model Management**: Loading and managing AI models
- **Inference Engine**: Running AI model predictions
- **CORS Support**: Configured for web and mobile clients

**Key Files**:
- `app/main.py`: Main FastAPI application
- `app/models.py`: Data models and schemas
- `config/settings.py`: Configuration management
- `models/`: Storage for AI models (gitignored)

**Endpoints**:
- `GET /`: Health check
- `GET /api/v1/health`: API health status
- Future: `/api/v1/chat`, `/api/v1/models`, etc.

### 2. Web Interface (React)

**Location**: `web/`

A responsive web application built with React:

- **Single Page Application**: Fast, modern UI
- **API Integration**: Communicates with backend via axios
- **Status Monitoring**: Real-time API connection status
- **Responsive Design**: Works on desktop, tablet, and mobile browsers

**Key Files**:
- `src/App.js`: Main application component
- `src/index.js`: Application entry point
- `public/index.html`: HTML template

### 3. Mobile App (React Native/Expo)

**Location**: `mobile/`

Cross-platform mobile app using React Native and Expo:

- **Native Performance**: Compiled to native iOS and Android
- **Cross-Platform**: Single codebase for both platforms
- **Expo Framework**: Simplified development and deployment
- **API Integration**: Connects to local backend server

**Key Files**:
- `App.js`: Main application component
- `app.json`: Expo configuration
- `babel.config.js`: Babel configuration

## Data Flow

```
┌─────────────────────────────────────────────────────────┐
│                      Clients                            │
│  ┌──────────────┐              ┌──────────────┐        │
│  │ Web Browser  │              │ Mobile App   │        │
│  │  (React)     │              │(React Native)│        │
│  └──────┬───────┘              └──────┬───────┘        │
│         │                              │                 │
│         │ HTTP/JSON                    │ HTTP/JSON       │
│         │                              │                 │
└─────────┼──────────────────────────────┼─────────────────┘
          │                              │
          └───────────┬──────────────────┘
                      │
                      ▼
          ┌─────────────────────┐
          │   FastAPI Backend   │
          │   (Port 8000)       │
          │                     │
          │  - API Endpoints    │
          │  - Request Handler  │
          │  - Model Manager    │
          └──────────┬──────────┘
                     │
                     ▼
          ┌─────────────────────┐
          │    AI Models        │
          │                     │
          │  - Model Loading    │
          │  - Inference        │
          │  - Cache Management │
          └─────────────────────┘
```

## Communication Protocol

All communication between clients and server uses:

- **Protocol**: HTTP/HTTPS
- **Format**: JSON
- **CORS**: Enabled for local development
- **Authentication**: To be implemented (for production)

## Offline Capabilities

### Backend
- Runs completely local (no external API calls)
- Models stored locally in `backend/models/`
- No telemetry or analytics

### Web
- Can be built for offline use (`npm run build`)
- Service workers can be added for PWA functionality
- All assets bundled locally

### Mobile
- Native apps run fully offline
- Models accessed via local network or embedded
- No cloud dependencies

## Deployment Scenarios

### Scenario 1: Single Machine
All components on one computer:
- Backend: localhost:8000
- Web: localhost:3000 (dev) or served via backend (prod)
- Mobile: Connects to localhost (simulator) or 192.168.x.x (device)

### Scenario 2: Local Network
- Backend: Server machine on local network (e.g., 192.168.1.100:8000)
- Web: Served from backend or separate web server
- Mobile: Connects to server IP address

### Scenario 3: Air-Gapped Network
- Backend: On isolated network
- Web: Pre-built and deployed locally
- Mobile: Apps installed via side-loading
- No external connectivity

## Security Considerations

1. **No External Connections**: System never reaches internet
2. **Local Data**: All data stays on local machines
3. **Model Security**: Models stored locally, not downloaded at runtime
4. **Future**: Add authentication for multi-user scenarios

## Technology Stack

### Backend
- Python 3.8+
- FastAPI (async web framework)
- PyTorch/Transformers (AI models)
- Uvicorn (ASGI server)

### Web
- React 18
- JavaScript/ES6+
- Axios (HTTP client)
- Create React App

### Mobile
- React Native
- Expo SDK
- JavaScript/ES6+
- Axios (HTTP client)

## Future Enhancements

1. **WebSocket Support**: Real-time streaming responses
2. **Model Caching**: Intelligent model loading and unloading
3. **Conversation Storage**: SQLite for chat history
4. **User Authentication**: JWT-based auth system
5. **Model Marketplace**: Offline model catalog and installer
