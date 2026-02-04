import ContentPage from '@/components/ContentPage';

export default function FAQ() {
  return (
    <ContentPage
      title="שאלות נפוצות על חתימות מייל"
      description="תשובות לשאלות הנפוצות ביותר על יצירת חתימות מייל מקצועיות ב-SignaturePro"
      keywords="שאלות נפוצות חתימה, FAQ חתימת מייל, עזרה חתימה, תמיכה SignaturePro"
    >
      <section className="space-y-8">
        <div className="space-y-4">
          <h2 className="text-xl font-bold">מה זה SignaturePro?</h2>
          <p>
            SignaturePro הוא כלי מקוון ליצירת חתימות מייל מקצועיות ומעוצבות. 
            המערכת מאפשרת ליצור חתימות מרשימות תוך דקות, ללא צורך בידע טכני או עיצובי.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold">האם החתימות עובדות בכל תוכנת מייל?</h2>
          <p>
            כן! החתימות שנוצרות ב-SignaturePro תואמות לכל תוכנות המייל הנפוצות: 
            Gmail, Outlook, Apple Mail, Thunderbird ועוד. החתימות בנויות בפורמט HTML סטנדרטי.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold">האם אני יכול להוסיף לוגו לחתימה?</h2>
          <p>
            בהחלט! ניתן להעלות לוגו או תמונה אישית לחתימה. אנחנו ממליצים על תמונה 
            בגודל סביר (עד 200 פיקסלים רוחב) כדי שהחתימה תיטען מהר ותיראה טוב.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold">כמה חתימות אני יכול ליצור?</h2>
          <p>
            מספר החתימות תלוי בחבילה שרכשתם. בחבילה הבסיסית ניתן ליצור חתימה אחת, 
            בחבילה הזוגית 2 חתימות, ובחבילה העסקית 3 חתימות עם אפשרות להרחבה.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold">למה החתימה נראית שונה בכל תוכנת מייל?</h2>
          <p>
            כל תוכנת מייל מציגה HTML בצורה מעט שונה. אנחנו עושים מאמץ שהחתימות יראו 
            אחיד ככל האפשר, אבל הבדלים קלים הם נורמליים. הקפידו לבדוק את החתימה במספר תוכנות.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold">האם אני יכול לערוך את החתימה אחרי היצירה?</h2>
          <p>
            כן! במהלך תקופת הגישה (3 חודשים) תוכלו לערוך ולעדכן את החתימות שלכם 
            ללא הגבלה. כל עדכון ידרוש התקנה מחדש בתוכנת המייל.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold">איך מוסיפים רשתות חברתיות?</h2>
          <p>
            בעורך החתימות יש אזור מיוחד לרשתות חברתיות. פשוט הזינו את כתובות 
            הפרופילים שלכם (LinkedIn, Facebook, Instagram ועוד) והאייקונים יופיעו אוטומטית.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold">מה קורה אחרי 3 חודשים?</h2>
          <p>
            החתימות שיצרתם ממשיכות לעבוד ללא הגבלה. תקופת ה-3 חודשים מתייחסת 
            לגישה לעריכה ועדכון החתימות. לאחריה תוכלו לרכוש גישה מחודשת.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold">האם יש החזר כספי?</h2>
          <p>
            אנחנו מציעים תקופת ניסיון חינמית שמאפשרת לראות כיצד המערכת עובדת לפני הרכישה. 
            לאחר הרכישה, בשל אופי המוצר הדיגיטלי, לא ניתן לקבל החזר.
          </p>
        </div>
      </section>
    </ContentPage>
  );
}
