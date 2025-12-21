"""Project service for reading portfolio projects."""
import json
import os
from pathlib import Path
from typing import List

from fastapi import HTTPException

from app.models.project import Project


class ProjectService:
    """Service for project operations."""
    
    def __init__(self, data_file: str = "data/projects.json"):
        """Initialize the project service.
        
        Args:
            data_file: Path to the projects JSON file relative to project root
        """
        self.data_file = data_file
        self._projects_cache: List[Project] | None = None
    
    def _get_data_path(self) -> Path:
        """Get the absolute path to the data file.
        
        Works in both local development and AWS Lambda environments.
        With CodeUri: ".", Lambda package includes both app/ and data/ directories.
        """
        current_file = Path(__file__)
        
        # Get project root (backend directory)
        # From app/services/project_service.py, go up 3 levels to backend/
        project_root = current_file.parent.parent.parent
        data_path = project_root / self.data_file
        
        # In Lambda, /var/task is the working directory
        # With CodeUri: ".", the structure is /var/task/app/ and /var/task/data/
        # So we can also check relative to /var/task
        if not data_path.exists():
            lambda_root = Path("/var/task")
            if lambda_root.exists():
                data_path = lambda_root / self.data_file
        
        return data_path
    
    def _load_projects(self) -> List[Project]:
        """Load projects from JSON file.
        
        Returns:
            List of Project models
            
        Raises:
            HTTPException: If the file is missing or invalid
        """
        data_path = self._get_data_path()
        
        if not data_path.exists():
            raise HTTPException(
                status_code=404,
                detail=f"Projects data file not found at {data_path}"
            )
        
        try:
            with open(data_path, "r", encoding="utf-8") as f:
                data = json.load(f)
            
            # Handle both list and dict formats
            if isinstance(data, dict):
                # If it's a dict with a 'projects' key
                if "projects" in data:
                    projects_data = data["projects"]
                else:
                    # If it's a dict of projects keyed by ID
                    projects_data = list(data.values())
            else:
                projects_data = data
            
            # Validate and parse projects
            projects = [Project(**project) for project in projects_data]
            return projects
            
        except json.JSONDecodeError as e:
            raise HTTPException(
                status_code=500,
                detail=f"Invalid JSON format in projects file: {str(e)}"
            )
        except Exception as e:
            raise HTTPException(
                status_code=500,
                detail=f"Error reading projects file: {str(e)}"
            )
    
    def get_all_projects(self) -> List[Project]:
        """Get all projects.
        
        Returns:
            List of all projects
            
        Raises:
            HTTPException: If the file is missing or invalid
        """
        if self._projects_cache is None:
            self._projects_cache = self._load_projects()
        return self._projects_cache
    
    def get_project_by_id(self, project_id: str) -> Project:
        """Get a project by ID.
        
        Args:
            project_id: The project ID
            
        Returns:
            Project model
            
        Raises:
            HTTPException: If project not found or file is missing
        """
        projects = self.get_all_projects()
        
        for project in projects:
            if project.id == project_id:
                return project
        
        raise HTTPException(
            status_code=404,
            detail=f"Project with id '{project_id}' not found"
        )

