
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { apiService, Category } from '@/lib/api';

const Header = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await apiService.fetchHeaderCategories();
        setCategories(data);
      } catch (error) {
        console.error('Failed to load header categories:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50 font-cairo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Mobile Menu Button - Right side for RTL */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {/* Logo and Brand */}
          <Link to="/" className="flex items-center space-x-3 space-x-reverse hover:opacity-80 transition-opacity">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl font-amiri">ع</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-primary font-amiri">مدونة علالفي</span>
              <span className="text-sm text-muted-foreground">المعرفة والتقنية</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 space-x-reverse">
            <Link to="/" className="text-foreground hover:text-primary transition-colors font-medium py-2 border-b-2 border-transparent hover:border-primary">
              الرئيسية
            </Link>
            {!loading && categories.map((category) => (
              <Link
                key={category.id}
                to={`/category/${category.slug}`}
                className="text-foreground hover:text-primary transition-colors font-medium py-2 border-b-2 border-transparent hover:border-primary"
              >
                {category.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t bg-white absolute left-0 right-0 shadow-lg">
            <nav className="px-4 py-4 space-y-3">
              <Link
                to="/"
                className="block text-foreground hover:text-primary transition-colors font-medium py-2 border-r-4 border-transparent hover:border-primary pr-4"
                onClick={() => setIsMenuOpen(false)}
              >
                الرئيسية
              </Link>
              {!loading && categories.map((category) => (
                <Link
                  key={category.id}
                  to={`/category/${category.slug}`}
                  className="block text-foreground hover:text-primary transition-colors font-medium py-2 border-r-4 border-transparent hover:border-primary pr-4"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {category.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
