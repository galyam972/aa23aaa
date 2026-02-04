import ContentPage from '@/components/ContentPage';

export default function EnglishSignature() {
  return (
    <ContentPage
      title="חתימה באנגלית"
      description="מדריך ליצירת חתימת מייל מקצועית באנגלית לתקשורת בינלאומית"
      keywords="חתימה באנגלית, English signature, חתימת מייל אנגלית, international email signature"
    >
      <section className="space-y-6">
        <h2 className="text-2xl font-bold">מתי צריך חתימה באנגלית?</h2>
        <p>
          אם אתם עובדים עם לקוחות, ספקים או שותפים בחו"ל, חתימת מייל באנגלית היא הכרח. 
          גם עסקים ישראליים רבים בוחרים בחתימה באנגלית כדי לשדר מקצועיות בינלאומית.
        </p>

        <h2 className="text-2xl font-bold">מבנה סטנדרטי לחתימה באנגלית</h2>
        <div className="bg-muted/50 p-4 rounded-lg space-y-1 font-mono text-sm">
          <p><strong>Best regards,</strong></p>
          <p className="mt-2"><strong>John Doe</strong></p>
          <p>Marketing Director</p>
          <p>Company Name Ltd.</p>
          <p>Phone: +972-XX-XXX-XXXX</p>
          <p>Email: john@company.com</p>
          <p>Web: www.company.com</p>
        </div>

        <h2 className="text-2xl font-bold">ביטויי סיום נפוצים באנגלית</h2>
        <ul className="list-disc list-inside space-y-2 mr-4">
          <li><strong>Best regards</strong> - הכי נפוץ ובטוח</li>
          <li><strong>Kind regards</strong> - מעט יותר פורמלי</li>
          <li><strong>Sincerely</strong> - פורמלי מאוד</li>
          <li><strong>Best</strong> - קצר וידידותי</li>
          <li><strong>Cheers</strong> - לא פורמלי, יותר לקולגות</li>
        </ul>

        <h2 className="text-2xl font-bold">טיפים לחתימה באנגלית מוצלחת</h2>
        <ul className="list-disc list-inside space-y-2 mr-4">
          <li>שימו את מספר הטלפון עם קידומת בינלאומית (+972)</li>
          <li>ציינו אזור זמן אם רלוונטי (GMT+2/GMT+3)</li>
          <li>השתמשו בתארים באנגלית (CEO, Director וכו')</li>
          <li>וודאו שאין שגיאות כתיב באנגלית</li>
          <li>אם יש לכם שם עברי, שקלו להוסיף תעתיק</li>
        </ul>

        <h2 className="text-2xl font-bold">חתימה דו-לשונית</h2>
        <p>
          אפשרות נוספת היא ליצור חתימה דו-לשונית - עברית ואנגלית באותה חתימה. 
          זה מתאים במיוחד לעסקים שעובדים גם עם לקוחות ישראליים וגם בינלאומיים.
        </p>
      </section>
    </ContentPage>
  );
}
