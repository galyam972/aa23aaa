import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Mail, Palette, Download, Zap, Shield, Clock, Users, Star, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PurchaseModal from '@/components/PurchaseModal';
const features = [
  {
    icon: Palette,
    title: 'עיצוב מותאם אישית',
    description: 'בחר צבעים, גופנים ותבניות שמתאימים למותג שלך',
  },
  {
    icon: Zap,
    title: 'יצירה מהירה',
    description: 'צור חתימה מקצועית תוך דקות ספורות',
  },
  {
    icon: Download,
    title: 'ייצוא קל',
    description: 'העתק או הורד את החתימה ישירות לאפליקציית המייל',
  },
  {
    icon: Shield,
    title: 'תאימות מלאה',
    description: 'החתימות תואמות לכל תוכנות המייל המובילות',
  },
  {
    icon: Users,
    title: 'מתאים לעסקים',
    description: 'צור חתימות אחידות לכל הצוות בקלות',
  },
  {
    icon: Clock,
    title: 'גישה ל-3 חודשים',
    description: 'עריכה והורדה ללא הגבלה במשך 3 חודשים',
  },
];

const pricingPlans = [
  {
    id: 1,
    name: 'בסיסי',
    signatures: 1,
    price: 39,
    description: 'מושלם לשימוש אישי',
    popular: false,
  },
  {
    id: 2,
    name: 'זוגי',
    signatures: 2,
    price: 69,
    description: 'חסכון של 9 ש"ח',
    popular: false,
  },
  {
    id: 3,
    name: 'עסקי',
    signatures: 3,
    price: 99,
    description: 'הכי משתלם + אפשרות להרחבה',
    popular: true,
    extras: true,
  },
];

const testimonials = [
  {
    name: 'יוסי כהן',
    role: 'מנכ"ל, סטארטאפ טק',
    content: 'החתימה החדשה שלי נראית מקצועית ברמה אחרת. קיבלתי המון מחמאות מלקוחות!',
    avatar: '👨‍💼',
  },
  {
    name: 'מיכל לוי',
    role: 'עורכת דין',
    content: 'פשוט להפליא. תוך 5 דקות יצרתי חתימה שנראית כאילו מעצב מקצועי עשה אותה.',
    avatar: '👩‍⚖️',
  },
  {
    name: 'דני אברהם',
    role: 'יועץ עסקי',
    content: 'יצרתי חתימות לכל הצוות שלי. זה חסך לנו המון זמן וכסף.',
    avatar: '👨‍💻',
  },
];

const Landing = () => {
  const [purchaseModalOpen, setPurchaseModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(1);

  const handlePlanSelect = (planId: number) => {
    setSelectedPlan(planId);
    setPurchaseModalOpen(true);
  };

  return (
    <div className="min-h-screen" dir="rtl">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">SignaturePro</h1>
                <p className="text-xs text-muted-foreground">by GalyamStudio</p>
              </div>
            </div>
            <Link to="/editor">
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                נסה עכשיו
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="gradient-hero py-20 lg:py-32">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
            ✨ מחולל חתימות מייל מקצועי
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            צור חתימת מייל מרשימה
            <br />
            <span className="text-white">תוך דקות ספורות</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            עיצוב מקצועי, תבניות מגוונות, וייצוא קל לכל תוכנות המייל.
            <br />
            ללא מנוי - תשלום חד פעמי בלבד!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/editor">
              <Button size="lg" className="btn-primary text-lg px-8 py-6 gap-2">
                <Zap className="w-5 h-5" />
                התחל ליצור עכשיו
              </Button>
            </Link>
            <a href="#pricing">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                צפה במחירים
              </Button>
            </a>
          </div>
          
          {/* Trust badges */}
          <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-primary" />
              <span>ללא מנוי מתחדש</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-primary" />
              <span>גישה מיידית לאחר תשלום</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-primary" />
              <span>תמיכה בעברית מלאה</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              למה לבחור בנו?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              כל מה שצריך ליצירת חתימת מייל מקצועית במקום אחד
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="card-glass border-0 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              תמחור פשוט ושקוף
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              תשלום חד פעמי - ללא מנוי, ללא הפתעות
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {pricingPlans.map((plan) => (
              <Card 
                key={plan.id} 
                className={`relative overflow-hidden transition-all hover:shadow-xl ${
                  plan.popular 
                    ? 'border-primary shadow-lg scale-105 z-10' 
                    : 'border-border'
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-primary text-primary-foreground text-center py-1 text-sm font-medium">
                    ⭐ הכי פופולרי
                  </div>
                )}
                <CardHeader className={plan.popular ? 'pt-10' : ''}>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-foreground">₪{plan.price}</span>
                    <span className="text-muted-foreground">/ חד פעמי</span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-primary" />
                      <span>{plan.signatures} {plan.signatures === 1 ? 'חתימה' : 'חתימות'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-primary" />
                      <span>כל התבניות</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-primary" />
                      <span>עיצוב מותאם אישית</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-primary" />
                      <span>ייצוא ללא הגבלה</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-primary" />
                      <span>גישה ל-3 חודשים</span>
                    </div>
                    {plan.extras && (
                      <div className="flex items-center gap-2 text-primary font-medium">
                        <Check className="w-5 h-5" />
                        <span>הרחבה ב-₪19 לחתימה</span>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className={`w-full ${plan.popular ? 'btn-primary' : ''}`}
                    variant={plan.popular ? 'default' : 'outline'}
                    onClick={() => handlePlanSelect(plan.id)}
                  >
                    בחר מסלול
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Extra signatures info */}
          <div className="mt-8 text-center">
            <Card className="inline-block bg-secondary/50 border-dashed max-w-md">
              <CardContent className="py-4">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">צריך יותר חתימות?</strong>
                  <br />
                  רכשת 3 חתימות? הוסף חתימות נוספות ב-₪19 לכל אחת ללא הגבלה
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              מה הלקוחות שלנו אומרים
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="card-glass border-0">
                <CardContent className="pt-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-foreground mb-4">"{testimonial.content}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-xl">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            מוכנים ליצור חתימה מרשימה?
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
            הצטרפו לאלפי משתמשים שכבר משתמשים בחתימות המקצועיות שלנו
          </p>
          <Link to="/editor">
            <Button size="lg" className="btn-primary text-lg px-8 py-6 gap-2">
              <Zap className="w-5 h-5" />
              התחל ליצור עכשיו - חינם לנסות!
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-primary" />
              <span className="font-semibold">SignaturePro</span>
              <span className="text-muted-foreground">by GalyamStudio</span>
            </div>
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} כל הזכויות שמורות
            </div>
          </div>
        </div>
      </footer>

      {/* Purchase Modal */}
      <PurchaseModal
        isOpen={purchaseModalOpen}
        onClose={() => setPurchaseModalOpen(false)}
        initialPlan={selectedPlan}
      />
    </div>
  );
};

export default Landing;
