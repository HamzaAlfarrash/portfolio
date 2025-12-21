"""Email service for handling contact messages."""
import json
from datetime import datetime
from typing import Dict, Any

from app.models.contact import ContactRequest


class EmailService:
    """Service for handling email/contact operations."""
    
    def log_contact_message(self, contact_request: ContactRequest) -> Dict[str, Any]:
        """Log contact message to CloudWatch.
        
        In AWS Lambda, print statements are automatically sent to CloudWatch Logs.
        
        Args:
            contact_request: The contact form request
            
        Returns:
            Dictionary with logged message details
        """
        log_entry = {
            "timestamp": datetime.utcnow().isoformat(),
            "type": "contact_message",
            "data": {
                "name": contact_request.name,
                "email": contact_request.email,
                "message": contact_request.message,
            }
        }
        
        # Print to CloudWatch (Lambda automatically captures stdout/stderr)
        print(f"[CONTACT_MESSAGE] {json.dumps(log_entry, indent=2)}")
        
        return log_entry
    
    def process_contact(self, contact_request: ContactRequest) -> Dict[str, Any]:
        """Process a contact message.
        
        Args:
            contact_request: The contact form request
            
        Returns:
            Dictionary with processing result
        """
        # Log the message to CloudWatch
        log_entry = self.log_contact_message(contact_request)
        
        # In the future, this could send an email via SES, store in database, etc.
        # For now, we just log it
        
        return {
            "success": True,
            "logged_at": log_entry["timestamp"],
            "message": "Thank you for your message. I'll get back to you soon!"
        }

