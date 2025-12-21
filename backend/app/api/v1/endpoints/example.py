"""Example endpoints."""
from fastapi import APIRouter
from app.models.example import ExampleRequest, ExampleResponse
from app.services.example_service import ExampleService

router = APIRouter()


@router.post("", response_model=ExampleResponse)
async def create_example(request: ExampleRequest):
    """Create an example resource."""
    service = ExampleService()
    result = service.process_example(request)
    return result


@router.get("", response_model=ExampleResponse)
async def get_example():
    """Get example data."""
    service = ExampleService()
    result = service.get_example()
    return result

