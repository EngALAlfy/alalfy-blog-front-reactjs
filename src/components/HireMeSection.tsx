
import { CheckCircle, Code, MessageCircle } from 'lucide-react';

const HireMeSection = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-primary/5 to-secondary/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-6">
            <div className="inline-block">
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium font-cairo">
                تحتاج مطور؟
              </span>
            </div>
            
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground font-cairo leading-tight">
              تطبيقات مخصصة، مواقع ويب وأنظمة — مصممة لعملك
            </h2>
            
            <p className="text-muted-foreground text-lg leading-relaxed">
              أنا إسلام الألفي — مطور متكامل متخصص في Flutter و Laravel والحلول التقنية القابلة للتطوير.
              سواء كنت تطلق شركة ناشئة، أو تحسن حضورك الرقمي، أو تتطلع لأتمتة العمليات، يمكنني مساعدتك في تحويل رؤيتك إلى منتج موثوق وعالي الأداء.
            </p>

            {/* Features */}
            <div className="grid gap-3">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                <span className="text-foreground font-medium">تطبيقات الجوال متعددة المنصات</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                <span className="text-foreground font-medium">لوحات تحكم ويب مخصصة</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                <span className="text-foreground font-medium">متاجر إلكترونية ولوحات إدارية</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href="https://api.whatsapp.com/send?phone=201153263994"
                className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors font-cairo inline-flex items-center gap-2"
              >
                <MessageCircle className="h-5 w-5" />
                تواصل معي
              </a>
              <a
                href="https://alalfy.com"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-primary text-primary px-6 py-3 rounded-lg font-semibold hover:bg-primary/10 transition-colors font-cairo"
              >
                اطلع على أعمالي
              </a>
            </div>
          </div>

          {/* Image & Stats */}
          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl flex items-center justify-center relative overflow-hidden">
              <img 
                src="/call-to-action.jpg" 
                alt="استئجار مطور"
                className="w-full h-full object-cover rounded-2xl"
              />
              
              {/* Floating Stats Card */}
              <div className="absolute bottom-4 right-4 bg-card backdrop-blur-sm p-4 rounded-xl shadow-lg border border-border">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Code className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-card-foreground font-cairo">50+</div>
                    <div className="text-sm text-muted-foreground font-cairo">مشروع منجز</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-primary/20 rounded-full"></div>
            <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-secondary/30 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full -translate-x-32 -translate-y-32"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-secondary/10 rounded-full translate-x-24 translate-y-24"></div>
    </section>
  );
};

export default HireMeSection;
