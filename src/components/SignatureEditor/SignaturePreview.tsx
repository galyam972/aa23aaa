import { SignatureData, SignatureStyle } from '@/types/signature';
import { Mail, Phone, Globe } from 'lucide-react';
import { SOCIAL_NETWORKS, buildSocialUrl, SocialNetworkKey } from '@/lib/socialNetworks';

interface SignaturePreviewProps {
  data: SignatureData;
  style: SignatureStyle;
  templateId: string;
}

const SignaturePreview = ({ data, style, templateId }: SignaturePreviewProps) => {
  const fontSize = {
    small: { name: '14px', title: '12px', text: '11px' },
    medium: { name: '16px', title: '13px', text: '12px' },
    large: { name: '18px', title: '14px', text: '13px' },
  };

  const currentSize = fontSize[style.fontSize];

  const renderDivider = () => {
    if (style.dividerStyle === 'none') return null;
    if (style.dividerStyle === 'dots') {
      return (
        <div className="flex gap-1 my-2">
          <span style={{ color: style.primaryColor }}>•</span>
          <span style={{ color: style.primaryColor }}>•</span>
          <span style={{ color: style.primaryColor }}>•</span>
        </div>
      );
    }
    return (
      <div
        className="my-2"
        style={{
          height: '1px',
          background: `linear-gradient(to left, ${style.primaryColor}, transparent)`,
        }}
      />
    );
  };

  // Get all active social networks from data
  const activeSocials = SOCIAL_NETWORKS.filter(
    network => data[network.key as SocialNetworkKey]
  );

  const SocialIconLink = ({ networkKey }: { networkKey: SocialNetworkKey }) => {
    const value = data[networkKey];
    if (!value) return null;
    
    const network = SOCIAL_NETWORKS.find(n => n.key === networkKey);
    if (!network) return null;
    
    const IconComponent = network.icon;
    const url = buildSocialUrl(networkKey, value);
    
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block"
        style={{ color: style.primaryColor }}
      >
        <IconComponent size={16} color={style.primaryColor} />
      </a>
    );
  };

  const SocialIconsRow = () => (
    <div className="flex gap-2 mt-2 flex-wrap">
      {activeSocials.map(network => (
        <SocialIconLink key={network.key} networkKey={network.key} />
      ))}
    </div>
  );

  const ContactItem = ({ icon: Icon, value, href }: { icon: typeof Mail; value: string; href?: string }) => {
    if (!value) return null;
    const content = (
      <span className="flex items-center gap-1" style={{ fontSize: currentSize.text }}>
        {style.showIcons && <Icon size={12} style={{ color: style.primaryColor }} />}
        <span>{value}</span>
      </span>
    );
    if (href) {
      return (
        <a href={href} style={{ color: 'inherit', textDecoration: 'none' }}>
          {content}
        </a>
      );
    }
    return content;
  };

  // Template: Classic
  const ClassicTemplate = () => (
    <div style={{ fontFamily: style.fontFamily, direction: 'rtl' }}>
      <div className="flex items-start gap-3">
        {data.profileImage && (
          <img
            src={data.profileImage}
            alt={data.fullName}
            className={style.roundedImage ? 'rounded-full' : 'rounded-lg'}
            style={{ width: '70px', height: '70px', objectFit: 'cover' }}
          />
        )}
        <div>
          <div style={{ fontSize: currentSize.name, fontWeight: 600, color: style.primaryColor }}>
            {data.fullName || 'השם שלך'}
          </div>
          <div style={{ fontSize: currentSize.title, color: '#666' }}>
            {data.jobTitle}
            {data.jobTitle && data.company && ' | '}
            {data.company}
          </div>
          {renderDivider()}
          <div className="space-y-1">
            <ContactItem icon={Mail} value={data.email} href={`mailto:${data.email}`} />
            <ContactItem icon={Phone} value={data.phone} href={`tel:${data.phone}`} />
            <ContactItem icon={Globe} value={data.website} href={data.website} />
          </div>
          <SocialIconsRow />
        </div>
      </div>
      {data.companyLogo && (
        <img
          src={data.companyLogo}
          alt="Company Logo"
          style={{ marginTop: '10px', maxHeight: '40px', objectFit: 'contain' }}
        />
      )}
    </div>
  );

  // Template: Modern
  const ModernTemplate = () => (
    <div style={{ fontFamily: style.fontFamily, direction: 'rtl' }}>
      <div
        className="p-4 rounded-lg"
        style={{
          background: `linear-gradient(135deg, ${style.primaryColor}10 0%, ${style.secondaryColor}10 100%)`,
          borderRight: `3px solid ${style.primaryColor}`,
        }}
      >
        <div className="flex items-center gap-4">
          {data.profileImage && (
            <img
              src={data.profileImage}
              alt={data.fullName}
              className={style.roundedImage ? 'rounded-full' : 'rounded-xl'}
              style={{ width: '80px', height: '80px', objectFit: 'cover' }}
            />
          )}
          <div className="flex-1">
            <div
              style={{
                fontSize: currentSize.name,
                fontWeight: 700,
                background: `linear-gradient(135deg, ${style.primaryColor}, ${style.secondaryColor})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {data.fullName || 'השם שלך'}
            </div>
            <div style={{ fontSize: currentSize.title, color: style.primaryColor, fontWeight: 500 }}>
              {data.jobTitle}
            </div>
            <div style={{ fontSize: currentSize.text, color: '#888' }}>{data.company}</div>
          </div>
          {data.companyLogo && (
            <img
              src={data.companyLogo}
              alt="Company Logo"
              style={{ maxHeight: '50px', objectFit: 'contain' }}
            />
          )}
        </div>
        {renderDivider()}
        <div className="flex flex-wrap gap-4 mt-2" style={{ fontSize: currentSize.text }}>
          <ContactItem icon={Mail} value={data.email} href={`mailto:${data.email}`} />
          <ContactItem icon={Phone} value={data.phone} href={`tel:${data.phone}`} />
          <ContactItem icon={Globe} value={data.website} href={data.website} />
        </div>
        <SocialIconsRow />
      </div>
    </div>
  );

  // Template: Minimal
  const MinimalTemplate = () => (
    <div style={{ fontFamily: style.fontFamily, direction: 'rtl' }}>
      <div style={{ fontSize: currentSize.name, fontWeight: 600 }}>
        {data.fullName || 'השם שלך'}
      </div>
      <div style={{ fontSize: currentSize.title, color: style.primaryColor }}>
        {data.jobTitle}
        {data.jobTitle && data.company && ' • '}
        <span style={{ color: '#666' }}>{data.company}</span>
      </div>
      <div
        style={{
          height: '2px',
          width: '50px',
          background: style.primaryColor,
          margin: '8px 0',
        }}
      />
      <div style={{ fontSize: currentSize.text, color: '#666' }}>
        {[data.email, data.phone, data.website].filter(Boolean).join(' | ')}
      </div>
      <SocialIconsRow />
    </div>
  );

  // Template: Creative
  const CreativeTemplate = () => (
    <div
      style={{
        fontFamily: style.fontFamily,
        direction: 'rtl',
        background: `linear-gradient(135deg, ${style.primaryColor}05, ${style.secondaryColor}10)`,
        padding: '16px',
        borderRadius: '16px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '-20px',
          left: '-20px',
          width: '100px',
          height: '100px',
          background: `radial-gradient(circle, ${style.primaryColor}20, transparent 70%)`,
          borderRadius: '50%',
        }}
      />
      <div className="relative flex items-center gap-4">
        {data.profileImage && (
          <div
            style={{
              padding: '3px',
              background: `linear-gradient(135deg, ${style.primaryColor}, ${style.secondaryColor})`,
              borderRadius: style.roundedImage ? '50%' : '16px',
            }}
          >
            <img
              src={data.profileImage}
              alt={data.fullName}
              className={style.roundedImage ? 'rounded-full' : 'rounded-xl'}
              style={{ width: '70px', height: '70px', objectFit: 'cover', border: '2px solid white' }}
            />
          </div>
        )}
        <div>
          <div style={{ fontSize: currentSize.name, fontWeight: 700, color: style.primaryColor }}>
            {data.fullName || 'השם שלך'}
          </div>
          <div
            style={{
              fontSize: currentSize.title,
              color: 'white',
              background: `linear-gradient(135deg, ${style.primaryColor}, ${style.secondaryColor})`,
              padding: '2px 8px',
              borderRadius: '4px',
              display: 'inline-block',
            }}
          >
            {data.jobTitle || 'התפקיד שלך'}
          </div>
          <div style={{ fontSize: currentSize.text, color: '#666', marginTop: '4px' }}>{data.company}</div>
        </div>
      </div>
      {renderDivider()}
      <div className="flex flex-wrap gap-3 mt-2" style={{ fontSize: currentSize.text }}>
        <ContactItem icon={Mail} value={data.email} href={`mailto:${data.email}`} />
        <ContactItem icon={Phone} value={data.phone} href={`tel:${data.phone}`} />
        <ContactItem icon={Globe} value={data.website} href={data.website} />
      </div>
      <SocialIconsRow />
    </div>
  );

  // Template: Corporate
  const CorporateTemplate = () => (
    <div
      style={{
        fontFamily: style.fontFamily,
        direction: 'rtl',
        borderRight: `4px solid ${style.primaryColor}`,
        paddingRight: '16px',
      }}
    >
      <div className="flex justify-between items-start">
        <div>
          <div style={{ fontSize: currentSize.name, fontWeight: 600 }}>
            {data.fullName || 'השם שלך'}
          </div>
          <div style={{ fontSize: currentSize.title, color: style.primaryColor, fontWeight: 500 }}>
            {data.jobTitle}
          </div>
          <div style={{ fontSize: currentSize.text, color: '#666' }}>{data.company}</div>
        </div>
        <div className="flex gap-2 items-center">
          {data.companyLogo && (
            <img
              src={data.companyLogo}
              alt="Company Logo"
              style={{ maxHeight: '45px', objectFit: 'contain' }}
            />
          )}
          {data.profileImage && (
            <img
              src={data.profileImage}
              alt={data.fullName}
              className={style.roundedImage ? 'rounded-full' : 'rounded-lg'}
              style={{ width: '50px', height: '50px', objectFit: 'cover' }}
            />
          )}
        </div>
      </div>
      {renderDivider()}
      <table style={{ fontSize: currentSize.text }}>
        <tbody>
          {data.email && (
            <tr>
              <td style={{ paddingLeft: '8px', color: style.primaryColor }}>אימייל:</td>
              <td>
                <a href={`mailto:${data.email}`} style={{ color: '#333', textDecoration: 'none' }}>
                  {data.email}
                </a>
              </td>
            </tr>
          )}
          {data.phone && (
            <tr>
              <td style={{ paddingLeft: '8px', color: style.primaryColor }}>טלפון:</td>
              <td>
                <a href={`tel:${data.phone}`} style={{ color: '#333', textDecoration: 'none' }}>
                  {data.phone}
                </a>
              </td>
            </tr>
          )}
          {data.website && (
            <tr>
              <td style={{ paddingLeft: '8px', color: style.primaryColor }}>אתר:</td>
              <td>
                <a href={data.website} style={{ color: '#333', textDecoration: 'none' }}>
                  {data.website}
                </a>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <SocialIconsRow />
    </div>
  );

  // Template: Elegant
  const ElegantTemplate = () => (
    <div style={{ fontFamily: style.fontFamily, direction: 'rtl', textAlign: 'center' }}>
      {data.profileImage && (
        <div style={{ marginBottom: '12px' }}>
          <img
            src={data.profileImage}
            alt={data.fullName}
            style={{
              width: '80px',
              height: '80px',
              objectFit: 'cover',
              borderRadius: style.roundedImage ? '50%' : '12px',
              border: `3px solid ${style.primaryColor}`,
              margin: '0 auto',
              display: 'block',
            }}
          />
        </div>
      )}
      <div style={{ fontSize: currentSize.name, fontWeight: 600, letterSpacing: '1px' }}>
        {data.fullName || 'השם שלך'}
      </div>
      <div
        style={{
          fontSize: currentSize.title,
          color: style.primaryColor,
          textTransform: 'uppercase',
          letterSpacing: '2px',
          marginTop: '4px',
        }}
      >
        {data.jobTitle}
      </div>
      <div style={{ fontSize: currentSize.text, color: '#888' }}>{data.company}</div>
      {renderDivider()}
      <div style={{ fontSize: currentSize.text, color: '#666' }}>
        {data.email && (
          <a href={`mailto:${data.email}`} style={{ color: '#666', textDecoration: 'none' }}>
            {data.email}
          </a>
        )}
        {data.email && data.phone && ' • '}
        {data.phone && (
          <a href={`tel:${data.phone}`} style={{ color: '#666', textDecoration: 'none' }}>
            {data.phone}
          </a>
        )}
      </div>
      {data.website && (
        <div style={{ fontSize: currentSize.text, marginTop: '4px' }}>
          <a href={data.website} style={{ color: style.primaryColor, textDecoration: 'none' }}>
            {data.website}
          </a>
        </div>
      )}
      <div className="flex justify-center gap-3 mt-3">
        {activeSocials.map(network => (
          <SocialIconLink key={network.key} networkKey={network.key} />
        ))}
      </div>
      {data.companyLogo && (
        <img
          src={data.companyLogo}
          alt="Company Logo"
          style={{ marginTop: '12px', maxHeight: '35px', objectFit: 'contain', margin: '12px auto 0' }}
        />
      )}
    </div>
  );

  const templates: Record<string, React.FC> = {
    classic: ClassicTemplate,
    modern: ModernTemplate,
    minimal: MinimalTemplate,
    creative: CreativeTemplate,
    corporate: CorporateTemplate,
    elegant: ElegantTemplate,
  };

  const SelectedTemplate = templates[templateId] || ClassicTemplate;

  return (
    <div className="bg-white p-6 rounded-xl" style={{ minHeight: '200px' }}>
      <SelectedTemplate />
    </div>
  );
};

export default SignaturePreview;
