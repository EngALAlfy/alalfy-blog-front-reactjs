
import { Link } from 'react-router-dom';
import { User, Calendar } from 'lucide-react';
import { Post } from '@/lib/api';

interface PostCardProps {
  post: Post;
  featured?: boolean;
}

const PostCard = ({ post, featured = false }: PostCardProps) => {
  return (
    <article className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 ${featured ? 'lg:flex' : ''}`}>
      <div className={`${featured ? 'lg:w-1/2' : ''}`}>
        <img
          src={post.banner}
          alt={post.title}
          className={`w-full object-cover ${featured ? 'h-64 lg:h-full' : 'h-48'}`}
        />
      </div>
      
      <div className={`p-6 ${featured ? 'lg:w-1/2 lg:flex lg:flex-col lg:justify-center' : ''}`}>
        <div className="flex items-center space-x-3 mb-3">
          <Link
            to={`/category/${post.category.slug}`}
            className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded-full hover:bg-blue-200 transition-colors"
          >
            {post.category.name}
          </Link>
        </div>
        
        <h3 className={`font-bold text-gray-900 mb-3 ${featured ? 'text-2xl' : 'text-lg'} hover:text-blue-600 transition-colors`}>
          <Link to={`/post/${post.slug}`}>
            {post.title}
          </Link>
        </h3>
        
        <p className="text-gray-600 mb-4 leading-relaxed">
          {post.short_description}
        </p>
        
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <div className="flex items-center space-x-2">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="font-medium">{post.author.name}</span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default PostCard;
