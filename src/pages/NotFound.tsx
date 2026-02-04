import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Layout } from '@/components/layout';
import { Home, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <Layout>
      <div className="flex flex-1 items-center justify-center py-20">
        <div className="text-center">
          <h1 className="mb-4 text-6xl font-bold text-primary">404</h1>
          <p className="mb-2 text-2xl font-semibold text-foreground">הדף לא נמצא</p>
          <p className="mb-8 text-muted-foreground">
            מצטערים, הדף שחיפשת לא קיים או הועבר למקום אחר.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/">
              <Button className="gap-2">
                <Home className="w-4 h-4" />
                חזרה לדף הבית
              </Button>
            </Link>
            <Link to="/editor">
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                לעורך החתימות
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
