import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';

const footerLinks = {
  guides: {
    title: 'מדריכים ושאלות נפוצות',
    links: [
      { label: 'איך יוצרים חתימת מייל', href: '#' },
      { label: 'איך מוסיפים חתימה ל-Gmail', href: '#' },
      { label: 'איך מוסיפים חתימה ל-Outlook', href: '#' },
      { label: 'ניהול ועריכת חתימות', href: '#' },
      { label: 'שאלות נפוצות על חתימות מייל', href: '#' },
    ],
  },
  templates: {
    title: 'שימושים ותבניות',
    links: [
      { label: 'יצירת חתימה עסקית', href: '#' },
      { label: 'חתימה באנגלית', href: '#' },
      { label: 'חתימה בעברית', href: '#' },
      { label: 'חתימה עם לוגו', href: '#' },
      { label: 'חתימה עם רשתות חברתיות', href: '#' },
    ],
  },
  about: {
    title: 'SignaturePro',
    links: [
      { label: 'איך SignaturePro עובד', href: '#' },
      { label: 'למי המערכת מתאימה', href: '#' },
      { label: 'יתרונות חתימת מייל חכמה', href: '#' },
      { label: 'אבטחת מידע ופרטיות', href: '#' },
      { label: 'צור קשר', href: '#' },
    ],
  },
};

const Footer = () => {
  return (
    <footer className="border-t bg-secondary/30 mt-auto">
      {/* Knowledge Hub Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {/* Column 1 - Guides */}
          <div>
            <h3 className="font-bold text-foreground text-lg mb-4">
              {footerLinks.guides.title}
            </h3>
            <ul className="space-y-3">
              {footerLinks.guides.links.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2 - Templates */}
          <div>
            <h3 className="font-bold text-foreground text-lg mb-4">
              {footerLinks.templates.title}
            </h3>
            <ul className="space-y-3">
              {footerLinks.templates.links.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - About */}
          <div>
            <h3 className="font-bold text-foreground text-lg mb-4">
              {footerLinks.about.title}
            </h3>
            <ul className="space-y-3">
              {footerLinks.about.links.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border/50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Logo & Brand */}
            <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                <Mail className="w-4 h-4 text-white" />
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-foreground">SignaturePro</span>
                <span className="text-muted-foreground text-sm">by GalyamStudio</span>
              </div>
            </Link>

            {/* Legal Links */}
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">
                תנאי שימוש
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                מדיניות פרטיות
              </a>
            </div>

            {/* Copyright */}
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} כל הזכויות שמורות ל-SignaturePro
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
