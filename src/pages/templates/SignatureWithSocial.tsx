import ContentPage from '@/components/ContentPage';

export default function SignatureWithSocial() {
  return (
    <ContentPage
      title="חתימה עם רשתות חברתיות"
      description="מדריך להוספת אייקונים וקישורים לרשתות חברתיות בחתימת המייל שלכם"
      keywords="חתימה עם רשתות חברתיות, אייקוני סושיאל בחתימה, LinkedIn בחתימה, פייסבוק בחתימת מייל"
    >
      <section className="space-y-6">
        <h2 className="text-2xl font-bold">למה להוסיף רשתות חברתיות לחתימה?</h2>
        <p>
          הוספת קישורים לרשתות החברתיות בחתימת המייל מאפשרת ללקוחות וקולגות 
          להתחבר אליכם בערוצים נוספים. זה מגביר את הנוכחות הדיגיטלית ומחזק את הקשר.
        </p>

        <h2 className="text-2xl font-bold">אילו רשתות כדאי להוסיף?</h2>
        <ul className="list-disc list-inside space-y-2 mr-4">
          <li><strong>LinkedIn</strong> - חובה לסביבה עסקית, הפרופיל המקצועי שלכם</li>
          <li><strong>פייסבוק</strong> - דף עסקי, לא פרופיל אישי</li>
          <li><strong>אינסטגרם</strong> - מתאים לעסקים ויזואליים</li>
          <li><strong>טוויטר/X</strong> - לעסקים עם נוכחות פעילה</li>
          <li><strong>יוטיוב</strong> - אם יש לכם ערוץ עם תוכן</li>
          <li><strong>וואטסאפ</strong> - לתקשורת ישירה עם לקוחות</li>
        </ul>

        <h2 className="text-2xl font-bold">כמה רשתות להוסיף?</h2>
        <p>
          הכלל הוא "פחות זה יותר". מומלץ להוסיף 3-5 רשתות לכל היותר. 
          בחרו רק את הרשתות שאתם פעילים בהן ושרלוונטיות לקהל היעד שלכם.
        </p>

        <h2 className="text-2xl font-bold">סגנונות תצוגה</h2>
        <ul className="list-disc list-inside space-y-2 mr-4">
          <li><strong>אייקונים צבעוניים</strong> - בולטים ומוכרים</li>
          <li><strong>אייקונים מונוכרומטיים</strong> - אלגנטיים ומינימליסטיים</li>
          <li><strong>אייקונים בצבע המותג</strong> - מתאימים למיתוג החברה</li>
          <li><strong>קישורי טקסט</strong> - פשוט יותר, מתאים לחתימות מינימליסטיות</li>
        </ul>

        <h2 className="text-2xl font-bold">איך להוסיף רשתות ב-SignaturePro</h2>
        <ol className="list-decimal list-inside space-y-3 mr-4">
          <li>בעורך החתימות, עברו לאזור "רשתות חברתיות"</li>
          <li>בחרו את הרשתות שברצונכם להוסיף</li>
          <li>הזינו את כתובות הפרופילים שלכם</li>
          <li>בחרו את סגנון האייקונים</li>
          <li>סדרו את הסדר לפי החשיבות</li>
        </ol>

        <h2 className="text-2xl font-bold">טיפים חשובים</h2>
        <ul className="list-disc list-inside space-y-2 mr-4">
          <li>וודאו שכל הקישורים עובדים ומובילים לעמודים הנכונים</li>
          <li>קשרו רק לפרופילים מקצועיים ומעודכנים</li>
          <li>אל תקשרו לפרופילים אישיים (אלא אם זה הפלטפורמה שלכם)</li>
          <li>בדקו שהאייקונים נראים טוב גם בגודל קטן</li>
          <li>שמרו על אחידות בסגנון האייקונים</li>
        </ul>
      </section>
    </ContentPage>
  );
}
