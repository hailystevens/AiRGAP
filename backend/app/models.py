"""
AI Model management for AiRGAP
Handles loading and inference with offline AI models
"""

from typing import Optional
from pydantic import BaseModel


class ChatMessage(BaseModel):
    """Chat message schema"""
    role: str
    content: str


class ChatRequest(BaseModel):
    """Chat request schema"""
    message: str
    conversation_id: Optional[str] = None


class ChatResponse(BaseModel):
    """Chat response schema"""
    response: str
    conversation_id: str
    model: str


class ModelInfo(BaseModel):
    """Model information schema"""
    name: str
    type: str
    size: str
    status: str
