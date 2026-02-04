import ContentPage from '@/components/ContentPage';

export default function WhoIsItFor() {
  return (
    <ContentPage
      title="למי המערכת מתאימה"
      description="גלו אם SignaturePro מתאים לכם - פתרון לעצמאים, עסקים קטנים וארגונים"
      keywords="למי מתאים SignaturePro, קהל יעד חתימות מייל, חתימה לעסקים, חתימה לעצמאים"
    >
      <section className="space-y-6">
        <h2 className="text-2xl font-bold">SignaturePro מתאים לכולם</h2>
        <p>
          בין אם אתם עצמאים, בעלי עסקים קטנים או עובדים בארגון גדול - 
          חתימת מייל מקצועית היא כלי חיוני לתקשורת עסקית. הנה איך SignaturePro עוזר לכל אחד:
        </p>

        <div className="space-y-8 mt-8">
          <div className="p-6 bg-secondary/30 rounded-xl">
            <h3 className="text-xl font-bold mb-3">🧑‍💼 עצמאים ופרילנסרים</h3>
            <p className="text-muted-foreground mb-4">
              כשאתם העסק, התדמית שלכם היא הכל. חתימה מקצועית עוזרת לכם להיראות רציניים 
              ואמינים, גם אם אתם עובדים מהבית.
            </p>
            <ul className="list-disc list-inside space-y-1 mr-4 text-sm">
              <li>יועצים ומאמנים</li>
              <li>עורכי דין ורואי חשבון</li>
              <li>מעצבים ומפתחים</li>
              <li>כותבים ומתרגמים</li>
            </ul>
          </div>

          <div className="p-6 bg-secondary/30 rounded-xl">
            <h3 className="text-xl font-bold mb-3">🏢 עסקים קטנים ובינוניים</h3>
            <p className="text-muted-foreground mb-4">
              צרו מיתוג אחיד לכל העובדים. חתימות מקצועיות בונות אמון עם לקוחות 
              ומשדרות מקצועיות בכל נקודת מגע.
            </p>
            <ul className="list-disc list-inside space-y-1 mr-4 text-sm">
              <li>סוכנויות ומשרדים</li>
              <li>חנויות ועסקי קמעונאות</li>
              <li>חברות שירותים</li>
              <li>סטארט-אפים צומחים</li>
            </ul>
          </div>

          <div className="p-6 bg-secondary/30 rounded-xl">
            <h3 className="text-xl font-bold mb-3">🏛️ ארגונים וחברות גדולות</h3>
            <p className="text-muted-foreground mb-4">
              שמרו על אחידות מיתוגית בכל הארגון. צרו תבנית מרכזית שכל עובד יכול להתאים 
              עם הפרטים האישיים שלו.
            </p>
            <ul className="list-disc list-inside space-y-1 mr-4 text-sm">
              <li>מחלקות שיווק ומכירות</li>
              <li>צוותי תמיכה ושירות</li>
              <li>הנהלה בכירה</li>
              <li>עובדים בקשר עם לקוחות</li>
            </ul>
          </div>

          <div className="p-6 bg-secondary/30 rounded-xl">
            <h3 className="text-xl font-bold mb-3">🎓 מחפשי עבודה וסטודנטים</h3>
            <p className="text-muted-foreground mb-4">
              עשו רושם ראשוני מעולה. חתימה מקצועית בקורות חיים ובתקשורת עם מעסיקים 
              פוטנציאליים מראה רצינות ומוכנות.
            </p>
            <ul className="list-disc list-inside space-y-1 mr-4 text-sm">
              <li>בוגרי אוניברסיטה</li>
              <li>מחליפי קריירה</li>
              <li>מתמחים ועובדים זוטרים</li>
            </ul>
          </div>
        </div>
      </section>
    </ContentPage>
  );
}
