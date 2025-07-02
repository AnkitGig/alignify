
import { useMemo } from 'react';

export function useInputSanitization() {
  const sanitizeInput = useMemo(() => {
    return (input: string): string => {
      if (typeof input !== 'string') return input;
      
      // Remove script tags and potential XSS vectors
      return input
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        .replace(/javascript:/gi, '')
        .replace(/on\w+\s*=/gi, '')
        .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
        .replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '')
        .replace(/<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi, '');
    };
  }, []);

  const sanitizeObject = useMemo(() => {
    return (obj: Record<string, any>): Record<string, any> => {
      const sanitized: Record<string, any> = {};
      
      for (const [key, value] of Object.entries(obj)) {
        if (typeof value === 'string') {
          sanitized[key] = sanitizeInput(value);
        } else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
          sanitized[key] = sanitizeObject(value);
        } else if (Array.isArray(value)) {
          sanitized[key] = value.map(item => 
            typeof item === 'string' ? sanitizeInput(item) : 
            typeof item === 'object' && item !== null ? sanitizeObject(item) : item
          );
        } else {
          sanitized[key] = value;
        }
      }
      
      return sanitized;
    };
  }, [sanitizeInput]);

  return { sanitizeInput, sanitizeObject };
}
