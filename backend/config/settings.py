"""
Configuration for AiRGAP backend
"""

import os
from typing import List


class Settings:
    """Application settings"""
    
    # API Settings
    API_V1_PREFIX: str = "/api/v1"
    PROJECT_NAME: str = "AiRGAP"
    VERSION: str = "0.1.0"
    
    # Model Settings
    MODEL_PATH: str = os.getenv("MODEL_PATH", "./models")
    DEFAULT_MODEL: str = os.getenv("DEFAULT_MODEL", "local-llm")
    
    # Server Settings
    HOST: str = os.getenv("HOST", "0.0.0.0")
    PORT: int = int(os.getenv("PORT", "8000"))
    
    # CORS Settings
    ALLOWED_ORIGINS: List[str] = [
        "http://localhost:3000",  # Web dev server
        "http://localhost:19006",  # Mobile dev server
    ]


settings = Settings()
