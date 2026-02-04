import ContentPage from '@/components/ContentPage';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Contact() {
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
                <a href="mailto:support@signaturepro.co.il" className="text-primary hover:underline">
                  support@signaturepro.co.il
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

        <h2 className="text-2xl font-bold mt-8">שעות פעילות</h2>
        <p>
          אנחנו זמינים לכם:
        </p>
        <ul className="list-disc list-inside space-y-2 mr-4">
          <li>ימים א'-ה': 09:00-18:00</li>
          <li>יום ו': 09:00-13:00</li>
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
          <a href="mailto:business@signaturepro.co.il" className="text-primary hover:underline">
            business@signaturepro.co.il
          </a>
        </p>
      </section>
    </ContentPage>
  );
}
