import ContentPage from '@/components/ContentPage';

export default function AddSignatureToOutlook() {
  return (
    <ContentPage
      title="איך מוסיפים חתימה ל-Outlook"
      description="מדריך מפורט להוספת חתימת מייל מקצועית ל-Microsoft Outlook בגרסאות השונות"
      keywords="חתימה Outlook, הוספת חתימה אאוטלוק, חתימת מייל מיקרוסופט, Outlook signature"
    >
      <section className="space-y-6">
        <h2 className="text-2xl font-bold">הוספת חתימה ב-Outlook</h2>
        <p>
          Microsoft Outlook הוא כלי המייל הנפוץ ביותר בסביבה העסקית. הוספת חתימה מקצועית 
          היא פעולה חד פעמית שתשדרג את כל התקשורת העסקית שלכם.
        </p>

        <h2 className="text-2xl font-bold">Outlook לשולחן העבודה (Windows)</h2>
        <ol className="list-decimal list-inside space-y-3 mr-4">
          <li>פתחו את Outlook ולחצו על <strong>קובץ</strong> בתפריט העליון</li>
          <li>בחרו <strong>אפשרויות</strong> ואז <strong>דואר</strong></li>
          <li>לחצו על <strong>חתימות</strong></li>
          <li>לחצו על <strong>חדש</strong> ותנו שם לחתימה</li>
          <li>העתיקו את החתימה מ-SignaturePro והדביקו בתיבת העריכה</li>
          <li>הגדירו את החתימה כברירת מחדל להודעות חדשות ולתשובות</li>
          <li>לחצו <strong>אישור</strong> לשמירה</li>
        </ol>

        <h2 className="text-2xl font-bold">Outlook באינטרנט (Office 365)</h2>
        <ol className="list-decimal list-inside space-y-3 mr-4">
          <li>היכנסו ל-Outlook.com או ל-Office 365</li>
          <li>לחצו על סמל גלגל השיניים ובחרו <strong>הצג את כל הגדרות Outlook</strong></li>
          <li>עברו ל-<strong>דואר</strong> ואז <strong>חתימות</strong></li>
          <li>לחצו על <strong>חתימה חדשה</strong></li>
          <li>הדביקו את החתימה מ-SignaturePro</li>
          <li>הגדירו את החתימה כברירת מחדל</li>
          <li>לחצו <strong>שמור</strong></li>
        </ol>

        <h2 className="text-2xl font-bold">Outlook ל-Mac</h2>
        <ol className="list-decimal list-inside space-y-3 mr-4">
          <li>פתחו את Outlook ולחצו על <strong>Outlook</strong> בתפריט העליון</li>
          <li>בחרו <strong>העדפות</strong></li>
          <li>לחצו על <strong>חתימות</strong></li>
          <li>לחצו על <strong>+</strong> להוספת חתימה חדשה</li>
          <li>הדביקו את החתימה ושמרו</li>
        </ol>

        <h2 className="text-2xl font-bold">טיפים ל-Outlook</h2>
        <ul className="list-disc list-inside space-y-2 mr-4">
          <li>Outlook תומך בחתימות HTML מורכבות</li>
          <li>ניתן ליצור חתימות שונות לחשבונות מייל שונים</li>
          <li>בסביבה ארגונית, ייתכן שמנהל המערכת מגדיר חתימות מרכזית</li>
          <li>וודאו שהחתימה נראית טוב גם בתצוגת טקסט פשוט</li>
        </ul>
      </section>
    </ContentPage>
  );
}
