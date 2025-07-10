
import { Link } from 'react-router-dom';
import { Calendar, User } from 'lucide-react';
import { Post } from '@/lib/api';

interface HeroSectionProps {
  posts: Post[];
  loading: boolean;
}

const HeroSection = ({ posts, loading }: HeroSectionProps) => {
  if (loading) {
    return (
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="animate-pulse">
            <div className="h-12 bg-white/20 rounded mb-4"></div>
            <div className="h-6 bg-white/20 rounded mb-8"></div>
            <div className="h-10 bg-white/20 rounded w-40"></div>
          </div>
        </div>
      </section>
    );
  }

  const heroPost = posts[0];
  if (!heroPost) return null;

  return (
    <section className="relative bg-gradient-to-r from-blue-600 to-purple-700 text-white overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="flex items-center space-x-4 text-sm opacity-90">
              <Link
                to={`/category/${heroPost.category.slug}`}
                className="bg-white/20 px-3 py-1 rounded-full hover:bg-white/30 transition-colors"
              >
                {heroPost.category.name}
              </Link>
              <div className="flex items-center space-x-1">
                <User className="h-4 w-4" />
                <span>{heroPost.author.name}</span>
              </div>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
              {heroPost.title}
            </h1>
            
            <p className="text-lg lg:text-xl opacity-90 leading-relaxed">
              {heroPost.short_description}
            </p>
            
            <Link
              to={`/post/${heroPost.slug}`}
              className="inline-block bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Read Article
            </Link>
          </div>
          
          <div className="relative">
            <img
              src={heroPost.banner}
              alt={heroPost.title}
              className="w-full h-80 lg:h-96 object-cover rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
