
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowRight, Calendar, User } from 'lucide-react';
import { apiService, Post } from '@/lib/api';
import LoadingSpinner from '@/components/LoadingSpinner';
import HTMLRenderer from '@/components/HTMLRenderer';

const PostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPost = async () => {
      if (!slug) return;
      
      try {
        setLoading(true);
        // Since we don't have a specific API endpoint for single posts,
        // we'll fetch from multiple sources and find the matching post
        const [heroData, featuredData, latestData] = await Promise.all([
          apiService.fetchHeroPosts(),
          apiService.fetchFeaturedPosts(),
          apiService.fetchLatestPosts()
        ]);

        const allPosts = [...heroData, ...featuredData, ...latestData];
        const foundPost = allPosts.find(p => p.slug === slug);
        
        if (foundPost) {
          setPost(foundPost);
        } else {
          setError('Post not found');
        }
      } catch (err) {
        setError('Failed to load post');
        console.error('Error loading post:', err);
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [slug]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4 font-cairo">المقال غير موجود</h2>
          <p className="text-muted-foreground mb-6">المقال الذي تبحث عنه غير متوفر.</p>
          <Link
            to="/"
            className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors font-cairo"
          >
            العودة للرئيسية
          </Link>
        </div>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-cairo" dir="rtl">
      {/* Back Button */}
      <Link
        to="/"
        className="inline-flex items-center space-x-2 space-x-reverse text-primary hover:text-primary/80 mb-8 font-medium"
      >
        <ArrowRight className="h-4 w-4" />
        <span>العودة للرئيسية</span>
      </Link>

      {/* Post Header */}
      <header className="mb-8">
        <div className="flex items-center space-x-4 space-x-reverse mb-4">
          <Link
            to={`/category/${post.category.slug}`}
            className="text-sm font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full hover:bg-primary/20 transition-colors"
          >
            {post.category.name}
          </Link>
        </div>
        
        <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight font-amiri">
          {post.title}
        </h1>
        
        <div className="flex items-center space-x-6 space-x-reverse text-muted-foreground mb-8">
          <div className="flex items-center space-x-3 space-x-reverse">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <p className="font-semibold text-foreground">{post.author.name}</p>
              <p className="text-sm">{post.author.email}</p>
            </div>
          </div>
        </div>
        
        <img
          src={post.banner}
          alt={post.title}
          className="w-full h-64 lg:h-96 object-cover rounded-lg shadow-lg mb-8"
        />
      </header>

      {/* Post Content */}
      <div className="mb-8">
        <div className="text-xl text-muted-foreground mb-8 leading-relaxed font-amiri">
          {post.short_description}
        </div>
        
        <HTMLRenderer 
          content={post.description}
          className="text-foreground leading-relaxed font-amiri"
        />
      </div>

      {/* Author Info */}
      <div className="mt-12 p-6 bg-muted rounded-lg">
        <div className="flex items-center space-x-4 space-x-reverse">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <h3 className="text-xl font-semibold text-foreground font-cairo">{post.author.name}</h3>
            <p className="text-muted-foreground">{post.author.email}</p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default PostPage;
