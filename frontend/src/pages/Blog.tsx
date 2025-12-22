import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { BlogCard } from '@/components/BlogCard';
import { fetchBlogs, type BlogPost } from '@/lib/api';
import { Loader2 } from 'lucide-react';

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs().then((data) => {
      setPosts(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-32 pb-20">
        <div className="section-container">
          <div className="text-center mb-16">
            <h1 className="heading-lg mb-4">Blog</h1>
            <p className="body-lg max-w-2xl mx-auto">Thoughts on cloud architecture, DevOps, and software engineering.</p>
          </div>
          {loading ? (
            <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 text-primary animate-spin" /></div>
          ) : posts.length === 0 ? (
            <p className="text-center text-muted-foreground py-20">No blog posts found. Make sure the API is running.</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">{posts.map((post, i) => <BlogCard key={post.id} post={post} index={i} />)}</div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
