"""CORS configuration for FastAPI."""
import re
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI

from app.core.config import settings


def setup_cors(app: FastAPI) -> None:
    """Configure CORS middleware for the FastAPI application.
    
    Supports both specific origins and regex patterns for CloudFront/S3.
    """
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.cors_origins,
        allow_origin_regex=settings.cors_origin_regex,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

