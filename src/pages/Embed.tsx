import { useEffect } from 'react';
import SignatureEditor from '@/components/SignatureEditor';

const Embed = () => {
  // Send height to parent window for responsive iframe
  useEffect(() => {
    const sendHeight = () => {
      const height = document.body.scrollHeight;
      window.parent.postMessage({ type: 'lovable-embed-resize', height }, '*');
    };

    // Initial send
    sendHeight();
    
    // Send on resize
    window.addEventListener('resize', sendHeight);
    
    // Use ResizeObserver for dynamic content changes
    const observer = new ResizeObserver(sendHeight);
    observer.observe(document.body);

    // Send periodically for first few seconds to catch dynamic content
    const intervals = [100, 500, 1000, 2000, 5000];
    const timeouts = intervals.map(ms => setTimeout(sendHeight, ms));

    return () => {
      window.removeEventListener('resize', sendHeight);
      observer.disconnect();
      timeouts.forEach(clearTimeout);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white" dir="rtl">
      <div className="container mx-auto px-4 py-6">
        {/* Branding header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            מחולל חתימות מייל
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            צור חתימה מקצועית בקלות
          </p>
        </div>

        {/* Editor */}
        <SignatureEditor />

        {/* Footer credit */}
        <div className="text-center mt-6 pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground">
            מופעל על ידי{' '}
            <a 
              href="https://aa23aaa.lovable.app" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              GalyamStudio
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Embed;
