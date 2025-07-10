
import { useState, useEffect } from 'react';
import { apiService, Post } from '@/lib/api';
import HeroSection from '@/components/HeroSection';
import PostCard from '@/components/PostCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import HireMeSection from '@/components/HireMeSection';
import CategoryPostsSection from '@/components/CategoryPostsSection';

const Index = () => {
  const [heroPosts, setHeroPosts] = useState<Post[]>([]);
  const [featuredPosts, setFeaturedPosts] = useState<Post[]>([]);
  const [latestPosts, setLatestPosts] = useState<Post[]>([]);
  const [categoryPosts, setCategoryPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [heroData, featuredData, latestData, categoryData] = await Promise.all([
          apiService.fetchHeroPosts(),
          apiService.fetchFeaturedPosts(),
          apiService.fetchLatestPosts(),
          apiService.fetchPostsByCategories()
        ]);

        setHeroPosts(heroData);
        setFeaturedPosts(featuredData);
        setLatestPosts(latestData);
        setCategoryPosts(categoryData);
      } catch (err) {
        setError('فشل في تحميل المقالات. يرجى المحاولة مرة أخرى.');
        console.error('Error loading data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Group posts by category
  const groupedPosts = categoryPosts.reduce((acc, post) => {
    const categorySlug = post.category.slug;
    if (!acc[categorySlug]) {
      acc[categorySlug] = {
        category: post.category,
        posts: []
      };
    }
    acc[categorySlug].posts.push(post);
    return acc;
  }, {} as Record<string, { category: any; posts: Post[] }>);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4 font-cairo">عذراً! حدث خطأ</h2>
          <p className="text-muted-foreground mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors font-cairo"
          >
            حاول مرة أخرى
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" dir="rtl">
      {/* Hero Section */}
      <HeroSection posts={heroPosts} loading={loading} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Featured Posts */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 font-cairo">المقالات المميزة</h2>
          {loading ? (
            <LoadingSpinner />
          ) : (
            <div className="space-y-8">
              {featuredPosts.map((post) => (
                <PostCard key={post.id} post={post} featured />
              ))}
            </div>
          )}
        </section>

        {/* Category Posts Sections */}
        {!loading && Object.entries(groupedPosts).map(([categorySlug, { category, posts }]) => (
          <CategoryPostsSection
            key={categorySlug}
            categoryName={category.name}
            categorySlug={categorySlug}
            posts={posts}
          />
        ))}

        {/* Latest Posts */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 font-cairo">أحدث المقالات</h2>
          {loading ? (
            <LoadingSpinner />
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {latestPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </section>

        {/* Hire Me Section */}
        <HireMeSection />
      </div>
    </div>
  );
};

export default Index;
