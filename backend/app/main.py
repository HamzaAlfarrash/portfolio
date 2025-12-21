"""FastAPI application entry point for AWS Lambda."""
from mangum import Mangum
from fastapi import FastAPI

from app.core import setup_cors, settings
from app.api.v1.router import api_router
from app.api.projects import router as projects_router
from app.api.contact import router as contact_router


def create_app() -> FastAPI:
    """Create and configure FastAPI application."""
    app = FastAPI(
        title=settings.app_name,
        version=settings.app_version,
        debug=settings.debug,
    )
    
    # Setup CORS
    setup_cors(app)
    
    # Include API routers
    app.include_router(api_router, prefix="/api/v1")
    app.include_router(projects_router, prefix="/projects", tags=["projects"])
    app.include_router(contact_router, prefix="/contact", tags=["contact"])
    
    return app


# Create FastAPI app instance
app = create_app()

# Create Mangum handler for AWS Lambda
handler = Mangum(app, lifespan="off")


@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {
        "status": "healthy",
        "service": settings.app_name,
        "version": settings.app_version,
    }

