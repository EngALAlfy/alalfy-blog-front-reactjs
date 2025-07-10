
import { Link } from 'react-router-dom';
import { Post } from '@/lib/api';
import PostCard from './PostCard';

interface CategoryPostsSectionProps {
  categoryName: string;
  categorySlug: string;
  posts: Post[];
}

const CategoryPostsSection = ({ categoryName, categorySlug, posts }: CategoryPostsSectionProps) => {
  if (posts.length === 0) return null;

  return (
    <section className="mb-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-foreground font-cairo">{categoryName}</h2>
        <Link
          to={`/category/${categorySlug}`}
          className="text-primary hover:text-primary/80 font-medium font-cairo transition-colors"
        >
          عرض المزيد ←
        </Link>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
};

export default CategoryPostsSection;
