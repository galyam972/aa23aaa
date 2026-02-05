import ContentPage from '@/components/ContentPage';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqItems = [
  {
    question: 'מה זה SignaturePro?',
    answer: 'SignaturePro הוא כלי מקוון ליצירת חתימות מייל מקצועיות ומעוצבות. המערכת מאפשרת ליצור חתימות מרשימות תוך דקות, ללא צורך בידע טכני או עיצובי.',
  },
  {
    question: 'האם החתימות עובדות בכל תוכנת מייל?',
    answer: 'כן! החתימות שנוצרות ב-SignaturePro תואמות לכל תוכנות המייל הנפוצות: Gmail, Outlook, Apple Mail, Thunderbird ועוד. החתימות בנויות בפורמט HTML סטנדרטי.',
  },
  {
    question: 'האם אני יכול להוסיף לוגו לחתימה?',
    answer: 'בהחלט! ניתן להעלות לוגו או תמונה אישית לחתימה. אנחנו ממליצים על תמונה בגודל סביר (עד 200 פיקסלים רוחב) כדי שהחתימה תיטען מהר ותיראה טוב.',
  },
  {
    question: 'כמה חתימות אני יכול ליצור?',
    answer: 'מספר החתימות תלוי בחבילה שרכשתם. בחבילה הבסיסית ניתן ליצור חתימה אחת, בחבילה הזוגית 2 חתימות, ובחבילה העסקית 3 חתימות עם אפשרות להרחבה.',
  },
  {
    question: 'למה החתימה נראית שונה בכל תוכנת מייל?',
    answer: 'כל תוכנת מייל מציגה HTML בצורה מעט שונה. אנחנו עושים מאמץ שהחתימות יראו אחיד ככל האפשר, אבל הבדלים קלים הם נורמליים. הקפידו לבדוק את החתימה במספר תוכנות.',
  },
  {
    question: 'האם אני יכול לערוך את החתימה אחרי היצירה?',
    answer: 'כן! במהלך תקופת הגישה (3 חודשים) תוכלו לערוך ולעדכן את החתימות שלכם ללא הגבלה. כל עדכון ידרוש התקנה מחדש בתוכנת המייל.',
  },
  {
    question: 'איך מוסיפים רשתות חברתיות?',
    answer: 'בעורך החתימות יש אזור מיוחד לרשתות חברתיות. פשוט הזינו את כתובות הפרופילים שלכם (LinkedIn, Facebook, Instagram ועוד) והאייקונים יופיעו אוטומטית.',
  },
  {
    question: 'מה קורה אחרי 3 חודשים?',
    answer: 'החתימות שיצרתם ממשיכות לעבוד ללא הגבלה. תקופת ה-3 חודשים מתייחסת לגישה לעריכה ועדכון החתימות. לאחריה תוכלו לרכוש גישה מחודשת.',
  },
  {
    question: 'האם יש החזר כספי?',
    answer: 'אנחנו מציעים תקופת ניסיון חינמית שמאפשרת לראות כיצד המערכת עובדת לפני הרכישה. לאחר הרכישה, בשל אופי המוצר הדיגיטלי, לא ניתן לקבל החזר.',
  },
];

export default function FAQ() {
  return (
    <ContentPage
      title="שאלות נפוצות על חתימות מייל"
      description="תשובות לשאלות הנפוצות ביותר על יצירת חתימות מייל מקצועיות ב-SignaturePro"
      keywords="שאלות נפוצות חתימה, FAQ חתימת מייל, עזרה חתימה, תמיכה SignaturePro"
    >
      <Accordion type="single" collapsible className="w-full">
        {faqItems.map((item, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-right text-lg font-semibold hover:text-primary">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-base leading-relaxed">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </ContentPage>
  );
}
