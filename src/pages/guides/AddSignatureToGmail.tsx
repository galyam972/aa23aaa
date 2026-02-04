import ContentPage from '@/components/ContentPage';

export default function AddSignatureToGmail() {
  return (
    <ContentPage
      title="איך מוסיפים חתימה ל-Gmail"
      description="מדריך שלב אחר שלב להוספת חתימת מייל מקצועית לחשבון Gmail שלכם"
      keywords="חתימה Gmail, הוספת חתימה ג'ימייל, חתימת מייל גוגל, Gmail signature"
    >
      <section className="space-y-6">
        <h2 className="text-2xl font-bold">הוספת חתימה ב-Gmail - מדריך מלא</h2>
        <p>
          Gmail הוא אחד משירותי הדואר האלקטרוני הפופולריים בעולם. הוספת חתימה מקצועית 
          תגרום לכל הודעה שתשלחו להיראות מקצועית ומרשימה יותר.
        </p>

        <h2 className="text-2xl font-bold">שלבים להוספת חתימה</h2>
        <ol className="list-decimal list-inside space-y-4 mr-4">
          <li>
            <strong>פתחו את Gmail</strong> - היכנסו לחשבון Gmail שלכם בדפדפן
          </li>
          <li>
            <strong>כניסה להגדרות</strong> - לחצו על סמל גלגל השיניים בפינה הימנית העליונה, ובחרו "הצג את כל ההגדרות"
          </li>
          <li>
            <strong>גלילה לאזור החתימה</strong> - בלשונית "כללי", גללו למטה עד לסעיף "חתימה"
          </li>
          <li>
            <strong>יצירת חתימה חדשה</strong> - לחצו על "יצירה חדשה" והזינו שם לחתימה
          </li>
          <li>
            <strong>הדבקת החתימה</strong> - העתיקו את החתימה מ-SignaturePro והדביקו בתיבת העריכה
          </li>
          <li>
            <strong>הגדרות ברירת מחדל</strong> - בחרו את החתימה כברירת מחדל להודעות חדשות ולתשובות
          </li>
          <li>
            <strong>שמירה</strong> - גללו לתחתית העמוד ולחצו "שמור שינויים"
          </li>
        </ol>

        <h2 className="text-2xl font-bold">טיפים חשובים ל-Gmail</h2>
        <ul className="list-disc list-inside space-y-2 mr-4">
          <li>Gmail תומך בחתימות HTML מלאות כולל תמונות ועיצוב</li>
          <li>ניתן ליצור מספר חתימות ולהחליף ביניהן לפי הצורך</li>
          <li>וודאו שהתמונות בחתימה מאוחסנות באינטרנט ולא מקומית</li>
          <li>בדקו את החתימה גם באפליקציית Gmail במובייל</li>
        </ul>

        <h2 className="text-2xl font-bold">פתרון בעיות נפוצות</h2>
        <ul className="list-disc list-inside space-y-2 mr-4">
          <li><strong>החתימה לא מופיעה</strong> - וודאו שהגדרתם אותה כברירת מחדל</li>
          <li><strong>תמונות לא נטענות</strong> - וודאו שהקישורים לתמונות תקינים ונגישים</li>
          <li><strong>העיצוב משתבש</strong> - נסו להעתיק את החתימה ישירות מהתצוגה המקדימה ב-SignaturePro</li>
        </ul>
      </section>
    </ContentPage>
  );
}
