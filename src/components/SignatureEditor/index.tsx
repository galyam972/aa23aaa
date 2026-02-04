import { useState, useRef } from 'react';
import { SignatureData, SignatureStyle, SignatureTemplate } from '@/types/signature';
import SignatureForm from './SignatureForm';
import StyleEditor from './StyleEditor';
import TemplateSelector from './TemplateSelector';
import SignaturePreview from './SignaturePreview';
import { Copy, Download, Check, Palette, User, Layout } from 'lucide-react';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { DEFAULT_SIGNATURE_DATA } from '@/lib/defaultSignatureData';

const templates: SignatureTemplate[] = [
  { id: 'classic', name: 'קלאסי', nameEn: 'Classic', description: 'עיצוב מסורתי ונקי', isPremium: false },
  { id: 'modern', name: 'מודרני', nameEn: 'Modern', description: 'עיצוב עדכני עם גרדיאנטים', isPremium: false },
  { id: 'minimal', name: 'מינימלי', nameEn: 'Minimal', description: 'פשוט ואלגנטי', isPremium: false },
  { id: 'creative', name: 'קריאטיבי', nameEn: 'Creative', description: 'בולט ויצירתי', isPremium: true },
  { id: 'corporate', name: 'עסקי', nameEn: 'Corporate', description: 'מקצועי ורציני', isPremium: true },
  { id: 'elegant', name: 'אלגנטי', nameEn: 'Elegant', description: 'מעודן וייחודי', isPremium: true },
];

