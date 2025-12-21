"""Contact API router."""
from fastapi import APIRouter

from app.models.contact import ContactRequest, ContactResponse
from app.services.email_service import EmailService

router = APIRouter()
email_service = EmailService()


@router.post("", response_model=ContactResponse)
async def submit_contact(request: ContactRequest):
    """Submit a contact message.
    
    Args:
        request: Contact form data with name, email, and message
        
    Returns:
        Confirmation response
    """
    result = email_service.process_contact(request)
    
    return ContactResponse(
        success=result["success"],
        message=result["message"]
    )

