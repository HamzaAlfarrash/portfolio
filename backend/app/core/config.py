"""Application configuration."""
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """Application settings."""
    
    app_name: str = "Portfolio API"
    app_version: str = "1.0.0"
    debug: bool = False
    
    # CORS settings
    # For CloudFront/S3, use regex patterns or specific origins
    cors_origins: list[str] = [
        "http://localhost:3000",
        "http://localhost:5173",
        "http://localhost:8080",
    ]
    
    # Regex pattern for CloudFront and S3 origins (used if cors_origin_regex is enabled)
    cors_origin_regex: str = r"https://.*\.cloudfront\.net|https://.*\.s3\..*\.amazonaws\.com"
    
    class Config:
        """Pydantic config."""
        env_file = ".env"
        case_sensitive = False


settings = Settings()

