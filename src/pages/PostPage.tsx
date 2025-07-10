
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import { apiService, Post } from '@/lib/api';
import LoadingSpinner from '@/components/LoadingSpinner';

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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Post Not Found</h2>
          <p className="text-gray-600 mb-6">The post you're looking for doesn't exist.</p>
          <Link
            to="/"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <Link
        to="/"
        className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-800 mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Home</span>
      </Link>

      {/* Post Header */}
      <header className="mb-8">
        <div className="flex items-center space-x-4 mb-4">
          <Link
            to={`/category/${post.category.slug}`}
            className="text-sm font-semibold text-blue-600 bg-blue-100 px-3 py-1 rounded-full hover:bg-blue-200 transition-colors"
          >
            {post.category.name}
          </Link>
        </div>
        
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
          {post.title}
        </h1>
        
        <div className="flex items-center space-x-6 text-gray-600 mb-8">
          <div className="flex items-center space-x-3">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <p className="font-semibold text-gray-900">{post.author.name}</p>
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
      <div className="prose prose-lg max-w-none">
        <div className="text-xl text-gray-600 mb-8 leading-relaxed">
          {post.short_description}
        </div>
        
        <div
          className="text-gray-800 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: post.description }}
        />
      </div>

      {/* Author Info */}
      <div className="mt-12 p-6 bg-gray-50 rounded-lg">
        <div className="flex items-center space-x-4">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <h3 className="text-xl font-semibold text-gray-900">{post.author.name}</h3>
            <p className="text-gray-600">{post.author.email}</p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default PostPage;
