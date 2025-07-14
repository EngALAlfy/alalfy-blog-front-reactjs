
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown, Sun, Moon } from 'lucide-react';
import { apiService, Category } from '@/lib/api';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isDark, setIsDark] = useState(false);

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

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm border-b sticky top-0 z-50 font-cairo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Mobile Menu Button - Right side for RTL */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {/* Logo and Brand */}
          <Link to="/" className="flex items-center space-x-3 space-x-reverse hover:opacity-80 transition-opacity">
            <img 
              src="/logo.png" 
              alt="ALALFY DEV Logo" 
              className="w-10 h-10 md:w-12 md:h-12 object-contain"
            />
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-bold text-primary font-amiri">ALALFY DEV.</span>
              <span className="text-xs md:text-sm text-muted-foreground hidden sm:block">المعرفة والتقنية</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6 lg:space-x-8 space-x-reverse items-center">
            <Link 
              to="/" 
              className="text-foreground hover:text-primary transition-colors font-medium py-2 border-b-2 border-transparent hover:border-primary px-2"
            >
              الرئيسية
            </Link>

            {/* Categories Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center text-foreground hover:text-primary transition-colors font-medium py-2 border-b-2 border-transparent hover:border-primary px-2 space-x-1 space-x-reverse">
                <span>الأقسام</span>
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-white dark:bg-gray-800 border shadow-lg">
                {!loading && categories.map((category) => (
                  <DropdownMenuItem key={category.id} asChild>
                    <Link
                      to={`/category/${category.slug}`}
                      className="w-full text-right px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      {category.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link 
              to="/about" 
              className="text-foreground hover:text-primary transition-colors font-medium py-2 border-b-2 border-transparent hover:border-primary px-2"
            >
              من أنا
            </Link>
            
            <Link 
              to="/contact" 
              className="text-foreground hover:text-primary transition-colors font-medium py-2 border-b-2 border-transparent hover:border-primary px-2"
            >
              تواصل معي
            </Link>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="تبديل الوضع المظلم"
            >
              {isDark ? (
                <Sun className="h-5 w-5 text-yellow-500" />
              ) : (
                <Moon className="h-5 w-5 text-gray-600" />
              )}
            </button>
          </nav>

          {/* Mobile Theme Toggle */}
          <div className="md:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="تبديل الوضع المظلم"
            >
              {isDark ? (
                <Sun className="h-5 w-5 text-yellow-500" />
              ) : (
                <Moon className="h-5 w-5 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t bg-white dark:bg-gray-900 absolute left-0 right-0 shadow-lg">
            <nav className="px-4 py-4 space-y-2">
              <Link
                to="/"
                className="block text-foreground hover:text-primary hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium py-3 px-4 rounded-lg border-r-4 border-transparent hover:border-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                الرئيسية
              </Link>

              {/* Mobile Categories */}
              <div className="border-r-4 border-transparent">
                <div className="text-foreground font-medium py-3 px-4 text-sm text-muted-foreground">
                  الأقسام:
                </div>
                {!loading && categories.map((category) => (
                  <Link
                    key={category.id}
                    to={`/category/${category.slug}`}
                    className="block text-foreground hover:text-primary hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium py-2 px-8 rounded-lg mr-4"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {category.name}
                  </Link>
                ))}
              </div>

              <Link
                to="/about"
                className="block text-foreground hover:text-primary hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium py-3 px-4 rounded-lg border-r-4 border-transparent hover:border-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                من أنا
              </Link>

              <Link
                to="/contact"
                className="block text-foreground hover:text-primary hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium py-3 px-4 rounded-lg border-r-4 border-transparent hover:border-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                تواصل معي
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
