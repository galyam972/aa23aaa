 import ContentPage from '@/components/ContentPage';
 
 const TermsOfService = () => {
   return (
     <ContentPage
       title="תנאי שימוש"
       description="תנאי השימוש המלאים של SignaturePro - קראו בעיון לפני השימוש בשירות"
       keywords="תנאי שימוש, SignaturePro, הסכם משתמש, תנאים והגבלות"
       showCTA={false}
     >
       <div className="space-y-8 text-right">
         <section>
           <p className="text-muted-foreground mb-4">
             עודכן לאחרונה: פברואר 2025
           </p>
           <p>
             ברוכים הבאים ל-SignaturePro. תנאי שימוש אלה ("התנאים") מהווים הסכם משפטי מחייב בינך ("המשתמש" או "אתה") לבין GalyamStudio ("החברה", "אנחנו" או "שלנו"). השימוש בשירות SignaturePro ("השירות") מותנה בהסכמתך לתנאים אלה.
           </p>
         </section>
 
         <section>
           <h2 className="text-2xl font-bold mb-4">1. הגדרות</h2>
           <ul className="list-disc list-inside space-y-2 mr-4">
             <li><strong>"השירות"</strong> - מערכת SignaturePro ליצירת חתימות מייל דיגיטליות, כולל האתר, הכלים והתכונות הנלוות.</li>
             <li><strong>"חתימה"</strong> - תוצר גרפי ו/או טקסטואלי שנוצר באמצעות השירות לשימוש במיילים.</li>
             <li><strong>"תוכן משתמש"</strong> - כל מידע, תמונות, לוגואים וטקסטים שהמשתמש מעלה או מזין לשירות.</li>
             <li><strong>"חשבון"</strong> - חשבון משתמש רשום בשירות.</li>
           </ul>
         </section>
 
         <section>
           <h2 className="text-2xl font-bold mb-4">2. הסכמה לתנאים</h2>
           <p className="mb-3">
             בעצם הגישה לשירות או השימוש בו, אתה מאשר כי:
           </p>
           <ul className="list-disc list-inside space-y-2 mr-4">
             <li>קראת והבנת את תנאי השימוש במלואם.</li>
             <li>אתה מסכים להיות מחויב לתנאים אלה.</li>
             <li>אתה בן 18 לפחות או בעל הרשאה חוקית להתקשר בהסכם זה.</li>
             <li>יש לך סמכות להתחייב בשם הארגון אותו אתה מייצג (אם רלוונטי).</li>
           </ul>
         </section>
 
         <section>
           <h2 className="text-2xl font-bold mb-4">3. תיאור השירות</h2>
           <p className="mb-3">
             SignaturePro מספק פלטפורמה מקוונת ליצירת חתימות מייל מקצועיות. השירות כולל:
           </p>
           <ul className="list-disc list-inside space-y-2 mr-4">
             <li>עורך חתימות אינטראקטיבי עם תבניות מעוצבות.</li>
             <li>אפשרות להוספת לוגו, תמונות וקישורים לרשתות חברתיות.</li>
             <li>ייצוא חתימות בפורמטים התואמים לתוכנות דוא"ל שונות.</li>
             <li>שמירת וניהול חתימות מרובות (למשתמשים רשומים).</li>
           </ul>
         </section>
 
         <section>
           <h2 className="text-2xl font-bold mb-4">4. הרשמה וחשבון משתמש</h2>
           <h3 className="text-xl font-semibold mb-3">4.1 יצירת חשבון</h3>
           <p className="mb-3">
             חלק מתכונות השירות דורשות יצירת חשבון. בעת ההרשמה, אתה מתחייב לספק מידע מדויק, עדכני ומלא.
           </p>
           <h3 className="text-xl font-semibold mb-3">4.2 אבטחת חשבון</h3>
           <p className="mb-3">
             אתה אחראי לשמירה על סודיות פרטי הגישה לחשבונך ולכל פעילות המתבצעת תחת חשבונך. עליך להודיע לנו מיד על כל שימוש לא מורשה בחשבונך.
           </p>
           <h3 className="text-xl font-semibold mb-3">4.3 סגירת חשבון</h3>
           <p>
             אתה רשאי לסגור את חשבונך בכל עת. אנו שומרים לעצמנו את הזכות להשעות או לסגור חשבונות המפרים תנאים אלה.
           </p>
         </section>
 
         <section>
           <h2 className="text-2xl font-bold mb-4">5. תשלומים ומנויים</h2>
           <h3 className="text-xl font-semibold mb-3">5.1 תמחור</h3>
           <p className="mb-3">
             השירות מציע תוכניות שונות, חלקן בתשלום. המחירים מפורטים באתר ועשויים להשתנות מעת לעת. שינויי מחיר לא יחולו על תקופות ששולמו מראש.
           </p>
           <h3 className="text-xl font-semibold mb-3">5.2 אמצעי תשלום</h3>
           <p className="mb-3">
             התשלומים מתבצעים באמצעות שירותי תשלום מאובטחים של צד שלישי. אנו לא שומרים פרטי כרטיסי אשראי בשרתינו.
           </p>
           <h3 className="text-xl font-semibold mb-3">5.3 ביטולים והחזרים</h3>
           <p>
             בקשות לביטול או החזר כספי יטופלו בהתאם למדיניות ההחזרים שלנו ובכפוף לחוק הגנת הצרכן.
           </p>
         </section>
 
         <section>
           <h2 className="text-2xl font-bold mb-4">6. קניין רוחני</h2>
           <h3 className="text-xl font-semibold mb-3">6.1 זכויות החברה</h3>
           <p className="mb-3">
             כל הזכויות בשירות, כולל עיצוב, קוד, תבניות וסימני מסחר, שייכות ל-GalyamStudio. אין להעתיק, לשכפל או להפיץ חלקים מהשירות ללא אישור בכתב.
           </p>
           <h3 className="text-xl font-semibold mb-3">6.2 זכויות המשתמש</h3>
           <p className="mb-3">
             אתה שומר על כל הזכויות בתוכן שאתה מעלה לשירות (לוגו, תמונות וכו'). אתה מעניק לנו רישיון מוגבל לשימוש בתוכן זה לצורך מתן השירות.
           </p>
           <h3 className="text-xl font-semibold mb-3">6.3 חתימות שנוצרו</h3>
           <p>
             החתימות שאתה יוצר באמצעות השירות הן שלך לשימוש חופשי, בכפוף לתנאים אלה.
           </p>
         </section>
 
         <section>
           <h2 className="text-2xl font-bold mb-4">7. שימוש מותר ואסור</h2>
           <h3 className="text-xl font-semibold mb-3">7.1 שימוש מותר</h3>
           <p className="mb-3">
             השירות מיועד ליצירת חתימות מייל לשימוש אישי או עסקי חוקי.
           </p>
           <h3 className="text-xl font-semibold mb-3">7.2 שימושים אסורים</h3>
           <p className="mb-2">אסור להשתמש בשירות ל:</p>
           <ul className="list-disc list-inside space-y-2 mr-4">
             <li>יצירת תוכן בלתי חוקי, פוגעני או מטעה.</li>
             <li>התחזות לאנשים או ארגונים אחרים.</li>
             <li>הפרת זכויות קניין רוחני של צדדים שלישיים.</li>
             <li>הפצת וירוסים, תוכנות זדוניות או קוד מזיק.</li>
             <li>ניסיונות לפרוץ או לשבש את פעילות השירות.</li>
             <li>שימוש מסחרי בלתי מורשה (כגון מכירת תבניות).</li>
           </ul>
         </section>
 
         <section>
           <h2 className="text-2xl font-bold mb-4">8. הגבלת אחריות</h2>
           <p className="mb-3">
             השירות מסופק "כמות שהוא" (AS IS) ללא אחריות מכל סוג. איננו מתחייבים ש:
           </p>
           <ul className="list-disc list-inside space-y-2 mr-4">
             <li>השירות יהיה זמין ללא הפרעות או שגיאות.</li>
             <li>התוצאות יתאימו לציפיותיך.</li>
             <li>השירות יתאים לכל תוכנת דוא"ל.</li>
           </ul>
           <p className="mt-3">
             בהיקף המרבי המותר על פי חוק, לא נישא באחריות לנזקים עקיפים, מיוחדים או תוצאתיים הנובעים מהשימוש בשירות.
           </p>
         </section>
 
         <section>
           <h2 className="text-2xl font-bold mb-4">9. שיפוי</h2>
           <p>
             אתה מתחייב לשפות ולפצות את החברה, עובדיה ושותפיה מפני כל תביעה, נזק או הוצאה הנובעים משימושך בשירות או מהפרת תנאים אלה על ידך.
           </p>
         </section>
 
         <section>
           <h2 className="text-2xl font-bold mb-4">10. שינויים בתנאים</h2>
           <p>
             אנו שומרים לעצמנו את הזכות לעדכן תנאים אלה מעת לעת. שינויים מהותיים יפורסמו באתר ו/או ישלחו אליך בדוא"ל. המשך השימוש בשירות לאחר השינויים מהווה הסכמה לתנאים המעודכנים.
           </p>
         </section>
 
         <section>
           <h2 className="text-2xl font-bold mb-4">11. סיום ההסכם</h2>
           <p>
             אנו רשאים להפסיק או להשעות את גישתך לשירות בכל עת, עם או בלי סיבה, עם או בלי הודעה מוקדמת. במקרה של הפסקת השירות, התנאים הנוגעים לקניין רוחני, הגבלת אחריות ושיפוי ימשיכו לחול.
           </p>
         </section>
 
         <section>
           <h2 className="text-2xl font-bold mb-4">12. דין וסמכות שיפוט</h2>
           <p>
             תנאים אלה כפופים לחוקי מדינת ישראל. כל סכסוך הנובע מתנאים אלה או מהשימוש בשירות יידון בבתי המשפט המוסמכים בישראל בלבד.
           </p>
         </section>
 
         <section>
           <h2 className="text-2xl font-bold mb-4">13. יצירת קשר</h2>
           <p className="mb-3">
             לשאלות או הבהרות בנוגע לתנאי שימוש אלה, ניתן ליצור קשר:
           </p>
           <ul className="list-none space-y-2">
            <li><strong>דוא"ל:</strong> naor@galyam-studio.co.il</li>
            <li><strong>אתר:</strong> www.galyam-studio.co.il</li>
           </ul>
         </section>
 
         <section className="border-t pt-6 mt-8">
           <p className="text-sm text-muted-foreground">
             © {new Date().getFullYear()} GalyamStudio. כל הזכויות שמורות.
           </p>
         </section>
       </div>
     </ContentPage>
   );
 };
 
 export default TermsOfService;