import ContentPage from '@/components/ContentPage';

export default function HowItWorks() {
  return (
    <ContentPage
      title="איך SignaturePro עובד"
      description="הכירו את התהליך הפשוט ליצירת חתימת מייל מקצועית ב-SignaturePro"
      keywords="איך SignaturePro עובד, תהליך יצירת חתימה, מדריך SignaturePro, שימוש במחולל חתימות"
    >
      <section className="space-y-6">
        <h2 className="text-2xl font-bold">תהליך פשוט בארבעה שלבים</h2>
        <p>
          SignaturePro מאפשר ליצור חתימת מייל מקצועית תוך דקות ספורות, 
          ללא צורך בידע טכני או עיצובי. הנה איך זה עובד:
        </p>

        <div className="space-y-8 mt-8">
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-xl font-bold text-primary shrink-0">
              1
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">הזנת הפרטים שלכם</h3>
              <p className="text-muted-foreground">
                מלאו את הפרטים האישיים והמקצועיים שלכם: שם, תפקיד, חברה, טלפון, אימייל, אתר אינטרנט 
                ורשתות חברתיות. המערכת מנחה אתכם שלב אחר שלב.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-xl font-bold text-primary shrink-0">
              2
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">בחירת תבנית ועיצוב</h3>
              <p className="text-muted-foreground">
                בחרו מתוך מגוון תבניות מעוצבות מראש. התאימו את הצבעים, הגופנים והמבנה לסגנון שלכם. 
                כל שינוי מתעדכן בזמן אמת בתצוגה המקדימה.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-xl font-bold text-primary shrink-0">
              3
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">תצוגה מקדימה ובדיקה</h3>
              <p className="text-muted-foreground">
                ראו בדיוק איך החתימה תיראה בהודעות המייל שלכם. בדקו שכל הפרטים נכונים 
                ושהעיצוב מתאים לציפיות שלכם.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-xl font-bold text-primary shrink-0">
              4
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">ייצוא והתקנה</h3>
              <p className="text-muted-foreground">
                העתיקו את החתימה ישירות ללוח, או הורידו כקובץ HTML. 
                המדריכים שלנו יעזרו לכם להתקין את החתימה בכל תוכנת מייל.
              </p>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold mt-8">מה הופך אותנו לייחודיים?</h2>
        <ul className="list-disc list-inside space-y-2 mr-4">
          <li><strong>ממשק בעברית</strong> - חוויה נוחה למשתמשים ישראלים</li>
          <li><strong>תמיכה מלאה ב-RTL</strong> - חתימות בעברית נראות מושלם</li>
          <li><strong>תצוגה בזמן אמת</strong> - רואים כל שינוי מיד</li>
          <li><strong>תאימות מלאה</strong> - עובד בכל תוכנות המייל</li>
          <li><strong>ללא מנוי</strong> - תשלום חד פעמי בלבד</li>
        </ul>
      </section>
    </ContentPage>
  );
}
