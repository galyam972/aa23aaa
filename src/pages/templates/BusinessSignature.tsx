import ContentPage from '@/components/ContentPage';

export default function BusinessSignature() {
  return (
    <ContentPage
      title="יצירת חתימה עסקית"
      description="מדריך ליצירת חתימת מייל עסקית מקצועית שמשדרת אמינות ומחזקת את המיתוג שלכם"
      keywords="חתימה עסקית, חתימת מייל לעסק, חתימה מקצועית, חתימה ארגונית"
    >
      <section className="space-y-6">
        <h2 className="text-2xl font-bold">חשיבות החתימה העסקית</h2>
        <p>
          חתימת מייל עסקית היא הרבה יותר מפרטי קשר - היא כרטיס הביקור הדיגיטלי שלכם. 
          בכל הודעה שאתם שולחים, החתימה משדרת מסר על המקצועיות והרצינות של העסק.
        </p>

        <h2 className="text-2xl font-bold">מה צריכה לכלול חתימה עסקית?</h2>
        <ul className="list-disc list-inside space-y-2 mr-4">
          <li><strong>שם מלא ותפקיד</strong> - מי אתם ומה התפקיד שלכם בארגון</li>
          <li><strong>שם החברה</strong> - עם לוגו אם יש</li>
          <li><strong>מספר טלפון</strong> - נייד ו/או משרד</li>
          <li><strong>כתובת אימייל</strong> - כתובת עסקית (לא Gmail/Hotmail)</li>
          <li><strong>אתר אינטרנט</strong> - קישור ישיר לאתר החברה</li>
          <li><strong>כתובת פיזית</strong> - אם רלוונטי לעסק</li>
          <li><strong>רשתות חברתיות</strong> - LinkedIn, פייסבוק עסקי וכו'</li>
        </ul>

        <h2 className="text-2xl font-bold">עקרונות עיצוב לחתימה עסקית</h2>
        <ul className="list-disc list-inside space-y-2 mr-4">
          <li><strong>אחידות מיתוגית</strong> - שימוש בצבעים וגופנים של המותג</li>
          <li><strong>מינימליזם</strong> - פחות זה יותר - רק המידע ההכרחי</li>
          <li><strong>היררכיה ברורה</strong> - המידע החשוב בולט יותר</li>
          <li><strong>לוגו איכותי</strong> - ברזולוציה טובה, גודל סביר</li>
          <li><strong>ניתנות ללחיצה</strong> - כל הקישורים צריכים לעבוד</li>
        </ul>

        <h2 className="text-2xl font-bold">טעויות נפוצות שכדאי להימנע מהן</h2>
        <ul className="list-disc list-inside space-y-2 mr-4">
          <li>חתימה ארוכה מדי עם יותר מדי מידע</li>
          <li>שימוש בגופנים לא מקצועיים או לא קריאים</li>
          <li>תמונות בגודל גדול מדי שמאטות את הטעינה</li>
          <li>ציטוטים או משפטים אישיים בסביבה עסקית</li>
          <li>מידע לא מעודכן</li>
        </ul>

        <h2 className="text-2xl font-bold">חתימה אחידה לכל הארגון</h2>
        <p>
          בארגונים גדולים חשוב שלכל העובדים תהיה חתימה בסגנון אחיד. 
          SignaturePro מאפשר ליצור תבנית מרכזית שכל עובד יכול למלא עם הפרטים שלו, 
          תוך שמירה על מיתוג אחיד.
        </p>
      </section>
    </ContentPage>
  );
}
