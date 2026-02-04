import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Layout } from '@/components/layout';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';

interface ContentPageProps {
  title: string;
  description: string;
  keywords?: string;
  children: ReactNode;
  showCTA?: boolean;
}

const ContentPage = ({ 
  title, 
  description, 
  keywords,
  children,
  showCTA = true
}: ContentPageProps) => {
  return (
    <Layout>
      <SEO title={title} description={description} keywords={keywords} />
      
      <article className="py-12 lg:py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Breadcrumb */}
          <nav className="mb-8 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">
              דף הבית
            </Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{title}</span>
          </nav>

          {/* Title */}
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {title}
            </h1>
            <p className="text-lg text-muted-foreground">
              {description}
            </p>
          </header>

          {/* Content */}
          <div className="prose prose-lg max-w-none text-foreground">
            {children}
          </div>

          {/* CTA */}
          {showCTA && (
            <div className="mt-12 p-8 rounded-2xl bg-secondary/50 text-center">
              <h3 className="text-xl font-bold mb-4">
                מוכנים ליצור חתימת מייל מקצועית?
              </h3>
              <p className="text-muted-foreground mb-6">
                התחילו עכשיו בחינם וצרו חתימה מרשימה תוך דקות
              </p>
              <Link to="/editor">
                <Button className="btn-primary gap-2">
                  <ArrowRight className="w-4 h-4" />
                  התחל ליצור חתימה
                </Button>
              </Link>
            </div>
          )}
        </div>
      </article>
    </Layout>
  );
};

export default ContentPage;
