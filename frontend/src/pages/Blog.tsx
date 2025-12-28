import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { BlogCard } from '@/components/BlogCard';
import { getBlogs } from '@/lib/api';

const posts = getBlogs();

const Blog = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-32 pb-20">
        <div className="section-container">
          <div className="text-center mb-16">
            <h1 className="heading-lg mb-4">Blog</h1>
            <p className="body-lg max-w-2xl mx-auto">Thoughts on cloud architecture, DevOps, and software engineering.</p>
          </div>
          {posts.length === 0 ? (
            <p className="text-center text-muted-foreground py-20">No blog posts yet. Check back soon!</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post, i) => (
                <BlogCard key={post.id} post={post} index={i} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
