"""Example models."""
from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime


class ExampleRequest(BaseModel):
    """Example request model."""
    
    name: str = Field(..., min_length=1, max_length=100, description="Example name")
    description: Optional[str] = Field(None, max_length=500, description="Example description")
    
    class Config:
        """Pydantic config."""
        json_schema_extra = {
            "example": {
                "name": "Example Item",
                "description": "This is an example item"
            }
        }


class ExampleResponse(BaseModel):
    """Example response model."""
    
    id: str = Field(..., description="Example ID")
    name: str = Field(..., description="Example name")
    description: Optional[str] = Field(None, description="Example description")
    created_at: datetime = Field(..., description="Creation timestamp")
    
    class Config:
        """Pydantic config."""
        json_schema_extra = {
            "example": {
                "id": "example-123",
                "name": "Example Item",
                "description": "This is an example item",
                "created_at": "2024-01-01T00:00:00Z"
            }
        }

