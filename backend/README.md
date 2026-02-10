# AiRGAP Backend

Python backend for the AiRGAP offline AI assistant.

## Setup

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Run the server:
```bash
python -m app.main
```

The API will be available at http://localhost:8000

## API Endpoints

- `GET /` - Health check
- `GET /api/v1/health` - API health check

## Models

Place your AI models in the `models/` directory. Supported formats:
- Hugging Face models
- GGUF models (for llama.cpp)
- ONNX models
