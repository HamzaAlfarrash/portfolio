"""Blog service for reading and parsing blog posts."""
import frontmatter
from pathlib import Path
from typing import List
from datetime import datetime, date

from fastapi import HTTPException

from app.models.blog import BlogPost, BlogPostMetadata


class BlogService:
    """Service for blog operations."""
    
    def __init__(self, blogs_dir: str = "blogs"):
        """Initialize the blog service.
        
        Args:
            blogs_dir: Path to the blogs directory relative to project root
        """
        self.blogs_dir = blogs_dir
        self._posts_cache: List[BlogPost] | None = None
    
    def _get_blogs_path(self) -> Path:
        """Get the absolute path to the blogs directory.
        
        Works in both local development and AWS Lambda environments.
        """
        current_file = Path(__file__)
        
        # Get project root (backend directory)
        # From app/services/blog_service.py, go up 3 levels to backend/
        project_root = current_file.parent.parent.parent
        blogs_path = project_root / self.blogs_dir
        
        # In Lambda, /var/task is the working directory
        # With CodeUri: ".", the structure is /var/task/blogs/
        if not blogs_path.exists():
            lambda_root = Path("/var/task")
            if lambda_root.exists():
                blogs_path = lambda_root / self.blogs_dir
        
        return blogs_path
    
    def _get_slug_from_filename(self, filename: str) -> str:
        """Extract slug from markdown filename.
        
        Args:
            filename: Markdown filename (e.g., "2025-01-first-blog.md")
            
        Returns:
            Slug (e.g., "2025-01-first-blog")
        """
        return filename.replace(".md", "")
    
    def _parse_markdown_file(self, file_path: Path) -> BlogPost:
        """Parse a markdown file with frontmatter.
        
        Args:
            file_path: Path to the markdown file
            
        Returns:
            BlogPost model
            
        Raises:
            HTTPException: If file cannot be read or parsed
        """
        try:
            with open(file_path, "r", encoding="utf-8") as f:
                post = frontmatter.load(f)
            
            # Extract metadata from frontmatter
            metadata = post.metadata
            
            # Get slug from filename
            slug = self._get_slug_from_filename(file_path.name)
            
            # Parse date string to date object
            date_str = metadata.get("date")
            if isinstance(date_str, str):
                try:
                    post_date = datetime.strptime(date_str, "%Y-%m-%d").date()
                except ValueError:
                    raise HTTPException(
                        status_code=500,
                        detail=f"Invalid date format in {file_path.name}. Expected YYYY-MM-DD."
                    )
            elif isinstance(date_str, date):
                post_date = date_str
            else:
                raise HTTPException(
                    status_code=500,
                    detail=f"Missing or invalid date in {file_path.name}"
                )
            
            # Get tags, default to empty list
            tags = metadata.get("tags", [])
            if not isinstance(tags, list):
                tags = []
            
            # Create BlogPost model
            blog_post = BlogPost(
                slug=slug,
                title=metadata.get("title", "Untitled"),
                date=post_date,
                summary=metadata.get("summary", ""),
                tags=tags,
                content=post.content
            )
            
            return blog_post
            
        except frontmatter.FrontmatterError as e:
            raise HTTPException(
                status_code=500,
                detail=f"Error parsing frontmatter in {file_path.name}: {str(e)}"
            )
        except Exception as e:
            raise HTTPException(
                status_code=500,
                detail=f"Error reading blog file {file_path.name}: {str(e)}"
            )
    
    def _load_all_posts(self) -> List[BlogPost]:
        """Load all blog posts from the blogs directory.
        
        Returns:
            List of BlogPost models, sorted by date (newest first)
        """
        blogs_path = self._get_blogs_path()
        
        if not blogs_path.exists():
            return []
        
        posts = []
        
        # Find all markdown files
        for file_path in blogs_path.glob("*.md"):
            # Skip README.md
            if file_path.name.lower() == "readme.md":
                continue
            
            try:
                post = self._parse_markdown_file(file_path)
                posts.append(post)
            except HTTPException:
                # Skip files that can't be parsed
                continue
        
        # Sort by date, newest first
        posts.sort(key=lambda x: x.date, reverse=True)
        
        return posts
    
    def get_all_posts(self, include_content: bool = False) -> List[BlogPostMetadata] | List[BlogPost]:
        """Get all blog posts.
        
        Args:
            include_content: Whether to include full content in response
            
        Returns:
            List of blog posts (metadata or full posts)
        """
        if self._posts_cache is None:
            self._posts_cache = self._load_all_posts()
        
        if include_content:
            return self._posts_cache
        else:
            # Return metadata only
            return [BlogPostMetadata(**post.model_dump(exclude={"content"})) for post in self._posts_cache]
    
    def get_post_by_slug(self, slug: str) -> BlogPost:
        """Get a blog post by slug.
        
        Args:
            slug: The blog post slug
            
        Returns:
            BlogPost model
            
        Raises:
            HTTPException: If post not found
        """
        blogs_path = self._get_blogs_path()
        
        if not blogs_path.exists():
            raise HTTPException(
                status_code=404,
                detail=f"Blog post '{slug}' not found"
            )
        
        # Try to find the file
        file_path = blogs_path / f"{slug}.md"
        
        if not file_path.exists():
            raise HTTPException(
                status_code=404,
                detail=f"Blog post '{slug}' not found"
            )
        
        return self._parse_markdown_file(file_path)

