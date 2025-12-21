"""Core application modules."""
from app.core.config import settings
from app.core.cors import setup_cors

__all__ = ["settings", "setup_cors"]

