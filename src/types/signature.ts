export interface SignatureData {
  fullName: string;
  jobTitle: string;
  company: string;
  email: string;
  phone: string;
  website: string;
  linkedin: string;
  twitter: string;
  facebook: string;
  instagram: string;
  profileImage: string;
  companyLogo: string;
}

export interface SignatureTemplate {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  isPremium: boolean;
}

export interface SignatureStyle {
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  fontSize: 'small' | 'medium' | 'large';
  layout: 'horizontal' | 'vertical' | 'compact';
  showIcons: boolean;
  roundedImage: boolean;
  dividerStyle: 'line' | 'none' | 'dots';
}
