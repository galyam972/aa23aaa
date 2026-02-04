import { SocialNetworkKey } from './socialNetworks';

/**
 * Formats a social network value for display purposes.
 * Extracts usernames from URLs, normalizes @ handles, and formats phone numbers.
 * Does NOT modify the original value - only returns a display-friendly version.
 */
export const formatSocialDisplay = (platform: SocialNetworkKey, value: string): string => {
  if (!value || value.trim() === '') return '';
  
  const trimmedValue = value.trim();
  
  // If it's already a short @ handle, return as-is
  if (trimmedValue.startsWith('@') && !trimmedValue.includes('/') && !trimmedValue.includes('.')) {
    return trimmedValue;
  }
  
  // Handle phone numbers (WhatsApp)
  if (platform === 'whatsapp') {
    return formatPhoneNumber(trimmedValue);
  }
  
  // Handle URLs
  if (trimmedValue.includes('/') || trimmedValue.includes('.')) {
    return extractUsernameFromUrl(platform, trimmedValue);
  }
  
  // Plain username without @ - add @ for platforms that use it
  const platformsWithAt: SocialNetworkKey[] = ['twitter', 'instagram', 'tiktok', 'telegram', 'threads', 'snapchat'];
  if (platformsWithAt.includes(platform)) {
    return `@${trimmedValue}`;
  }
  
  return trimmedValue;
};

/**
 * Extracts username/path from a URL for display
 */
const extractUsernameFromUrl = (platform: SocialNetworkKey, url: string): string => {
  // Remove protocol
  let cleanUrl = url.replace(/^https?:\/\//, '').replace(/^www\./, '');
  
  // Remove trailing slashes
  cleanUrl = cleanUrl.replace(/\/+$/, '');
  
  // Platform-specific extraction
  switch (platform) {
    case 'linkedin': {
      // linkedin.com/in/username or linkedin.com/company/name
      const linkedinMatch = cleanUrl.match(/linkedin\.com\/(?:in|company)\/([^/?]+)/);
      return linkedinMatch ? linkedinMatch[1] : getLastPathSegment(cleanUrl);
    }
    
    case 'twitter':
    case 'instagram':
    case 'tiktok':
    case 'threads':
    case 'snapchat':
    case 'telegram': {
      // These platforms use @ usernames
      const segment = getLastPathSegment(cleanUrl);
      const cleanSegment = segment.replace(/^@/, '');
      return cleanSegment ? `@${cleanSegment}` : '';
    }
    
    case 'youtube': {
      // youtube.com/@channel or youtube.com/channel/xxx or youtube.com/c/xxx
      const youtubeMatch = cleanUrl.match(/youtube\.com\/(?:@|channel\/|c\/)?([^/?]+)/);
      if (youtubeMatch) {
        const channel = youtubeMatch[1];
        return channel.startsWith('@') ? channel : `@${channel}`;
      }
      return getLastPathSegment(cleanUrl);
    }
    
    case 'facebook': {
      // facebook.com/username or facebook.com/profile.php?id=xxx
      if (cleanUrl.includes('profile.php')) {
        return 'Profile';
      }
      const fbMatch = cleanUrl.match(/facebook\.com\/([^/?]+)/);
      return fbMatch ? fbMatch[1] : getLastPathSegment(cleanUrl);
    }
    
    case 'github': {
      // github.com/username
      const githubMatch = cleanUrl.match(/github\.com\/([^/?]+)/);
      return githubMatch ? githubMatch[1] : getLastPathSegment(cleanUrl);
    }
    
    case 'pinterest': {
      // pinterest.com/username
      const pinterestMatch = cleanUrl.match(/pinterest\.com\/([^/?]+)/);
      return pinterestMatch ? pinterestMatch[1] : getLastPathSegment(cleanUrl);
    }
    
    case 'spotify': {
      // open.spotify.com/user/xxx or open.spotify.com/artist/xxx
      const spotifyMatch = cleanUrl.match(/spotify\.com\/(?:user|artist)\/([^/?]+)/);
      return spotifyMatch ? spotifyMatch[1] : getLastPathSegment(cleanUrl);
    }
    
    case 'discord': {
      // discord.gg/invite
      const discordMatch = cleanUrl.match(/discord\.gg\/([^/?]+)/);
      return discordMatch ? discordMatch[1] : getLastPathSegment(cleanUrl);
    }
    
    default:
      return getLastPathSegment(cleanUrl);
  }
};

/**
 * Gets the last segment of a URL path
 */
const getLastPathSegment = (url: string): string => {
  const parts = url.split('/').filter(Boolean);
  // Skip domain parts
  const pathParts = parts.filter(part => !part.includes('.') || part.startsWith('@'));
  return pathParts[pathParts.length - 1] || parts[parts.length - 1] || url;
};

/**
 * Formats a phone number for display
 */
const formatPhoneNumber = (value: string): string => {
  // Remove all non-digit characters except +
  const digitsOnly = value.replace(/[^\d+]/g, '');
  
  // If it's an Israeli number
  if (digitsOnly.startsWith('972')) {
    const localNumber = digitsOnly.slice(3);
    if (localNumber.length === 9) {
      return `0${localNumber.slice(0, 2)}-${localNumber.slice(2, 5)}-${localNumber.slice(5)}`;
    }
  }
  
  // If it starts with 0 (local Israeli)
  if (digitsOnly.startsWith('0') && digitsOnly.length === 10) {
    return `${digitsOnly.slice(0, 3)}-${digitsOnly.slice(3, 6)}-${digitsOnly.slice(6)}`;
  }
  
  // Return as-is if we can't format
  return value;
};
