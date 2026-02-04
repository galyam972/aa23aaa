import { SignatureData } from '@/types/signature';

// Default values for guest/new users to see a live preview immediately
export const DEFAULT_SIGNATURE_DATA: SignatureData = {
  fullName: 'ישראל ישראלי',
  jobTitle: 'מנהל שיווק',
  company: 'חברת הייטק בע״מ',
  email: 'example@email.com',
  phone: '050-1234567',
  website: 'www.example.com',
  linkedin: 'linkedin.com/in/israel-israeli',
  twitter: '@israel_israeli',
  facebook: 'facebook.com/israel.israeli',
  instagram: '',
  profileImage: '',
  companyLogo: '',
};

// Empty signature data
export const EMPTY_SIGNATURE_DATA: SignatureData = {
  fullName: '',
  jobTitle: '',
  company: '',
  email: '',
  phone: '',
  website: '',
  linkedin: '',
  twitter: '',
  facebook: '',
  instagram: '',
  profileImage: '',
  companyLogo: '',
};
