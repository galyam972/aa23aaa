import ContentPage from '@/components/ContentPage';

export default function SignatureWithLogo() {
  return (
    <ContentPage
      title="חתימה עם לוגו"
      description="מדריך להוספת לוגו לחתימת המייל שלכם בצורה מקצועית ואופטימלית"
      keywords="חתימה עם לוגו, לוגו בחתימת מייל, הוספת תמונה לחתימה, עיצוב חתימה עם לוגו"
    >
      <section className="space-y-6">
        <h2 className="text-2xl font-bold">למה להוסיף לוגו לחתימה?</h2>
        <p>
          לוגו בחתימת המייל מחזק את המיתוג שלכם ויוצר זיהוי מיידי. 
          מחקרים מראים שחתימות עם לוגו נתפסות כמקצועיות יותר ומגבירות את האמון.
        </p>

        <h2 className="text-2xl font-bold">דרישות טכניות ללוגו</h2>
        <ul className="list-disc list-inside space-y-2 mr-4">
          <li><strong>פורמט</strong> - PNG (עדיף עם רקע שקוף) או JPG</li>
          <li><strong>גודל מומלץ</strong> - רוחב 150-200 פיקסלים</li>
          <li><strong>משקל קובץ</strong> - עד 50KB לטעינה מהירה</li>
          <li><strong>רזולוציה</strong> - 72 DPI מספיק למסכים</li>
          <li><strong>יחס גובה-רוחב</strong> - שמרו על הפרופורציות המקוריות</li>
        </ul>

        <h2 className="text-2xl font-bold">איפה למקם את הלוגו?</h2>
        <ul className="list-disc list-inside space-y-2 mr-4">
          <li><strong>בראש החתימה</strong> - הכי נפוץ, הלוגו בולט מיד</li>
          <li><strong>בצד</strong> - ליד פרטי הקשר, חוסך מקום</li>
          <li><strong>בתחתית</strong> - פחות נפוץ אבל מתאים לסגנונות מסוימים</li>
        </ul>

        <h2 className="text-2xl font-bold">איך להוסיף לוגו ב-SignaturePro</h2>
        <ol className="list-decimal list-inside space-y-3 mr-4">
          <li>היכנסו לעורך החתימות</li>
          <li>לחצו על "הוסף לוגו" או "העלה תמונה"</li>
          <li>בחרו את קובץ הלוגו מהמחשב</li>
          <li>התאימו את הגודל והמיקום לפי הצורך</li>
          <li>בדקו בתצוגה המקדימה שהלוגו נראה טוב</li>
        </ol>

        <h2 className="text-2xl font-bold">טיפים לשימוש נכון בלוגו</h2>
        <ul className="list-disc list-inside space-y-2 mr-4">
          <li>אל תגדילו את הלוגו יותר מדי - זה נראה לא מקצועי</li>
          <li>וודאו שהלוגו נראה טוב גם על רקע לבן וגם כהה</li>
          <li>אם הלוגו מורכב מדי, שקלו גרסה פשוטה יותר</li>
          <li>הימנעו מלוגו מטושטש או פיקסלי</li>
          <li>בדקו שהלוגו נטען כראוי בכל תוכנות המייל</li>
        </ul>

        <h2 className="text-2xl font-bold">בעיות נפוצות ופתרונות</h2>
        <ul className="list-disc list-inside space-y-2 mr-4">
          <li><strong>הלוגו לא מופיע</strong> - וודאו שהקובץ באינטרנט ולא מקומי</li>
          <li><strong>הלוגו גדול מדי</strong> - הקטינו את הממדים לפני ההעלאה</li>
          <li><strong>רקע לבן סביב הלוגו</strong> - השתמשו בקובץ PNG שקוף</li>
        </ul>
      </section>
    </ContentPage>
  );
}