const SignatureEditor = () => {
  const previewRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<'info' | 'style' | 'templates'>('info');
  const [copied, setCopied] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('classic');
  const [showAuthModal, setShowAuthModal] = useState(false);

  // TODO: Replace with actual auth state when authentication is implemented
  const isAuthenticated = false;

  // Initialize with default values so guests see a live preview immediately
  const [signatureData, setSignatureData] = useState<SignatureData>(DEFAULT_SIGNATURE_DATA);

  const [signatureStyle, setSignatureStyle] = useState<SignatureStyle>({
    primaryColor: '#7C3AED',
    secondaryColor: '#A78BFA',
    fontFamily: 'Heebo, sans-serif',
    fontSize: 'medium',
    layout: 'horizontal',
    showIcons: true,
    roundedImage: true,
    dividerStyle: 'line',
  });

  // Handle protected actions - show CTA for guests
  const handleProtectedAction = (_action: 'copy' | 'download' | 'save') => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return false;
    }
    // TODO: Check credits for specific actions when payment is fully implemented
    return true;
  };

  const handleCopy = async () => {
    if (!handleProtectedAction('copy')) return;
    
    if (previewRef.current) {
      try {
        const htmlContent = previewRef.current.innerHTML;
        await navigator.clipboard.write([
          new ClipboardItem({
            'text/html': new Blob([htmlContent], { type: 'text/html' }),
            'text/plain': new Blob([previewRef.current.innerText], { type: 'text/plain' }),
          }),
        ]);
        setCopied(true);
        toast.success('החתימה הועתקה! הדבק אותה באפליקציית המייל שלך');
        setTimeout(() => setCopied(false), 2000);
      } catch {
        // Fallback for browsers that don't support clipboard API
        const range = document.createRange();
        range.selectNodeContents(previewRef.current);
        const selection = window.getSelection();
        selection?.removeAllRanges();
        selection?.addRange(range);
        document.execCommand('copy');
        selection?.removeAllRanges();
        setCopied(true);
        toast.success('החתימה הועתקה!');
        setTimeout(() => setCopied(false), 2000);
      }
    }
  };

  const handleDownload = () => {
    if (!handleProtectedAction('download')) return;
    
    if (previewRef.current) {
      const htmlContent = `
<!DOCTYPE html>
<html dir="rtl" lang="he">
<head>
  <meta charset="UTF-8">
  <style>
    body { margin: 0; padding: 20px; font-family: ${signatureStyle.fontFamily}; }
  </style>
</head>
<body>
  ${previewRef.current.innerHTML}
</body>
</html>`;
      const blob = new Blob([htmlContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'email-signature.html';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success('החתימה הורדה בהצלחה!');
    }
  };

  const tabs = [
    { id: 'info', label: 'פרטים', icon: User },
    { id: 'style', label: 'עיצוב', icon: Palette },
    { id: 'templates', label: 'תבניות', icon: Layout },
  ] as const;

  return (
    <div className="min-h-screen gradient-hero">
      {/* Header */}
      <header className="py-6 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                <span className="text-xl font-bold text-white">✉️</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">SignaturePro</h1>
                <p className="text-xs text-muted-foreground">מחולל חתימות מייל מקצועי</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 pb-12">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Editor Panel */}
          <div className="card-glass p-6 animate-fade-in">
            {/* Tabs */}
            <div className="flex gap-2 mb-6 p-1 bg-secondary/50 rounded-xl">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-card shadow-sm text-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="max-h-[calc(100vh-300px)] overflow-y-auto px-1">
              {activeTab === 'info' && (
                <SignatureForm data={signatureData} onChange={setSignatureData} />
              )}
              {activeTab === 'style' && (
                <StyleEditor style={signatureStyle} onChange={setSignatureStyle} />
              )}
              {activeTab === 'templates' && (
                <TemplateSelector
                  templates={templates}
                  selectedTemplate={selectedTemplate}
                  onSelect={setSelectedTemplate}
                />
              )}
            </div>
          </div>

          {/* Preview Panel */}
          <div className="space-y-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="card-glass p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-foreground">תצוגה מקדימה</h2>
                <div className="flex gap-2">
                  <button
                    onClick={handleCopy}
                    className="btn-secondary flex items-center gap-2 text-sm py-2"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copied ? 'הועתק!' : 'העתק'}
                  </button>
                  <button
                    onClick={handleDownload}
                    className="btn-primary flex items-center gap-2 text-sm py-2"
                  >
                    <Download className="w-4 h-4" />
                    הורד
                  </button>
                </div>
              </div>

              {/* Preview Container */}
              <div className="bg-secondary/30 rounded-xl p-4">
                <div className="bg-white rounded-lg shadow-sm">
                  {/* Email Header Mock */}
                  <div className="border-b border-gray-100 p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-200" />
                      <div>
                        <div className="text-sm font-medium text-gray-800">
                          {signatureData.fullName || 'השם שלך'}
                        </div>
                        <div className="text-xs text-gray-500">אלי: recipient@email.com</div>
                      </div>
                    </div>
                  </div>

                  {/* Email Body Mock */}
                  <div className="p-4">
                    <div className="space-y-2 mb-4 text-sm text-gray-600" dir="rtl">
                      <p>שלום רב,</p>
                      <p>תודה על פנייתך. אשמח לעזור לך בכל שאלה.</p>
                      <p>בברכה,</p>
                    </div>

                    {/* Signature Preview */}
                    <div ref={previewRef} className="border-t border-gray-100 pt-4">
                      <SignaturePreview
                        data={signatureData}
                        style={signatureStyle}
                        templateId={selectedTemplate}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Help Text */}
            <div className="text-center text-sm text-muted-foreground">
              <p>💡 טיפ: לאחר ההעתקה, הדבק את החתימה בהגדרות המייל שלך</p>
            </div>
          </div>
        </div>
      </main>

      {/* Guest CTA Modal */}
      <Dialog open={showAuthModal} onOpenChange={setShowAuthModal}>
        <DialogContent className="sm:max-w-md text-center" dir="rtl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-center">
              🎨 החתימה שלך נראית מעולה!
            </DialogTitle>
            <DialogDescription className="text-center mt-2">
              כדי לשמור, להעתיק או להוריד את החתימה, יש להירשם או להתחבר.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="bg-accent/50 rounded-lg p-4 text-sm text-muted-foreground">
              <p className="font-medium text-foreground mb-2">✨ מה תקבלו?</p>
              <ul className="space-y-1 text-right">
                <li>• שמירת החתימה שיצרתם</li>
                <li>• העתקה ישירות למייל</li>
                <li>• הורדת קובץ HTML</li>
                <li>• גישה לכל התבניות</li>
              </ul>
            </div>
            <Button 
              className="w-full btn-primary"
              onClick={() => {
                setShowAuthModal(false);
                // TODO: Navigate to pricing/auth page
                toast.info('מעבר לדף ההרשמה...');
              }}
            >
              להרשמה כדי לשמור את החתימה
            </Button>
            <p className="text-xs text-muted-foreground">
              כבר רשומים? <button className="text-primary hover:underline">התחברו כאן</button>
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SignatureEditor;
