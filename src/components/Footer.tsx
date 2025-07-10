
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiService, Category } from '@/lib/api';

const Footer = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await apiService.fetchFooterCategories();
        setCategories(data);
      } catch (error) {
        console.error('Failed to load footer categories:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  return (
    <footer className="bg-gray-900 text-white font-cairo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 space-x-reverse mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-primary-foreground font-bold text-xl font-amiri">ع</span>
              </div>
              <h3 className="text-xl lg:text-2xl font-bold font-amiri">ALALFY DEV.</h3>
            </div>
            <p className="text-gray-300 mb-4 leading-relaxed">
              اكتشف أحدث المقالات والرؤى والقصص من مجتمعنا من الكتاب وقادة الفكر في عالم التقنية والبرمجة.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 font-cairo">الأقسام</h4>
            {loading ? (
              <div className="space-y-2">
                <div className="h-4 bg-gray-700 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-700 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-700 rounded animate-pulse"></div>
              </div>
            ) : (
              <div className="space-y-2">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    to={`/category/${category.slug}`}
                    className="block text-gray-300 hover:text-white transition-colors py-1"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 font-cairo">روابط سريعة</h4>
            <div className="space-y-2">
              <Link to="/" className="block text-gray-300 hover:text-white transition-colors py-1">
                الرئيسية
              </Link>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors py-1">
                من نحن
              </a>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors py-1">
                اتصل بنا
              </a>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors py-1">
                سياسة الخصوصية
              </a>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors py-1">
                شروط الاستخدام
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            © {new Date().getFullYear()} ALALFY DEV. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
