// API types and static data exports
import { projects, blogPosts } from '@/data/staticData';

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
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime?: string;
  tags?: string[];
}

export interface BlogDetail extends BlogPost {
  content: string;
}

export function getProjects(): Project[] {
  return projects;
}

export function getBlogs(): BlogPost[] {
  return blogPosts.map(({ content, ...post }) => post);
}

export function getBlogBySlug(slug: string): BlogDetail | null {
  return blogPosts.find((post) => post.slug === slug) ?? null;
}
