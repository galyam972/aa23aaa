import ContentPage from '@/components/ContentPage';

export default function ManageSignatures() {
  return (
    <ContentPage
      title="ניהול ועריכת חתימות"
      description="מדריך לניהול, עריכה ועדכון חתימות המייל שלכם ב-SignaturePro"
      keywords="ניהול חתימות, עריכת חתימה, עדכון חתימת מייל, החלפת חתימה"
    >
      <section className="space-y-6">
        <h2 className="text-2xl font-bold">ניהול חתימות ב-SignaturePro</h2>
        <p>
          SignaturePro מאפשר לכם לנהל מספר חתימות מייל במקום אחד. בין אם אתם צריכים 
          חתימות שונות לתפקידים שונים, או שאתם מנהלים חתימות לכל הצוות - הכל מתאפשר בקלות.
        </p>

        <h2 className="text-2xl font-bold">יצירת חתימה נוספת</h2>
        <p>
          אם יש לכם מספר תפקידים או עסקים, תוכלו ליצור חתימה נפרדת לכל אחד מהם.
          פשוט היכנסו לעורך החתימות ויצרו חתימה חדשה עם הפרטים הרלוונטיים.
        </p>

        <h2 className="text-2xl font-bold">עריכת חתימה קיימת</h2>
        <ol className="list-decimal list-inside space-y-3 mr-4">
          <li>היכנסו לחשבון SignaturePro שלכם</li>
          <li>בחרו את החתימה שברצונכם לערוך</li>
          <li>עדכנו את הפרטים הרלוונטיים</li>
          <li>בדקו את התצוגה המקדימה</li>
          <li>שמרו את השינויים</li>
          <li>הורידו את החתימה המעודכנת והתקינו מחדש בתוכנת המייל</li>
        </ol>

        <h2 className="text-2xl font-bold">מתי כדאי לעדכן את החתימה?</h2>
        <ul className="list-disc list-inside space-y-2 mr-4">
          <li>שינוי בתפקיד או בחברה</li>
          <li>מעבר למספר טלפון חדש</li>
          <li>עדכון לוגו או מיתוג חברה</li>
          <li>הוספת רשתות חברתיות חדשות</li>
          <li>קמפיין שיווקי או מבצע מיוחד</li>
          <li>עדכון אתר אינטרנט</li>
        </ul>

        <h2 className="text-2xl font-bold">ניהול חתימות לצוות</h2>
        <p>
          בחבילה העסקית, תוכלו ליצור חתימות אחידות לכל חברי הצוות תוך שמירה על מיתוג 
          אחיד. כל עובד יוכל להזין את הפרטים האישיים שלו בתוך תבנית קבועה מראש.
        </p>

        <h2 className="text-2xl font-bold">טיפים לניהול יעיל</h2>
        <ul className="list-disc list-inside space-y-2 mr-4">
          <li>שמרו על אחידות בסגנון ובמיתוג בין כל החתימות</li>
          <li>עדכנו את כל החתימות במקביל כשיש שינוי במיתוג</li>
          <li>צרו תבנית בסיסית שאפשר לשכפל ולהתאים</li>
          <li>וודאו שכל הקישורים בחתימות תקינים ומעודכנים</li>
        </ul>
      </section>
    </ContentPage>
  );
}
