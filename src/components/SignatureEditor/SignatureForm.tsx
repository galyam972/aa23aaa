import { SignatureData } from '@/types/signature';
import { User, Briefcase, Building2, Mail, Phone, Globe, Linkedin, Twitter, Facebook, Instagram, Upload } from 'lucide-react';
import { useRef } from 'react';

interface SignatureFormProps {
  data: SignatureData;
  onChange: (data: SignatureData) => void;
}

const SignatureForm = ({ data, onChange }: SignatureFormProps) => {
  const profileInputRef = useRef<HTMLInputElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (field: keyof SignatureData, value: string) => {
    onChange({ ...data, [field]: value });
  };

  const handleImageUpload = (field: 'profileImage' | 'companyLogo', e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleChange(field, reader.result as string);
      };
      reader.readAsDataURL(file);
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
    {
      title: 'רשתות חברתיות',
      fields: [
        { key: 'linkedin', label: 'LinkedIn', icon: Linkedin, placeholder: 'linkedin.com/in/username', dir: 'ltr' },
        { key: 'twitter', label: 'Twitter', icon: Twitter, placeholder: '@username', dir: 'ltr' },
        { key: 'facebook', label: 'Facebook', icon: Facebook, placeholder: 'facebook.com/username', dir: 'ltr' },
        { key: 'instagram', label: 'Instagram', icon: Instagram, placeholder: '@username', dir: 'ltr' },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      {/* Image Upload Section */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-foreground">תמונות</h3>
        <div className="grid grid-cols-2 gap-4">
          {/* Profile Image */}
          <div 
            onClick={() => profileInputRef.current?.click()}
            className="group cursor-pointer border-2 border-dashed border-border rounded-xl p-4 text-center hover:border-primary hover:bg-accent/50 transition-all duration-200"
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
                <span className="text-xs text-muted-foreground mt-2 block">לחץ להחלפה</span>
              </div>
            ) : (
              <>
                <div className="w-12 h-12 rounded-full bg-accent mx-auto flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                  <Upload className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
                </div>
                <span className="text-xs text-muted-foreground mt-2 block">תמונת פרופיל</span>
              </>
            )}
          </div>

          {/* Company Logo */}
          <div 
            onClick={() => logoInputRef.current?.click()}
            className="group cursor-pointer border-2 border-dashed border-border rounded-xl p-4 text-center hover:border-primary hover:bg-accent/50 transition-all duration-200"
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
                <span className="text-xs text-muted-foreground mt-2 block">לחץ להחלפה</span>
              </div>
            ) : (
              <>
                <div className="w-12 h-12 rounded-lg bg-accent mx-auto flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                  <Building2 className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
                </div>
                <span className="text-xs text-muted-foreground mt-2 block">לוגו חברה</span>
              </>
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
    </div>
  );
};

export default SignatureForm;
