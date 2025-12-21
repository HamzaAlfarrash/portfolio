"""Health check endpoints."""
from fastapi import APIRouter
from app.models.health import HealthResponse

router = APIRouter()


@router.get("", response_model=HealthResponse)
async def get_health():
    """Get API health status."""
    return HealthResponse(
        status="healthy",
        message="API is running successfully"
    )

