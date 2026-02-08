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
      <SignatureEditor />
    </div>
  );
};

export default Embed;
