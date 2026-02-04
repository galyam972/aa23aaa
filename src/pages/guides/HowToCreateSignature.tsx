import ContentPage from '@/components/ContentPage';

export default function HowToCreateSignature() {
  return (
    <ContentPage
      title="איך יוצרים חתימת מייל"
      description="מדריך מקיף ליצירת חתימת מייל מקצועית ומרשימה בקלות ובמהירות באמצעות SignaturePro"
      keywords="חתימת מייל, יצירת חתימה, חתימה למייל, חתימה דיגיטלית, עיצוב חתימה"
    >
      <section className="space-y-6">
        <h2 className="text-2xl font-bold">מהי חתימת מייל?</h2>
        <p>
          חתימת מייל היא בלוק מידע שמופיע בסוף כל הודעת אימייל שאתם שולחים. 
          היא כוללת בדרך כלל את השם שלכם, התפקיד, פרטי יצירת קשר, ולעיתים גם לוגו או קישורים לרשתות חברתיות.
        </p>

        <h2 className="text-2xl font-bold">למה חשוב להשקיע בחתימת מייל?</h2>
        <ul className="list-disc list-inside space-y-2 mr-4">
          <li>מקצועיות ואמינות - חתימה מעוצבת משדרת רצינות עסקית</li>
          <li>נגישות - מאפשרת לנמענים ליצור קשר בקלות</li>
          <li>מיתוג - מחזקת את הזהות העסקית שלכם</li>
          <li>שיווק - הזדמנות לקדם מוצרים או שירותים</li>
        </ul>

        <h2 className="text-2xl font-bold">איך יוצרים חתימה ב-SignaturePro?</h2>
        <ol className="list-decimal list-inside space-y-3 mr-4">
          <li>
            <strong>כניסה לעורך</strong> - התחברו לחשבון שלכם ופתחו את עורך החתימות
          </li>
          <li>
            <strong>מילוי פרטים</strong> - הזינו את השם, תפקיד, חברה ופרטי קשר
          </li>
          <li>
            <strong>בחירת תבנית</strong> - בחרו מתוך מגוון תבניות מעוצבות
          </li>
          <li>
            <strong>התאמה אישית</strong> - שנו צבעים, גופנים והוסיפו לוגו
          </li>
          <li>
            <strong>הוספת רשתות חברתיות</strong> - קשרו את הפרופילים העסקיים שלכם
          </li>
          <li>
            <strong>תצוגה מקדימה</strong> - וודאו שהחתימה נראית בדיוק כמו שרציתם
          </li>
          <li>
            <strong>ייצוא והתקנה</strong> - הורידו את החתימה והתקינו בתוכנת המייל שלכם
          </li>
        </ol>

        <h2 className="text-2xl font-bold">טיפים לחתימה מוצלחת</h2>
        <ul className="list-disc list-inside space-y-2 mr-4">
          <li>שמרו על פשטות - אל תעמיסו יותר מדי מידע</li>
          <li>השתמשו בצבעים שמתאימים למיתוג שלכם</li>
          <li>וודאו שכל הקישורים עובדים</li>
          <li>בדקו איך החתימה נראית גם במובייל</li>
          <li>עדכנו את החתימה כשמשהו משתנה</li>
        </ul>
      </section>
    </ContentPage>
  );
}
