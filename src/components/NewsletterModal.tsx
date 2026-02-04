import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Mail, Sparkles } from 'lucide-react';

interface NewsletterModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function NewsletterModal({ open, onOpenChange, onSuccess }: NewsletterModalProps) {
  const [email, setEmail] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !agreed) {
      toast.error('נא למלא את כל השדות ולאשר את התנאים');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('נא להזין כתובת אימייל תקינה');
      return;
    }

    setLoading(true);
    
    try {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert({ email: email.toLowerCase().trim(), source: 'free_template' });

      if (error) {
        if (error.code === '23505') {
          // Email already exists - that's fine, let them proceed
          toast.success('ברוכים הבאים בחזרה! 🎉');
        } else {
          throw error;
        }
      } else {
        toast.success('נרשמת בהצלחה לניוזלטר! 🎉');
      }

      // Store in localStorage to remember they subscribed
      localStorage.setItem('newsletter_subscribed', 'true');
      localStorage.setItem('newsletter_email', email.toLowerCase().trim());
      
      onSuccess();
      onOpenChange(false);
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      toast.error('שגיאה בהרשמה. נסה שוב.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            חתימה חינמית!
          </DialogTitle>
          <DialogDescription className="text-center mt-2">
            קבלו את החתימה שלכם בחינם - רק הזינו את האימייל שלכם
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="newsletter-email">כתובת אימייל</Label>
            <div className="relative">
              <Mail className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="newsletter-email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pr-10"
                dir="ltr"
                required
              />
            </div>
          </div>

          <div className="flex items-start gap-2">
            <Checkbox
              id="agree-terms"
              checked={agreed}
              onCheckedChange={(checked) => setAgreed(checked === true)}
            />
            <Label htmlFor="agree-terms" className="text-sm text-muted-foreground leading-relaxed">
              אני מסכים/ה לקבל עדכונים ותכנים שיווקיים מ-GalyamStudio. 
              החתימה תכלול קרדיט קטן שלא ניתן להסרה.
            </Label>
          </div>

          <div className="bg-accent/50 rounded-lg p-3 text-sm text-muted-foreground">
            <p className="font-medium text-foreground mb-1">💡 שימו לב:</p>
            <p>החתימה החינמית כוללת שורת קרדיט קטנה. 
            לחתימה ללא קרדיט - <a href="/" className="text-primary hover:underline">שדרגו לפרימיום</a></p>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'נרשם...' : 'קבלו את החתימה שלכם'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// Check if user already subscribed
export function isNewsletterSubscribed(): boolean {
  return localStorage.getItem('newsletter_subscribed') === 'true';
}
