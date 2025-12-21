"""Blog post models."""
from pydantic import BaseModel, Field
from typing import Optional
from datetime import date as Date


class BlogPostMetadata(BaseModel):
    """Blog post metadata (without content) for list views."""
    
    slug: str = Field(..., description="Blog post slug/identifier")
    title: str = Field(..., description="Blog post title")
    date: Date = Field(..., description="Publication date")
    summary: str = Field(..., description="Blog post summary")
    tags: list[str] = Field(default_factory=list, description="Blog post tags")
    
    class Config:
        """Pydantic config."""
        json_schema_extra = {
            "example": {
                "slug": "2025-01-first-blog",
                "title": "Why I Built My Portfolio From Scratch",
                "date": "2025-01-20",
                "summary": "Why I chose a serverless, API-driven portfolio instead of a static site.",
                "tags": ["portfolio", "fastapi", "aws"]
            }
        }


class BlogPost(BlogPostMetadata):
    """Full blog post model with content."""
    
    content: str = Field(..., description="Blog post markdown content")
    
    class Config:
        """Pydantic config."""
        json_schema_extra = {
            "example": {
                "slug": "2025-01-first-blog",
                "title": "Why I Built My Portfolio From Scratch",
                "date": "2025-01-20",
                "summary": "Why I chose a serverless, API-driven portfolio instead of a static site.",
                "tags": ["portfolio", "fastapi", "aws"],
                "content": "## Introduction\n\nThis is my first personal blog post."
            }
        }

