 import ContentPage from '@/components/ContentPage';
 
 const PrivacyPolicy = () => {
   return (
     <ContentPage
       title="מדיניות פרטיות"
       description="מדיניות הפרטיות של SignaturePro - כיצד אנו שומרים על המידע שלכם"
       keywords="מדיניות פרטיות, SignaturePro, הגנת מידע, פרטיות, GDPR"
       showCTA={false}
     >
       <div className="space-y-8 text-right">
         <section>
           <p className="text-muted-foreground mb-4">
             עודכן לאחרונה: פברואר 2025
           </p>
           <p>
             ב-SignaturePro (מופעל על ידי GalyamStudio) אנו מחויבים להגנה על פרטיותך. מדיניות פרטיות זו מסבירה כיצד אנו אוספים, משתמשים, שומרים ומגנים על המידע שלך בעת השימוש בשירות שלנו.
           </p>
         </section>
 
         <section>
           <h2 className="text-2xl font-bold mb-4">1. מידע שאנו אוספים</h2>
           
           <h3 className="text-xl font-semibold mb-3">1.1 מידע שאתה מספק לנו</h3>
           <ul className="list-disc list-inside space-y-2 mr-4 mb-4">
             <li><strong>פרטי הרשמה:</strong> שם, כתובת דוא"ל, סיסמה (מוצפנת).</li>
             <li><strong>פרטי פרופיל:</strong> שם תצוגה, תמונת פרופיל (אופציונלי).</li>
             <li><strong>תוכן חתימות:</strong> מידע שאתה מזין לחתימות שלך (שם, תפקיד, טלפון, כתובת, לוגו ותמונות).</li>
             <li><strong>פרטי תשלום:</strong> מעובדים באמצעות ספקי תשלום מאובטחים - איננו שומרים פרטי כרטיסי אשראי.</li>
             <li><strong>תקשורת:</strong> הודעות ששלחת אלינו דרך טפסי יצירת קשר.</li>
           </ul>
 
           <h3 className="text-xl font-semibold mb-3">1.2 מידע שנאסף אוטומטית</h3>
           <ul className="list-disc list-inside space-y-2 mr-4">
             <li><strong>נתוני שימוש:</strong> עמודים שנצפו, זמן שהייה, פעולות בשירות.</li>
             <li><strong>מידע טכני:</strong> סוג דפדפן, מערכת הפעלה, כתובת IP, סוג מכשיר.</li>
             <li><strong>עוגיות (Cookies):</strong> קבצים קטנים לשיפור חוויית השימוש (ראה סעיף 6).</li>
           </ul>
         </section>
 
         <section>
           <h2 className="text-2xl font-bold mb-4">2. כיצד אנו משתמשים במידע</h2>
           <p className="mb-3">אנו משתמשים במידע שנאסף למטרות הבאות:</p>
           <ul className="list-disc list-inside space-y-2 mr-4">
             <li><strong>מתן השירות:</strong> יצירת ושמירת חתימות, ניהול חשבון המשתמש.</li>
             <li><strong>שיפור השירות:</strong> ניתוח שימוש, פיתוח תכונות חדשות, תיקון באגים.</li>
             <li><strong>תקשורת:</strong> שליחת עדכונים חשובים, מענה לפניות, הודעות על שינויים בשירות.</li>
             <li><strong>אבטחה:</strong> זיהוי ומניעת הונאות, הגנה על חשבונות משתמשים.</li>
             <li><strong>עמידה בחוק:</strong> מילוי דרישות חוקיות ורגולטוריות.</li>
             <li><strong>שיווק:</strong> משלוח ניוזלטר ועדכונים (רק אם הסכמת לקבלם).</li>
           </ul>
         </section>
 
         <section>
           <h2 className="text-2xl font-bold mb-4">3. שיתוף מידע עם צדדים שלישיים</h2>
           <p className="mb-3">
             אנו לא מוכרים את המידע האישי שלך. אנו עשויים לשתף מידע רק במקרים הבאים:
           </p>
           <ul className="list-disc list-inside space-y-2 mr-4">
             <li><strong>ספקי שירות:</strong> חברות המסייעות לנו בתפעול השירות (אחסון, תשלומים, דוא"ל) - מחויבות בהסכמי סודיות.</li>
             <li><strong>דרישה חוקית:</strong> כאשר נדרשים על פי חוק, צו בית משפט או רשות מוסמכת.</li>
             <li><strong>הגנה על זכויות:</strong> למניעת הונאה או הגנה על זכויותינו וזכויות משתמשים אחרים.</li>
             <li><strong>העברת עסק:</strong> במקרה של מיזוג, רכישה או מכירת נכסים (עם הודעה מוקדמת).</li>
           </ul>
         </section>
 
         <section>
           <h2 className="text-2xl font-bold mb-4">4. אחסון ואבטחת מידע</h2>
           <h3 className="text-xl font-semibold mb-3">4.1 אחסון</h3>
           <p className="mb-3">
             המידע שלך מאוחסן בשרתים מאובטחים. אנו שומרים את המידע כל עוד חשבונך פעיל ולתקופה סבירה לאחר סגירתו לצרכים חוקיים.
           </p>
           <h3 className="text-xl font-semibold mb-3">4.2 אבטחה</h3>
           <p className="mb-3">אנו מיישמים אמצעי אבטחה מתקדמים:</p>
           <ul className="list-disc list-inside space-y-2 mr-4">
             <li>הצפנת נתונים בהעברה (SSL/TLS) ובאחסון.</li>
             <li>גיבויים אוטומטיים ושרידות נתונים.</li>
             <li>הגבלת גישה לעובדים מורשים בלבד.</li>
             <li>ניטור רציף לאיתור חדירות ואיומים.</li>
             <li>סיסמאות מוצפנות בשיטת hash מתקדמת.</li>
           </ul>
           <p className="mt-3 text-muted-foreground">
             חשוב לציין שאין מערכת אבטחה מושלמת. אנו עושים מאמצים סבירים להגן על המידע שלך.
           </p>
         </section>
 
         <section>
           <h2 className="text-2xl font-bold mb-4">5. הזכויות שלך</h2>
           <p className="mb-3">על פי חוק הגנת הפרטיות ורגולציות בינלאומיות, יש לך את הזכויות הבאות:</p>
           <ul className="list-disc list-inside space-y-2 mr-4">
             <li><strong>זכות גישה:</strong> לבקש עותק של המידע האישי שלך.</li>
             <li><strong>זכות תיקון:</strong> לתקן מידע לא מדויק או לא שלם.</li>
             <li><strong>זכות מחיקה:</strong> לבקש מחיקת המידע שלך ("הזכות להישכח").</li>
             <li><strong>זכות הגבלה:</strong> להגביל את העיבוד של המידע שלך.</li>
             <li><strong>זכות התנגדות:</strong> להתנגד לעיבוד לצרכי שיווק ישיר.</li>
             <li><strong>זכות ניידות:</strong> לקבל את המידע שלך בפורמט מובנה.</li>
             <li><strong>ביטול הסכמה:</strong> לבטל הסכמה שניתנה בכל עת.</li>
           </ul>
           <p className="mt-4">
             למימוש זכויותיך, פנה אלינו בדוא"ל: privacy@signaturepro.co.il
           </p>
         </section>
 
         <section>
           <h2 className="text-2xl font-bold mb-4">6. עוגיות (Cookies)</h2>
           <h3 className="text-xl font-semibold mb-3">6.1 סוגי עוגיות בהן אנו משתמשים</h3>
           <ul className="list-disc list-inside space-y-2 mr-4 mb-4">
             <li><strong>עוגיות הכרחיות:</strong> נדרשות לתפקוד בסיסי של האתר (כניסה לחשבון, אבטחה).</li>
             <li><strong>עוגיות ביצועים:</strong> לניתוח שימוש ושיפור השירות (Google Analytics).</li>
             <li><strong>עוגיות פונקציונליות:</strong> לזכירת העדפות (שפה, הגדרות תצוגה).</li>
           </ul>
           <h3 className="text-xl font-semibold mb-3">6.2 ניהול עוגיות</h3>
           <p>
             ניתן לנהל או לחסום עוגיות דרך הגדרות הדפדפן שלך. שים לב שחסימת עוגיות הכרחיות עלולה לפגוע בתפקוד השירות.
           </p>
         </section>
 
         <section>
           <h2 className="text-2xl font-bold mb-4">7. קטינים</h2>
           <p>
             השירות שלנו אינו מיועד לילדים מתחת לגיל 18. איננו אוספים ביודעין מידע אישי מקטינים. אם נודע לנו שאספנו מידע מקטין, נמחק אותו באופן מיידי.
           </p>
         </section>
 
         <section>
           <h2 className="text-2xl font-bold mb-4">8. קישורים לאתרים חיצוניים</h2>
           <p>
             השירות עשוי להכיל קישורים לאתרים חיצוניים. אין לנו שליטה על מדיניות הפרטיות שלהם ואיננו אחראים לפרקטיקות שלהם. מומלץ לקרוא את מדיניות הפרטיות של כל אתר שאתה מבקר בו.
           </p>
         </section>
 
         <section>
           <h2 className="text-2xl font-bold mb-4">9. העברת מידע בינלאומית</h2>
           <p>
             המידע שלך עשוי להיות מאוחסן ומעובד בשרתים הממוקמים מחוץ לישראל. במקרים אלה, אנו מבטיחים רמת הגנה נאותה בהתאם לחוקי הגנת המידע החלים.
           </p>
         </section>
 
         <section>
           <h2 className="text-2xl font-bold mb-4">10. שינויים במדיניות</h2>
           <p>
             אנו עשויים לעדכן מדיניות זו מעת לעת. שינויים מהותיים יפורסמו באתר ו/או ישלחו אליך בדוא"ל. המשך השימוש בשירות לאחר השינויים מהווה הסכמה למדיניות המעודכנת.
           </p>
         </section>
 
         <section>
           <h2 className="text-2xl font-bold mb-4">11. יצירת קשר בנושאי פרטיות</h2>
           <p className="mb-3">
             לשאלות, בקשות או תלונות בנוגע למדיניות פרטיות זו או לטיפול במידע שלך:
           </p>
           <ul className="list-none space-y-2">
             <li><strong>דוא"ל:</strong> privacy@signaturepro.co.il</li>
             <li><strong>דוא"ל תמיכה:</strong> support@signaturepro.co.il</li>
             <li><strong>אתר:</strong> www.signaturepro.co.il</li>
           </ul>
           <p className="mt-4 text-muted-foreground">
             אנו מתחייבים לטפל בכל פנייה תוך 30 ימים.
           </p>
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
 
 export default PrivacyPolicy;