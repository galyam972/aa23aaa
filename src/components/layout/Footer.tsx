import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t bg-background py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Mail className="w-5 h-5 text-primary" />
            <span className="font-semibold">SignaturePro</span>
            <span className="text-muted-foreground">by GalyamStudio</span>
          </Link>
          
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link to="/auth" className="hover:text-foreground transition-colors">
              התחברות
            </Link>
            <Link to="/editor" className="hover:text-foreground transition-colors">
              עורך החתימות
            </Link>
          </div>
          
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} כל הזכויות שמורות
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
