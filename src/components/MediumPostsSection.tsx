import { ExternalLink, Calendar } from 'lucide-react';
import { MediumPost } from '@/lib/api';

interface MediumPostsSectionProps {
  posts: MediumPost[];
  loading: boolean;
}

const MediumPostsSection = ({ posts, loading }: MediumPostsSectionProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <section className="py-16 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4 font-cairo">قصصي على Medium</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              اكتشف أحدث المقالات والقصص التقنية على منصة Medium
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-card rounded-lg border p-6 animate-pulse">
                <div className="h-4 bg-muted rounded mb-3"></div>
                <div className="h-3 bg-muted rounded mb-2"></div>
                <div className="h-3 bg-muted rounded w-2/3 mb-4"></div>
                <div className="h-3 bg-muted rounded w-1/3"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4 font-cairo">قصصي على Medium</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            اكتشف أحدث المقالات والقصص التقنية على منصة Medium
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">لم يتم العثور على مقالات في الوقت الحالي</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, index) => (
              <article
                key={index}
                className="bg-card rounded-lg border hover:shadow-lg transition-all duration-300 overflow-hidden group"
              >
                {post.thumbnail && (
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={post.thumbnail}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                
                <div className="p-6">
                  <h3 className="font-bold text-lg mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                    {post.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(post.pubDate)}</span>
                    </div>
                    
                    <a
                      href={post.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-primary hover:text-primary/80 text-sm font-medium transition-colors"
                    >
                      اقرأ المزيد
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <a
            href="https://medium.com/@alalfy"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium"
          >
            عرض جميع المقالات على Medium
            <ExternalLink className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default MediumPostsSection;