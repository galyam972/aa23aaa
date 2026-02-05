import ContentPage from '@/components/ContentPage';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, Phone, Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const contactSchema = z.object({
  name: z.string().trim().min(2, 'שם חייב להכיל לפחות 2 תווים').max(100, 'שם ארוך מדי'),
  email: z.string().trim().email('כתובת אימייל לא תקינה').max(255, 'אימייל ארוך מדי'),
  subject: z.string().trim().min(3, 'נושא חייב להכיל לפחות 3 תווים').max(200, 'נושא ארוך מדי'),
  message: z.string().trim().min(10, 'הודעה חייבת להכיל לפחות 10 תווים').max(2000, 'הודעה ארוכה מדי'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      // Create mailto link with form data
      const mailtoSubject = encodeURIComponent(`[SignaturePro] ${data.subject}`);
      const mailtoBody = encodeURIComponent(
        `שם: ${data.name}\nאימייל: ${data.email}\n\n${data.message}`
      );
      const mailtoLink = `mailto:naor@galyam-studio.co.il?subject=${mailtoSubject}&body=${mailtoBody}`;
      
      // Open mail client
      window.location.href = mailtoLink;
      
      toast({
        title: 'תודה על פנייתך!',
        description: 'תוכנת המייל שלך נפתחה. שלח את ההודעה ונחזור אליך בהקדם.',
      });
      
      form.reset();
    } catch (error) {
      toast({
        title: 'שגיאה בשליחה',
        description: 'אנא נסה שנית או פנה אלינו ישירות במייל',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ContentPage
      title="צור קשר"
      description="יש לכם שאלות? רוצים לשמוע עוד על SignaturePro? נשמח לעזור!"
      keywords="צור קשר SignaturePro, תמיכה, שאלות, עזרה חתימת מייל"
      showCTA={false}
    >
      <section className="space-y-6">
        <h2 className="text-2xl font-bold">נשמח לשמוע מכם</h2>
        <p>
          יש לכם שאלות על SignaturePro? צריכים עזרה? או סתם רוצים לומר שלום? 
          אנחנו כאן בשבילכם ונשמח לעזור.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <div className="p-6 bg-secondary/30 rounded-xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-bold">אימייל</h3>
                <a href="mailto:naor@galyam-studio.co.il" className="text-primary hover:underline">
                  naor@galyam-studio.co.il
                </a>
              </div>
            </div>
          </div>

          <div className="p-6 bg-secondary/30 rounded-xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Phone className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-bold">טלפון</h3>
                <a href="tel:+972506818686" className="text-primary hover:underline">
                  050-681-8686
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="mt-8 p-6 bg-secondary/30 rounded-xl">
          <h2 className="text-2xl font-bold mb-6">שלחו לנו הודעה</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>שם מלא</FormLabel>
                      <FormControl>
                        <Input placeholder="הכנס את שמך" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>אימייל</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="your@email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>נושא</FormLabel>
                    <FormControl>
                      <Input placeholder="במה נוכל לעזור?" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>הודעה</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="כתבו את הודעתכם כאן..." 
                        className="min-h-[120px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto">
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 ml-2 animate-spin" />
                    שולח...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 ml-2" />
                    שלח הודעה
                  </>
                )}
              </Button>
            </form>
          </Form>
        </div>

        <h2 className="text-2xl font-bold mt-8">שעות פעילות</h2>
        <p>
          אנחנו זמינים לכם:
        </p>
        <ul className="list-disc list-inside space-y-2 mr-4">
          <li>ימים א'-ה': 09:00-18:00</li>
          <li>שבת: סגור</li>
        </ul>
        <p className="text-muted-foreground text-sm mt-2">
          אנחנו משתדלים להשיב לכל פנייה תוך יום עסקים אחד.
        </p>

        <h2 className="text-2xl font-bold mt-8">שאלות נפוצות</h2>
        <p>
          לפני שפונים, אולי כבר יש לנו תשובה! בדקו את{' '}
          <a href="/guides/faq" className="text-primary hover:underline">
            עמוד השאלות הנפוצות
          </a>{' '}
          שלנו.
        </p>

        <h2 className="text-2xl font-bold mt-8">שיתופי פעולה עסקיים</h2>
        <p>
          מעוניינים בשיתוף פעולה? פתרון לארגון גדול? או הצעה עסקית? 
          נשמח לשמוע! פנו אלינו לאימייל:{' '}
          <a href="mailto:naor@galyam-studio.co.il" className="text-primary hover:underline">
            naor@galyam-studio.co.il
          </a>
        </p>
      </section>
    </ContentPage>
  );
}
