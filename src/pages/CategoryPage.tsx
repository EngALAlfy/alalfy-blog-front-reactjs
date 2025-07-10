
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { apiService, Post, Category } from '@/lib/api';
import PostCard from '@/components/PostCard';
import LoadingSpinner from '@/components/LoadingSpinner';

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [posts, setPosts] = useState<Post[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCategoryData = async () => {
      if (!slug) return;

      try {
        setLoading(true);
        const [allCategories, categoryPosts] = await Promise.all([
          apiService.fetchAllCategories(),
          apiService.fetchPostsByCategory(slug)
        ]);

        const foundCategory = allCategories.find(c => c.slug === slug);
        
        if (foundCategory) {
          setCategory(foundCategory);
          setPosts(categoryPosts);
        } else {
          setError('Category not found');
        }
      } catch (err) {
        setError('Failed to load category data');
        console.error('Error loading category:', err);
      } finally {
        setLoading(false);
      }
    };

    loadCategoryData();
  }, [slug]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error || !category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Category Not Found</h2>
          <p className="text-gray-600 mb-6">The category you're looking for doesn't exist.</p>
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <Link
        to="/"
        className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-800 mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Home</span>
      </Link>

      {/* Category Header */}
      <header className="mb-12">
        {category.banner && (
          <img
            src={category.banner}
            alt={category.name}
            className="w-full h-64 object-cover rounded-lg shadow-lg mb-8"
          />
        )}
        
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
          {category.name}
        </h1>
        
        <p className="text-xl text-gray-600 mb-6 leading-relaxed">
          {category.short_description}
        </p>
        
        {category.description && (
          <div
            className="text-gray-800 prose max-w-none"
            dangerouslySetInnerHTML={{ __html: category.description }}
          />
        )}
      </header>

      {/* Posts Grid */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          Articles in {category.name} ({posts.length})
        </h2>
        
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No articles found in this category yet.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default CategoryPage;
