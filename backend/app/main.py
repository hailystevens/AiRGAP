"""
Main FastAPI application for AiRGAP
Offline AI Assistant API
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="AiRGAP API",
    description="Offline AI Assistant API",
    version="0.1.0"
)

# Configure CORS for web and mobile clients
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure appropriately for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    """Health check endpoint"""
    return {
        "status": "online",
        "message": "AiRGAP API is running",
        "version": "0.1.0"
    }


@app.get("/api/v1/health")
async def health_check():
    """API health check"""
    return {
        "status": "healthy",
        "api_version": "v1"
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
