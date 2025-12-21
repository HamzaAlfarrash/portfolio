"""Blogs API router."""
from fastapi import APIRouter, HTTPException
from typing import List

from app.models.blog import BlogPost, BlogPostMetadata
from app.services.blog_service import BlogService

router = APIRouter()
blog_service = BlogService()


@router.get("", response_model=List[BlogPostMetadata])
async def get_blogs():
    """Get all blog posts (metadata only, no content).
    
    Returns:
        List of blog post metadata, sorted by date (newest first)
    """
    return blog_service.get_all_posts(include_content=False)


@router.get("/{slug}", response_model=BlogPost)
async def get_blog(slug: str):
    """Get a specific blog post by slug.
    
    Args:
        slug: Blog post slug/identifier
        
    Returns:
        Full blog post with content
        
    Raises:
        HTTPException: If blog post not found
    """
    try:
        return blog_service.get_post_by_slug(slug)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error retrieving blog post: {str(e)}"
        )

