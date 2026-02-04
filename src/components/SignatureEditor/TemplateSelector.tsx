import { SignatureTemplate } from '@/types/signature';
import { Crown, Check } from 'lucide-react';

interface TemplateSelectorProps {
  templates: SignatureTemplate[];
  selectedTemplate: string;
  onSelect: (templateId: string) => void;
}

const TemplateSelector = ({ templates, selectedTemplate, onSelect }: TemplateSelectorProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-foreground">בחר תבנית</h3>
      <div className="grid grid-cols-2 gap-3">
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => onSelect(template.id)}
            className={`relative group p-4 rounded-xl border-2 transition-all duration-200 text-right ${
              selectedTemplate === template.id
                ? 'border-primary bg-accent/50'
                : 'border-border hover:border-primary/50 hover:bg-accent/30'
            }`}
          >
            {/* Selection indicator */}
            {selectedTemplate === template.id && (
              <div className="absolute top-2 left-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                <Check className="w-3 h-3 text-primary-foreground" />
              </div>
            )}

            {/* Premium badge */}
            {template.isPremium && (
              <div className="absolute top-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-medium">
                <Crown className="w-3 h-3" />
                <span>פרימיום</span>
              </div>
            )}

            {/* Template preview placeholder */}
            <div className="aspect-[4/3] bg-secondary/50 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
              <TemplatePreview templateId={template.id} />
            </div>

            <h4 className="font-medium text-sm text-foreground">{template.name}</h4>
            <p className="text-xs text-muted-foreground mt-0.5">{template.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

// Mini preview of each template style
const TemplatePreview = ({ templateId }: { templateId: string }) => {
  const previewStyles: Record<string, React.ReactNode> = {
    classic: (
      <div className="p-3 text-right w-full">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary/20" />
          <div className="flex-1">
            <div className="h-2 w-16 bg-foreground/20 rounded" />
            <div className="h-1.5 w-12 bg-muted-foreground/20 rounded mt-1" />
          </div>
        </div>
        <div className="mt-2 space-y-1">
          <div className="h-1 w-20 bg-muted-foreground/20 rounded" />
          <div className="h-1 w-16 bg-muted-foreground/20 rounded" />
        </div>
      </div>
    ),
    modern: (
      <div className="p-3 w-full">
        <div className="flex gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/30 to-primary/10" />
          <div className="flex-1 text-right">
            <div className="h-2 w-14 bg-foreground/20 rounded" />
            <div className="h-1.5 w-10 bg-primary/30 rounded mt-1" />
            <div className="flex gap-1 mt-2">
              <div className="w-3 h-3 rounded-full bg-muted-foreground/20" />
              <div className="w-3 h-3 rounded-full bg-muted-foreground/20" />
              <div className="w-3 h-3 rounded-full bg-muted-foreground/20" />
            </div>
          </div>
        </div>
      </div>
    ),
    minimal: (
      <div className="p-3 w-full text-right">
        <div className="h-2 w-20 bg-foreground/20 rounded" />
        <div className="h-0.5 w-full bg-primary/20 rounded my-2" />
        <div className="space-y-1">
          <div className="h-1 w-16 bg-muted-foreground/20 rounded" />
          <div className="h-1 w-14 bg-muted-foreground/20 rounded" />
        </div>
      </div>
    ),
    creative: (
      <div className="p-3 w-full">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-lg" />
          <div className="relative flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary/40 to-primary/20 rotate-3" />
            <div className="text-right">
              <div className="h-2 w-14 bg-foreground/20 rounded" />
              <div className="h-1.5 w-10 bg-muted-foreground/20 rounded mt-1" />
            </div>
          </div>
        </div>
      </div>
    ),
    corporate: (
      <div className="p-3 w-full border-r-2 border-primary/30">
        <div className="text-right">
          <div className="h-2 w-18 bg-foreground/20 rounded" />
          <div className="h-1.5 w-14 bg-muted-foreground/20 rounded mt-1" />
          <div className="h-1 w-full bg-border/50 rounded my-2" />
          <div className="flex justify-end gap-4">
            <div className="h-1 w-12 bg-muted-foreground/20 rounded" />
            <div className="h-1 w-12 bg-muted-foreground/20 rounded" />
          </div>
        </div>
      </div>
    ),
    elegant: (
      <div className="p-3 w-full text-center">
        <div className="w-8 h-8 rounded-full bg-primary/20 mx-auto border-2 border-primary/30" />
        <div className="h-2 w-16 bg-foreground/20 rounded mx-auto mt-2" />
        <div className="h-1.5 w-12 bg-muted-foreground/20 rounded mx-auto mt-1" />
        <div className="flex justify-center gap-2 mt-2">
          <div className="w-2 h-2 rounded-full bg-primary/30" />
          <div className="w-2 h-2 rounded-full bg-primary/30" />
          <div className="w-2 h-2 rounded-full bg-primary/30" />
        </div>
      </div>
    ),
  };

  return previewStyles[templateId] || previewStyles.classic;
};

export default TemplateSelector;
