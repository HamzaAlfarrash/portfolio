import { useParams, Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { getBlogBySlug } from '@/lib/api';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';

const BlogDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogBySlug(slug) : null;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-32 pb-20">
        <div className="section-container max-w-3xl">
          <Link to="/blog" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>
          {!post ? (
            <p className="text-center text-muted-foreground py-20">Blog post not found.</p>
          ) : (
            <article>
              <h1 className="heading-lg mb-4">{post.title}</h1>
              <div className="flex items-center gap-4 text-muted-foreground mb-8">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(post.date).toLocaleDateString()}
                </span>
                {post.readTime && (
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {post.readTime}
                  </span>
                )}
              </div>
              <div className="prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
            </article>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogDetailPage;
