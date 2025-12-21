"""Project models."""
from pydantic import BaseModel, Field
from typing import Optional


class Project(BaseModel):
    """Project model."""
    
    id: str = Field(..., description="Project unique identifier")
    title: str = Field(..., description="Project title")
    description: str = Field(..., description="Project description")
    tech_stack: list[str] = Field(..., description="List of technologies used")
    github_url: str = Field(..., description="GitHub repository URL")
    live_url: Optional[str] = Field(None, description="Live deployment URL")
    
    class Config:
        """Pydantic config."""
        json_schema_extra = {
            "example": {
                "id": "project-1",
                "title": "Example Project",
                "description": "An example project description",
                "tech_stack": ["Python", "FastAPI", "React"],
                "github_url": "https://github.com/user/project",
                "live_url": "https://example.com"
            }
        }

