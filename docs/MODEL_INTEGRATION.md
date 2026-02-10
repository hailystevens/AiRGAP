# AI Model Integration Guide

This guide explains how to integrate AI models into AiRGAP.

## Supported Model Formats

AiRGAP supports various model formats for maximum flexibility:

### 1. Hugging Face Transformers

Most common format for modern language models.

**Example**: Download and use a model

```python
from transformers import AutoTokenizer, AutoModelForCausalLM

# Download model (do this once, before going offline)
model_name = "microsoft/DialoGPT-small"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name)

# Save for offline use
tokenizer.save_pretrained("./backend/models/dialogpt-small")
model.save_pretrained("./backend/models/dialogpt-small")
```

### 2. GGUF Format (llama.cpp)

Quantized models for efficient inference on CPU.

**Requirements**:
```bash
pip install llama-cpp-python
```

**Example**:
```python
from llama_cpp import Llama

llm = Llama(model_path="./backend/models/llama-2-7b.Q4_K_M.gguf")
output = llm("Q: What is AI? A:", max_tokens=100)
```

### 3. ONNX Models

Optimized models for cross-platform inference.

**Requirements**:
```bash
pip install onnxruntime
```

### 4. PyTorch Models

Native PyTorch .pt or .pth files.

## Model Storage

Place models in: `backend/models/`

Example structure:
```
backend/models/
├── dialogpt-small/
│   ├── config.json
│   ├── pytorch_model.bin
│   └── tokenizer.json
├── llama-2-7b.Q4_K_M.gguf
└── sentence-transformer/
    └── all-MiniLM-L6-v2/
```

## Recommended Models for Offline Use

### Small Models (< 1GB)
- **microsoft/DialoGPT-small**: 117M parameters, conversational AI
- **distilbert-base-uncased**: 66M parameters, text understanding
- **all-MiniLM-L6-v2**: 22M parameters, sentence embeddings

### Medium Models (1-5GB)
- **microsoft/DialoGPT-medium**: 345M parameters, better conversations
- **facebook/opt-1.3b**: 1.3B parameters, general purpose
- **EleutherAI/gpt-neo-1.3B**: 1.3B parameters, text generation

### Large Models (> 5GB)
- **meta-llama/Llama-2-7b** (GGUF): 7B parameters, advanced AI
- **facebook/opt-6.7b**: 6.7B parameters, powerful generation
- **EleutherAI/gpt-j-6B**: 6B parameters, high quality text

## Downloading Models for Offline Use

### Method 1: Hugging Face Hub (Recommended)

```python
from huggingface_hub import snapshot_download

# Download entire model repository
snapshot_download(
    repo_id="microsoft/DialoGPT-small",
    local_dir="./backend/models/dialogpt-small",
    local_dir_use_symlinks=False
)
```

### Method 2: Direct Download

Use `huggingface-cli` tool:

```bash
# Install CLI
pip install huggingface_hub[cli]

# Download model
huggingface-cli download microsoft/DialoGPT-small \
    --local-dir ./backend/models/dialogpt-small
```

### Method 3: Manual Download

1. Visit https://huggingface.co/models
2. Find your model
3. Click "Files and versions"
4. Download all files to `backend/models/[model-name]/`

## Integration Example

Here's how to integrate a model into the backend:

**backend/app/ai_service.py** (create this file):

```python
from transformers import AutoTokenizer, AutoModelForCausalLM
import torch

class AIService:
    def __init__(self, model_path: str):
        self.tokenizer = AutoTokenizer.from_pretrained(model_path)
        self.model = AutoModelForCausalLM.from_pretrained(model_path)
        self.device = "cuda" if torch.cuda.is_available() else "cpu"
        self.model.to(self.device)
    
    def generate_response(self, prompt: str, max_length: int = 100) -> str:
        inputs = self.tokenizer.encode(prompt, return_tensors="pt").to(self.device)
        
        outputs = self.model.generate(
            inputs,
            max_length=max_length,
            pad_token_id=self.tokenizer.eos_token_id,
            do_sample=True,
            top_k=50,
            top_p=0.95
        )
        
        response = self.tokenizer.decode(outputs[0], skip_special_tokens=True)
        return response
```

## Model Configuration

Update `backend/config/settings.py`:

```python
class Settings:
    # Model Settings
    MODEL_PATH: str = "./models/dialogpt-small"
    DEFAULT_MODEL: str = "dialogpt"
    MAX_LENGTH: int = 100
    TEMPERATURE: float = 0.7
    
    # Hardware Settings
    USE_GPU: bool = True  # Auto-detected if available
    MAX_MEMORY: str = "8GB"  # Limit memory usage
```

## Performance Optimization

### 1. Quantization
Reduce model size and increase speed:

```python
from transformers import AutoModelForCausalLM
import torch

model = AutoModelForCausalLM.from_pretrained(
    model_path,
    torch_dtype=torch.float16,  # Use half precision
    low_cpu_mem_usage=True
)
```

### 2. Model Caching
Keep model in memory:

```python
# In main.py
from app.ai_service import AIService

# Initialize once at startup
ai_service = AIService(settings.MODEL_PATH)

@app.post("/api/v1/chat")
async def chat(request: ChatRequest):
    response = ai_service.generate_response(request.message)
    return {"response": response}
```

### 3. Batch Processing
Process multiple requests together for efficiency.

## Troubleshooting

### Out of Memory
- Use smaller models
- Enable quantization
- Reduce batch size
- Use GGUF format for CPU inference

### Slow Inference
- Use GPU if available
- Try quantized models
- Reduce max_length parameter
- Use smaller models for testing

### Model Not Found
- Verify model files are in `backend/models/`
- Check model path in settings
- Ensure all required files are present

## Ollama Integration (Alternative)

For easier model management, consider using Ollama:

1. Install Ollama: https://ollama.ai
2. Pull models: `ollama pull llama2`
3. Use Ollama API from backend

```python
import requests

def chat_with_ollama(message: str) -> str:
    response = requests.post(
        "http://localhost:11434/api/generate",
        json={"model": "llama2", "prompt": message}
    )
    return response.json()["response"]
```

## Next Steps

1. Download your preferred model
2. Test it locally before deploying
3. Optimize based on hardware
4. Implement chat endpoints in backend
5. Update web and mobile interfaces
