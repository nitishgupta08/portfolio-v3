import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Generate a simple browser fingerprint for like persistence
export const generateFingerprint = (): string => {
  if (typeof window === 'undefined') return 'server';
  
  try {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      ctx.textBaseline = 'top';
      ctx.font = '14px Arial';
      ctx.fillText('Browser fingerprint', 2, 2);
    }
    
    const fingerprint = btoa(
      (navigator.userAgent || '') + 
      (screen.width || 0) + 
      (screen.height || 0) + 
      (Intl.DateTimeFormat().resolvedOptions().timeZone || '') +
      (canvas.toDataURL() || '')
    ).slice(0, 16);
    
    return fingerprint;
  } catch (error) {
    console.error('Error generating fingerprint:', error);
    return Math.random().toString(36).substring(7);
  }
};
