import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Check, Minus, Plus, CreditCard } from 'lucide-react';
import { createPayment, calculatePrice, EXTRA_SIGNATURE_PRICE } from '@/lib/payment';
import { toast } from 'sonner';

interface PurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPlan?: number;
}

const planNames = ['', 'בסיסי', 'זוגי', 'עסקי'];
const planDescriptions = ['', 'חתימה אחת', '2 חתימות', '3 חתימות'];

const PurchaseModal = ({ isOpen, onClose, initialPlan = 1 }: PurchaseModalProps) => {
  const [email, setEmail] = useState('');
  const [quantity, setQuantity] = useState(initialPlan);
  const [loading, setLoading] = useState(false);

  const pricing = calculatePrice(quantity);
  const canAddExtras = quantity >= 3;

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handlePurchase = async () => {
    if (!email || !email.includes('@')) {
      toast.error('אנא הזן כתובת אימייל תקינה');
      return;
    }

    setLoading(true);
    
    // Save email for success page
    localStorage.setItem('payment_email', email);

    const result = await createPayment(email, quantity);

    if (result.success && result.paymentUrl) {
      // Redirect to Morning payment page
      window.location.href = result.paymentUrl;
    } else {
      toast.error(result.error || 'שגיאה ביצירת התשלום');
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-xl">רכישת חתימות מייל</DialogTitle>
          <DialogDescription>
            בחר את כמות החתימות והזן את האימייל שלך
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Quantity Selector */}
          <div className="space-y-3">
            <Label>כמות חתימות</Label>
            <div className="flex items-center justify-center gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
              >
                <Minus className="w-4 h-4" />
              </Button>
              <div className="text-center min-w-[100px]">
                <div className="text-3xl font-bold text-foreground">{quantity}</div>
                <div className="text-sm text-muted-foreground">
                  {quantity === 1 ? 'חתימה' : 'חתימות'}
                </div>
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleQuantityChange(1)}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Plan Info */}
          <div className="bg-secondary/50 rounded-xl p-4 space-y-2">
            {quantity <= 3 ? (
              <>
                <div className="flex justify-between text-sm">
                  <span>מסלול {planNames[pricing.basePlan]}</span>
                  <span>{planDescriptions[pricing.basePlan]}</span>
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-between text-sm">
                  <span>מסלול עסקי</span>
                  <span>₪99</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{pricing.extraSignatures} חתימות נוספות × ₪{EXTRA_SIGNATURE_PRICE}</span>
                  <span>₪{pricing.extraSignatures * EXTRA_SIGNATURE_PRICE}</span>
                </div>
              </>
            )}
            <div className="border-t border-border pt-2 flex justify-between font-semibold">
              <span>סה"כ לתשלום</span>
              <span className="text-primary">₪{pricing.totalAmount}</span>
            </div>
          </div>

          {canAddExtras && quantity > 3 && (
            <p className="text-xs text-muted-foreground text-center">
              💡 כל חתימה נוספת מעל 3 עולה רק ₪{EXTRA_SIGNATURE_PRICE}
            </p>
          )}

          {/* Email Input */}
          <div className="space-y-2">
            <Label htmlFor="email">כתובת אימייל</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              dir="ltr"
              className="text-left"
            />
            <p className="text-xs text-muted-foreground">
              הגישה לחתימות תישלח לכתובת זו
            </p>
          </div>

          {/* Features */}
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Check className="w-4 h-4 text-primary" />
              <span>גישה מיידית לאחר תשלום</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Check className="w-4 h-4 text-primary" />
              <span>כל התבניות והעיצובים</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Check className="w-4 h-4 text-primary" />
              <span>תוקף 3 חודשים</span>
            </div>
          </div>

          {/* Purchase Button */}
          <Button
            className="w-full btn-primary gap-2"
            onClick={handlePurchase}
            disabled={loading || !email}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                מעבד...
              </>
            ) : (
              <>
                <CreditCard className="w-4 h-4" />
                המשך לתשלום - ₪{pricing.totalAmount}
              </>
            )}
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            התשלום מאובטח באמצעות חשבונית ירוקה (Morning)
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PurchaseModal;