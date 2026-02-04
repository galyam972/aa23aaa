import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle, ArrowLeft, Loader2 } from 'lucide-react';
import { checkSignatures } from '@/lib/payment';
import { Layout } from '@/components/layout';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [signatureInfo, setSignatureInfo] = useState<{
    hasAccess: boolean;
    remainingSignatures: number;
  } | null>(null);

  const purchaseId = searchParams.get('purchase_id');
  const email = searchParams.get('email') || localStorage.getItem('payment_email');

  useEffect(() => {
    const fetchSignatureInfo = async () => {
      if (email) {
        // Wait a bit for webhook to process
        await new Promise(resolve => setTimeout(resolve, 2000));
        const info = await checkSignatures(email);
        setSignatureInfo({
          hasAccess: info.hasAccess,
          remainingSignatures: info.remainingSignatures,
        });
      }
      setLoading(false);
    };

    fetchSignatureInfo();
  }, [email]);

  return (
    <Layout>
      <div className="flex-1 gradient-hero flex items-center justify-center p-4 py-20">
        <div className="card-glass p-8 max-w-md w-full text-center animate-fade-in">
          {loading ? (
            <>
              <Loader2 className="w-16 h-16 mx-auto text-primary animate-spin mb-4" />
              <h1 className="text-2xl font-bold text-foreground mb-2">מעבד את התשלום...</h1>
              <p className="text-muted-foreground">אנא המתן רגע</p>
            </>
          ) : (
            <>
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
              
              <h1 className="text-2xl font-bold text-foreground mb-2">התשלום בוצע בהצלחה! 🎉</h1>
              <p className="text-muted-foreground mb-6">
                תודה על הרכישה! החתימות שלך מוכנות לשימוש.
              </p>

              {signatureInfo && (
                <div className="bg-secondary/50 rounded-xl p-4 mb-6">
                  <p className="text-lg font-semibold text-foreground">
                    {signatureInfo.remainingSignatures} חתימות זמינות
                  </p>
                  <p className="text-sm text-muted-foreground">
                    תוקף: 3 חודשים מהיום
                  </p>
                </div>
              )}

              <Link
                to="/editor"
                className="btn-primary inline-flex items-center gap-2 w-full justify-center"
              >
                <ArrowLeft className="w-4 h-4" />
                התחל ליצור חתימות
              </Link>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default PaymentSuccess;
