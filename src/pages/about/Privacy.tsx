import ContentPage from '@/components/ContentPage';

export default function Privacy() {
  return (
    <ContentPage
      title="אבטחת מידע ופרטיות"
      description="הכירו את מדיניות הפרטיות ואבטחת המידע של SignaturePro"
      keywords="פרטיות SignaturePro, אבטחת מידע, הגנה על מידע אישי, מדיניות פרטיות"
      showCTA={false}
    >
      <section className="space-y-6">
        <h2 className="text-2xl font-bold">המחויבות שלנו לפרטיות שלכם</h2>
        <p>
          ב-SignaturePro אנחנו מתייחסים לפרטיות שלכם ברצינות רבה. 
          אנחנו אוספים רק את המידע ההכרחי לפעילות השירות ושומרים עליו בצורה מאובטחת.
        </p>

        <h2 className="text-2xl font-bold">איזה מידע אנחנו אוספים?</h2>
        <ul className="list-disc list-inside space-y-2 mr-4">
          <li><strong>פרטי חשבון</strong> - שם, אימייל (לצורך התחברות)</li>
          <li><strong>נתוני חתימה</strong> - המידע שאתם מזינים לחתימה</li>
          <li><strong>נתוני תשלום</strong> - מעובדים על ידי ספק תשלומים מאובטח</li>
          <li><strong>נתוני שימוש</strong> - לשיפור השירות</li>
        </ul>

        <h2 className="text-2xl font-bold">איך אנחנו מגנים על המידע?</h2>
        <ul className="list-disc list-inside space-y-2 mr-4">
          <li>הצפנת נתונים בתעבורה (HTTPS/TLS)</li>
          <li>הצפנת נתונים במנוחה</li>
          <li>אחסון מאובטח בענן</li>
          <li>גישה מוגבלת למידע רגיש</li>
          <li>בקרות אבטחה שוטפות</li>
        </ul>

        <h2 className="text-2xl font-bold">מה אנחנו לא עושים</h2>
        <ul className="list-disc list-inside space-y-2 mr-4">
          <li>לא מוכרים מידע לצדדים שלישיים</li>
          <li>לא משתפים מידע אישי ללא הסכמה</li>
          <li>לא שומרים פרטי תשלום במערכות שלנו</li>
          <li>לא שולחים ספאם או פרסומות ללא הסכמה</li>
        </ul>

        <h2 className="text-2xl font-bold">הזכויות שלכם</h2>
        <p>
          על פי חוק הגנת הפרטיות הישראלי ותקנות ה-GDPR האירופיות, יש לכם זכות:
        </p>
        <ul className="list-disc list-inside space-y-2 mr-4 mt-2">
          <li>לעיין במידע שאנחנו שומרים עליכם</li>
          <li>לבקש תיקון מידע שגוי</li>
          <li>לבקש מחיקת המידע שלכם</li>
          <li>להתנגד לעיבוד מסוים של המידע</li>
          <li>לייצא את המידע שלכם</li>
        </ul>

        <h2 className="text-2xl font-bold">עוגיות (Cookies)</h2>
        <p>
          אנחנו משתמשים בעוגיות הכרחיות לפעולת האתר (כמו שמירת התחברות) 
          ובעוגיות אנליטיות לשיפור השירות. ניתן לשלוט בהעדפות העוגיות בדפדפן.
        </p>

        <h2 className="text-2xl font-bold">יצירת קשר בנושא פרטיות</h2>
        <p>
          לשאלות או בקשות בנושא פרטיות, ניתן לפנות אלינו באימייל: 
          <a href="mailto:privacy@signaturepro.co.il" className="text-primary hover:underline mr-1">
            privacy@signaturepro.co.il
          </a>
        </p>

        <p className="text-sm text-muted-foreground mt-8">
          עודכן לאחרונה: פברואר 2025
        </p>
      </section>
    </ContentPage>
  );
}
