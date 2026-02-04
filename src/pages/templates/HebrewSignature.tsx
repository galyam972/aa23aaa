import ContentPage from '@/components/ContentPage';

export default function HebrewSignature() {
  return (
    <ContentPage
      title="חתימה בעברית"
      description="מדריך ליצירת חתימת מייל מקצועית בעברית עם תמיכה מלאה ב-RTL"
      keywords="חתימה בעברית, חתימת מייל עברית, חתימה RTL, חתימה ישראלית"
    >
      <section className="space-y-6">
        <h2 className="text-2xl font-bold">יתרונות חתימה בעברית</h2>
        <p>
          חתימה בעברית מתאימה במיוחד לעסקים שפועלים בשוק הישראלי. 
          היא יוצרת חיבור מיידי עם לקוחות מקומיים ומשדרת אותנטיות ונגישות.
        </p>

        <h2 className="text-2xl font-bold">אתגרים טכניים ופתרונות</h2>
        <p>
          עברית היא שפה מימין לשמאל (RTL), מה שיכול ליצור אתגרים בתוכנות מייל שונות. 
          SignaturePro פותרת את הבעיה על ידי יצירת קוד HTML מותאם שמבטיח תצוגה נכונה בכל תוכנה.
        </p>

        <h2 className="text-2xl font-bold">מבנה מומלץ לחתימה בעברית</h2>
        <div className="bg-muted/50 p-4 rounded-lg space-y-1 text-right">
          <p><strong>בברכה,</strong></p>
          <p className="mt-2"><strong>ישראל ישראלי</strong></p>
          <p>מנהל שיווק</p>
          <p>חברה בע"מ</p>
          <p>טלפון: 050-000-0000</p>
          <p>דוא"ל: israel@company.co.il</p>
          <p>אתר: www.company.co.il</p>
        </div>

        <h2 className="text-2xl font-bold">ביטויי סיום נפוצים בעברית</h2>
        <ul className="list-disc list-inside space-y-2 mr-4">
          <li><strong>בברכה</strong> - הכי נפוץ ומקצועי</li>
          <li><strong>בכבוד רב</strong> - פורמלי יותר</li>
          <li><strong>בהוקרה</strong> - מתאים לאחרי שיתוף פעולה</li>
          <li><strong>בהצלחה</strong> - חמים וידידותי</li>
          <li><strong>לשמיעה</strong> - לא פורמלי, מעודד המשך קשר</li>
        </ul>

        <h2 className="text-2xl font-bold">טיפים לחתימה עברית מוצלחת</h2>
        <ul className="list-disc list-inside space-y-2 mr-4">
          <li>בדקו שהטקסט מיושר נכון מימין לשמאל</li>
          <li>וודאו שמספרי טלפון מוצגים בסדר הנכון</li>
          <li>השתמשו בגופן שתומך היטב בעברית</li>
          <li>בדקו את החתימה בכמה תוכנות מייל שונות</li>
          <li>אם יש ערבוב עברית ואנגלית, וודאו שהכל קריא</li>
        </ul>

        <h2 className="text-2xl font-bold">שילוב עברית ואנגלית</h2>
        <p>
          לעיתים קרובות יש צורך לשלב עברית ואנגלית באותה חתימה - למשל שם חברה 
          באנגלית או כתובת אתר. SignaturePro מטפלת בזה אוטומטית ומבטיחה תצוגה נכונה.
        </p>
      </section>
    </ContentPage>
  );
}
