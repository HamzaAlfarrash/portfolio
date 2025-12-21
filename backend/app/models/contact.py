"""Contact message models."""
from pydantic import BaseModel, Field, EmailStr


class ContactRequest(BaseModel):
    """Contact form request model."""
    
    name: str = Field(
        ...,
        min_length=2,
        description="Contact name",
        examples=["John Doe"]
    )
    email: EmailStr = Field(
        ...,
        description="Contact email address",
        examples=["john.doe@example.com"]
    )
    message: str = Field(
        ...,
        min_length=10,
        description="Contact message",
        examples=["Hello, I would like to get in touch about your portfolio."]
    )
    
    class Config:
        """Pydantic config."""
        json_schema_extra = {
            "example": {
                "name": "John Doe",
                "email": "john.doe@example.com",
                "message": "Hello, I would like to get in touch about your portfolio."
            }
        }


class ContactResponse(BaseModel):
    """Contact form response model."""
    
    success: bool = Field(..., description="Whether the message was received successfully")
    message: str = Field(..., description="Confirmation message")
    
    class Config:
        """Pydantic config."""
        json_schema_extra = {
            "example": {
                "success": True,
                "message": "Thank you for your message. I'll get back to you soon!"
            }
        }

