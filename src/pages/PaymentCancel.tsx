import { Link } from 'react-router-dom';
import { XCircle, ArrowLeft } from 'lucide-react';
import { Layout } from '@/components/layout';

const PaymentCancel = () => {
  return (
    <Layout>
      <div className="flex-1 gradient-hero flex items-center justify-center p-4 py-20">
        <div className="card-glass p-8 max-w-md w-full text-center animate-fade-in">
          <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-6">
            <XCircle className="w-12 h-12 text-red-600" />
          </div>
          
          <h1 className="text-2xl font-bold text-foreground mb-2">התשלום בוטל</h1>
          <p className="text-muted-foreground mb-6">
            התשלום לא הושלם. אם נתקלת בבעיה, אנא נסה שוב או צור קשר.
          </p>

          <div className="space-y-3">
            <Link
              to="/#pricing"
              className="btn-primary inline-flex items-center gap-2 w-full justify-center"
            >
              נסה שוב
            </Link>
            
            <Link
              to="/"
              className="btn-secondary inline-flex items-center gap-2 w-full justify-center"
            >
              <ArrowLeft className="w-4 h-4" />
              חזרה לדף הבית
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PaymentCancel;
