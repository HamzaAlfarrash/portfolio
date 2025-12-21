"""Projects API router."""
from fastapi import APIRouter
from typing import List

from app.models.project import Project
from app.services.project_service import ProjectService

router = APIRouter()
project_service = ProjectService()


@router.get("", response_model=List[Project])
async def get_projects():
    """Get all projects from the portfolio.
    
    Returns:
        List of all projects
    """
    return project_service.get_all_projects()

