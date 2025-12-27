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
    
    # Regex pattern for CloudFront, S3, Vercel, Netlify, and other common hosting origins
    cors_origin_regex: str = (
        r"https://.*\.cloudfront\.net|"
        r"https://.*\.s3\..*\.amazonaws\.com|"
        r"https://.*\.vercel\.app|"
        r"https://.*\.netlify\.app|"
        r"https://.*\.pages\.dev"
    )
    
    class Config:
        """Pydantic config."""
        env_file = ".env"
        case_sensitive = False


settings = Settings()

