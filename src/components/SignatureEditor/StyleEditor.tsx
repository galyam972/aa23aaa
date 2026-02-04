import { SignatureStyle } from '@/types/signature';
import { Palette, Type, Layout, Circle, Square, Minus, MoreHorizontal } from 'lucide-react';

interface StyleEditorProps {
  style: SignatureStyle;
  onChange: (style: SignatureStyle) => void;
}

const colorPresets = [
  { primary: '#7C3AED', secondary: '#A78BFA', name: 'סגול' },
  { primary: '#2563EB', secondary: '#60A5FA', name: 'כחול' },
  { primary: '#059669', secondary: '#34D399', name: 'ירוק' },
  { primary: '#DC2626', secondary: '#F87171', name: 'אדום' },
  { primary: '#D97706', secondary: '#FBBF24', name: 'כתום' },
  { primary: '#0891B2', secondary: '#22D3EE', name: 'טורקיז' },
  { primary: '#7C3AED', secondary: '#EC4899', name: 'גרדיאנט' },
  { primary: '#1F2937', secondary: '#6B7280', name: 'אפור' },
];

const fontOptions = [
  { value: 'Heebo, sans-serif', label: 'Heebo' },
  { value: 'Arial, sans-serif', label: 'Arial' },
  { value: 'Georgia, serif', label: 'Georgia' },
  { value: 'Verdana, sans-serif', label: 'Verdana' },
];

const StyleEditor = ({ style, onChange }: StyleEditorProps) => {
  const handleChange = <K extends keyof SignatureStyle>(key: K, value: SignatureStyle[K]) => {
    onChange({ ...style, [key]: value });
  };

  return (
    <div className="space-y-6">
      {/* Colors */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Palette className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">צבעים</h3>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {colorPresets.map((preset, index) => (
            <button
              key={index}
              onClick={() => {
                handleChange('primaryColor', preset.primary);
                handleChange('secondaryColor', preset.secondary);
              }}
              className={`group relative aspect-square rounded-xl overflow-hidden transition-all duration-200 hover:scale-105 ${
                style.primaryColor === preset.primary ? 'ring-2 ring-primary ring-offset-2' : ''
              }`}
              title={preset.name}
            >
              <div 
                className="absolute inset-0"
                style={{ 
                  background: `linear-gradient(135deg, ${preset.primary} 0%, ${preset.secondary} 100%)` 
                }}
              />
            </button>
          ))}
        </div>
        
        {/* Custom Color Picker */}
        <div className="flex gap-3 mt-3">
          <div className="flex-1">
            <label className="text-xs text-muted-foreground block mb-1">צבע ראשי</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={style.primaryColor}
                onChange={(e) => handleChange('primaryColor', e.target.value)}
                className="w-10 h-10 rounded-lg cursor-pointer border-0 p-0"
              />
              <input
                type="text"
                value={style.primaryColor}
                onChange={(e) => handleChange('primaryColor', e.target.value)}
                className="input-styled text-xs flex-1"
                dir="ltr"
              />
            </div>
          </div>
          <div className="flex-1">
            <label className="text-xs text-muted-foreground block mb-1">צבע משני</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={style.secondaryColor}
                onChange={(e) => handleChange('secondaryColor', e.target.value)}
                className="w-10 h-10 rounded-lg cursor-pointer border-0 p-0"
              />
              <input
                type="text"
                value={style.secondaryColor}
                onChange={(e) => handleChange('secondaryColor', e.target.value)}
                className="input-styled text-xs flex-1"
                dir="ltr"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Font */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Type className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">גופן</h3>
        </div>
        <select
          value={style.fontFamily}
          onChange={(e) => handleChange('fontFamily', e.target.value)}
          className="input-styled"
        >
          {fontOptions.map((font) => (
            <option key={font.value} value={font.value}>
              {font.label}
            </option>
          ))}
        </select>

        {/* Font Size */}
        <div className="flex gap-2">
          {(['small', 'medium', 'large'] as const).map((size) => (
            <button
              key={size}
              onClick={() => handleChange('fontSize', size)}
              className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                style.fontSize === size
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
            >
              {size === 'small' ? 'קטן' : size === 'medium' ? 'בינוני' : 'גדול'}
            </button>
          ))}
        </div>
      </div>

      {/* Layout */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Layout className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">תצוגה</h3>
        </div>
        <div className="flex gap-2">
          {(['horizontal', 'vertical', 'compact'] as const).map((layout) => (
            <button
              key={layout}
              onClick={() => handleChange('layout', layout)}
              className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                style.layout === layout
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
            >
              {layout === 'horizontal' ? 'אופקי' : layout === 'vertical' ? 'אנכי' : 'קומפקטי'}
            </button>
          ))}
        </div>
      </div>

      {/* Image Style */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-foreground">סגנון תמונה</h3>
        <div className="flex gap-2">
          <button
            onClick={() => handleChange('roundedImage', true)}
            className={`flex-1 py-3 rounded-lg flex items-center justify-center gap-2 transition-all ${
              style.roundedImage
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
            }`}
          >
            <Circle className="w-4 h-4" />
            <span className="text-sm">עגול</span>
          </button>
          <button
            onClick={() => handleChange('roundedImage', false)}
            className={`flex-1 py-3 rounded-lg flex items-center justify-center gap-2 transition-all ${
              !style.roundedImage
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
            }`}
          >
            <Square className="w-4 h-4" />
            <span className="text-sm">מרובע</span>
          </button>
        </div>
      </div>

      {/* Divider Style */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-foreground">מפריד</h3>
        <div className="flex gap-2">
          {([
            { value: 'line', icon: Minus, label: 'קו' },
            { value: 'dots', icon: MoreHorizontal, label: 'נקודות' },
            { value: 'none', icon: Square, label: 'ללא' },
          ] as const).map((divider) => (
            <button
              key={divider.value}
              onClick={() => handleChange('dividerStyle', divider.value)}
              className={`flex-1 py-3 rounded-lg flex items-center justify-center gap-2 transition-all ${
                style.dividerStyle === divider.value
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
            >
              <divider.icon className="w-4 h-4" />
              <span className="text-sm">{divider.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Show Icons Toggle */}
      <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-xl">
        <span className="text-sm font-medium">הצג אייקונים</span>
        <button
          onClick={() => handleChange('showIcons', !style.showIcons)}
          className={`relative w-12 h-6 rounded-full transition-colors ${
            style.showIcons ? 'bg-primary' : 'bg-muted'
          }`}
        >
          <span
            className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
              style.showIcons ? 'right-1' : 'right-7'
            }`}
          />
        </button>
      </div>
    </div>
  );
};

export default StyleEditor;
