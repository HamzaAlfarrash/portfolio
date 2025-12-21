"""Example service."""
from datetime import datetime
from uuid import uuid4

from app.models.example import ExampleRequest, ExampleResponse


class ExampleService:
    """Service for example operations."""
    
    def process_example(self, request: ExampleRequest) -> ExampleResponse:
        """Process an example request."""
        # In a real application, this would interact with a database
        # For now, we'll just create a mock response
        return ExampleResponse(
            id=str(uuid4()),
            name=request.name,
            description=request.description,
            created_at=datetime.utcnow(),
        )
    
    def get_example(self) -> ExampleResponse:
        """Get example data."""
        return ExampleResponse(
            id="example-123",
            name="Default Example",
            description="This is a default example item",
            created_at=datetime.utcnow(),
        )

