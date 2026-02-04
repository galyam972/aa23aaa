import { SignatureData } from '@/types/signature';
import { User, Briefcase, Building2, Mail, Phone, Globe, Upload, ChevronDown, ChevronUp, X } from 'lucide-react';
import { useRef, useState } from 'react';
import { SOCIAL_NETWORKS, SocialNetworkKey } from '@/lib/socialNetworks';
import { formatSocialDisplay } from '@/lib/formatSocialDisplay';

interface SignatureFormProps {
  data: SignatureData;
  onChange: (data: SignatureData) => void;
}

const SignatureForm = ({ data, onChange }: SignatureFormProps) => {
  const profileInputRef = useRef<HTMLInputElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);
  const [showAllSocials, setShowAllSocials] = useState(false);
  const [dragOverProfile, setDragOverProfile] = useState(false);
  const [dragOverLogo, setDragOverLogo] = useState(false);

  const handleChange = (field: keyof SignatureData, value: string) => {
    onChange({ ...data, [field]: value });
  };

  const handleImageUpload = (field: 'profileImage' | 'companyLogo', e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processImageFile(field, file);
    }
  };

  const processImageFile = (field: 'profileImage' | 'companyLogo', file: File) => {
    if (!file.type.startsWith('image/')) return;
    
    const reader = new FileReader();
    reader.onloadend = () => {
      handleChange(field, reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent, field: 'profileImage' | 'companyLogo') => {
    e.preventDefault();
    e.stopPropagation();
    if (field === 'profileImage') {
      setDragOverProfile(true);
    } else {
      setDragOverLogo(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent, field: 'profileImage' | 'companyLogo') => {
    e.preventDefault();
    e.stopPropagation();
    if (field === 'profileImage') {
      setDragOverProfile(false);
    } else {
      setDragOverLogo(false);
    }
  };

  const handleDrop = (e: React.DragEvent, field: 'profileImage' | 'companyLogo') => {
    e.preventDefault();
    e.stopPropagation();
    setDragOverProfile(false);
    setDragOverLogo(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processImageFile(field, file);
    }
  };

  const inputGroups = [
    {
      title: 'פרטים אישיים',
      fields: [
        { key: 'fullName', label: 'שם מלא', icon: User, placeholder: 'ישראל ישראלי' },
        { key: 'jobTitle', label: 'תפקיד', icon: Briefcase, placeholder: 'מנהל שיווק' },
        { key: 'company', label: 'חברה', icon: Building2, placeholder: 'חברת הייטק בע"מ' },
      ],
    },
    {
      title: 'פרטי קשר',
      fields: [
        { key: 'email', label: 'אימייל', icon: Mail, placeholder: 'example@email.com', type: 'email', dir: 'ltr' },
        { key: 'phone', label: 'טלפון', icon: Phone, placeholder: '050-1234567', type: 'tel', dir: 'ltr' },
        { key: 'website', label: 'אתר', icon: Globe, placeholder: 'www.example.com', dir: 'ltr' },
      ],
    },
  ];

  // Show first 7 social networks by default, rest when expanded
  const visibleSocials = showAllSocials ? SOCIAL_NETWORKS : SOCIAL_NETWORKS.slice(0, 7);
  const hiddenCount = SOCIAL_NETWORKS.length - 7;

  return (
    <div className="space-y-6">
      {/* Image Upload Section */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-foreground">תמונות</h3>
        <div className="grid grid-cols-2 gap-4">
          {/* Profile Image */}
          <div className="relative">
            <div 
              onClick={() => profileInputRef.current?.click()}
              onDragOver={(e) => handleDragOver(e, 'profileImage')}
              onDragLeave={(e) => handleDragLeave(e, 'profileImage')}
              onDrop={(e) => handleDrop(e, 'profileImage')}
              className={`group cursor-pointer border-2 border-dashed rounded-xl p-4 text-center transition-all duration-200 ${
                dragOverProfile 
                  ? 'border-primary bg-primary/10 scale-105' 
                  : 'border-border hover:border-primary hover:bg-accent/50'
              }`}
            >
              <input
                ref={profileInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload('profileImage', e)}
                className="hidden"
              />
              {data.profileImage ? (
                <div className="relative">
                  <img src={data.profileImage} alt="Profile" className="w-16 h-16 rounded-full mx-auto object-cover" />
                  <span className="text-xs text-muted-foreground mt-2 block">
                    {dragOverProfile ? 'שחרר להחלפה' : 'לחץ או גרור להחלפה'}
                  </span>
                </div>
              ) : (
                <>
                  <div className={`w-12 h-12 rounded-full mx-auto flex items-center justify-center transition-colors ${
                    dragOverProfile ? 'bg-primary/20' : 'bg-accent group-hover:bg-primary/10'
                  }`}>
                    <Upload className={`w-5 h-5 ${dragOverProfile ? 'text-primary' : 'text-muted-foreground group-hover:text-primary'}`} />
                  </div>
                  <span className="text-xs text-muted-foreground mt-2 block">
                    {dragOverProfile ? 'שחרר כאן' : 'תמונת פרופיל'}
                  </span>
                </>
              )}
            </div>
            {data.profileImage && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleChange('profileImage', '');
                }}
                className="absolute -top-2 -left-2 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center hover:bg-destructive/90 transition-colors shadow-sm"
                title="הסר תמונה"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Company Logo */}
          <div className="relative">
            <div 
              onClick={() => logoInputRef.current?.click()}
              onDragOver={(e) => handleDragOver(e, 'companyLogo')}
              onDragLeave={(e) => handleDragLeave(e, 'companyLogo')}
              onDrop={(e) => handleDrop(e, 'companyLogo')}
              className={`group cursor-pointer border-2 border-dashed rounded-xl p-4 text-center transition-all duration-200 ${
                dragOverLogo 
                  ? 'border-primary bg-primary/10 scale-105' 
                  : 'border-border hover:border-primary hover:bg-accent/50'
              }`}
            >
              <input
                ref={logoInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload('companyLogo', e)}
                className="hidden"
              />
              {data.companyLogo ? (
                <div className="relative">
                  <img src={data.companyLogo} alt="Logo" className="w-16 h-16 mx-auto object-contain" />
                  <span className="text-xs text-muted-foreground mt-2 block">
                    {dragOverLogo ? 'שחרר להחלפה' : 'לחץ או גרור להחלפה'}
                  </span>
                </div>
              ) : (
                <>
                  <div className={`w-12 h-12 rounded-lg mx-auto flex items-center justify-center transition-colors ${
                    dragOverLogo ? 'bg-primary/20' : 'bg-accent group-hover:bg-primary/10'
                  }`}>
                    <Building2 className={`w-5 h-5 ${dragOverLogo ? 'text-primary' : 'text-muted-foreground group-hover:text-primary'}`} />
                  </div>
                  <span className="text-xs text-muted-foreground mt-2 block">
                    {dragOverLogo ? 'שחרר כאן' : 'לוגו חברה'}
                  </span>
                </>
              )}
            </div>
            {data.companyLogo && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleChange('companyLogo', '');
                }}
                className="absolute -top-2 -left-2 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center hover:bg-destructive/90 transition-colors shadow-sm"
                title="הסר לוגו"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Input Groups */}
      {inputGroups.map((group) => (
        <div key={group.title} className="space-y-3">
          <h3 className="text-sm font-semibold text-foreground">{group.title}</h3>
          <div className="space-y-2">
            {group.fields.map((field) => (
              <div key={field.key} className="relative">
                <field.icon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type={field.type || 'text'}
                  value={data[field.key as keyof SignatureData]}
                  onChange={(e) => handleChange(field.key as keyof SignatureData, e.target.value)}
                  placeholder={field.placeholder}
                  dir={field.dir || 'rtl'}
                  className="input-styled pr-10"
                />
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Social Networks Section */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-foreground">רשתות חברתיות</h3>
        <div className="space-y-2">
          {visibleSocials.map((social) => {
            const IconComponent = social.icon;
            const currentValue = data[social.key as SocialNetworkKey] || '';
            const displayValue = formatSocialDisplay(social.key, currentValue);
            
            return (
              <div 
                key={social.key} 
                className="flex items-center gap-2 min-h-[48px] px-3 py-2 rounded-xl border border-input bg-background transition-all duration-200 focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary"
              >
                {/* Icon - Fixed width, always centered */}
                <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center text-muted-foreground">
                  <IconComponent size={18} />
                </div>
                
                {/* Input - Flexible, with proper overflow handling */}
                <input
                  type="text"
                  value={currentValue}
                  onChange={(e) => handleChange(social.key as keyof SignatureData, e.target.value)}
                  placeholder={social.placeholder}
                  dir="ltr"
                  className="flex-1 min-w-0 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground text-sm overflow-hidden text-ellipsis whitespace-nowrap"
                />
                
                {/* Label - Fixed width on left side */}
                <span className="flex-shrink-0 text-xs text-muted-foreground px-2 py-1 bg-secondary/50 rounded-md">
                  {social.labelHe}
                </span>
              </div>
            );
          })}
        </div>
        
        {/* Toggle button for more social networks */}
        {hiddenCount > 0 && (
          <button
            type="button"
            onClick={() => setShowAllSocials(!showAllSocials)}
            className="w-full flex items-center justify-center gap-2 py-2 text-sm text-primary hover:text-primary/80 transition-colors"
          >
            {showAllSocials ? (
              <>
                <ChevronUp className="w-4 h-4" />
                הצג פחות
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4" />
                עוד {hiddenCount} רשתות חברתיות
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default SignatureForm;
