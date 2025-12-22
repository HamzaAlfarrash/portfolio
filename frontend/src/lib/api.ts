// API service for fetching data from backend
const API_BASE_URL = 'http://127.0.0.1:8000';

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  image?: string;
  link?: string;
  github?: string;
}

export interface BlogPost {
  id: string;        // internal id for React keys (we'll use slug)
  slug: string;      // URL slug
  title: string;
  excerpt: string;   // short summary shown in list
  date: string;
  readTime?: string;
  tags?: string[];
}

export interface BlogDetail extends BlogPost {
  content: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function fetchProjects(): Promise<Project[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/projects`);
    if (!response.ok) {
      throw new Error('Failed to fetch projects');
    }
    const data = await response.json();

    // Map backend fields (tech_stack, github_url, live_url) to frontend Project shape
    return data.map((project: any): Project => ({
      id: project.id,
      title: project.title,
      description: project.description,
      technologies: project.tech_stack ?? [],
      image: project.image,
      link: project.live_url ?? project.link,
      github: project.github_url ?? project.github,
    }));
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

export async function fetchBlogs(): Promise<BlogPost[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/blogs`);
    if (!response.ok) {
      throw new Error('Failed to fetch blogs');
    }
    const data = await response.json();

    // Map backend blog metadata (slug, title, summary, date, tags) to frontend BlogPost shape
    return data.map((post: any): BlogPost => {
      const baseText: string = post.summary ?? '';
      const words = baseText.split(/\s+/).filter(Boolean);
      const excerpt =
        words.length > 0 ? `${words.slice(0, 30).join(' ')}${words.length > 30 ? '…' : ''}` : '';
      const readTime =
        words.length > 0 ? `${Math.max(1, Math.round(words.length / 200))} min read` : undefined;

      return {
        id: post.slug, // use slug as stable id for React keys
        slug: post.slug,
        title: post.title,
        excerpt: excerpt || post.summary || '',
        date: post.date,
        readTime,
        tags: post.tags ?? [],
      };
    });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return [];
  }
}

export async function fetchBlogBySlug(slug: string): Promise<BlogDetail | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/blogs/${slug}`);
    if (!response.ok) {
      throw new Error('Failed to fetch blog');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching blog:', error);
    return null;
  }
}

export async function submitContactForm(data: ContactFormData): Promise<{ success: boolean; message: string }> {
  try {
    const response = await fetch(`${API_BASE_URL}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error('Failed to submit form');
    }
    
    return { success: true, message: 'Message sent successfully!' };
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return { success: false, message: 'Failed to send message. Please try again.' };
  }
}
