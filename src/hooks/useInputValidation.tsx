
import { useMemo } from 'react';

interface ValidationRule {
  test: (value: string) => boolean;
  message: string;
}

interface ValidationSchema {
  [key: string]: ValidationRule[];
}

export function useInputValidation() {
  const validateEmail = useMemo(() => {
    return (email: string): string | null => {
      if (!email) return 'Email is required';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Invalid email format';
      if (email.length > 254) return 'Email is too long';
      return null;
    };
  }, []);

  const validatePassword = useMemo(() => {
    return (password: string): string | null => {
      if (!password) return 'Password is required';
      if (password.length < 8) return 'Password must be at least 8 characters';
      if (password.length > 128) return 'Password is too long';
      if (!/(?=.*[a-z])/.test(password)) return 'Password must contain lowercase letter';
      if (!/(?=.*[A-Z])/.test(password)) return 'Password must contain uppercase letter';
      if (!/(?=.*\d)/.test(password)) return 'Password must contain a number';
      return null;
    };
  }, []);

  const validateName = useMemo(() => {
    return (name: string): string | null => {
      if (!name) return 'Name is required';
      if (name.length < 2) return 'Name must be at least 2 characters';
      if (name.length > 50) return 'Name is too long';
      if (!/^[a-zA-Z\s'-]+$/.test(name)) return 'Name contains invalid characters';
      return null;
    };
  }, []);

  const validateProjectName = useMemo(() => {
    return (name: string): string | null => {
      if (!name) return 'Project name is required';
      if (name.length < 3) return 'Project name must be at least 3 characters';
      if (name.length > 100) return 'Project name is too long';
      if (!/^[a-zA-Z0-9\s\-_]+$/.test(name)) return 'Project name contains invalid characters';
      return null;
    };
  }, []);

  const sanitizeInput = useMemo(() => {
    return (input: string): string => {
      if (typeof input !== 'string') return '';
      
      return input
        .trim()
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        .replace(/javascript:/gi, '')
        .replace(/on\w+\s*=/gi, '')
        .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
        .replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '')
        .replace(/<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi, '');
    };
  }, []);

  const validateAndSanitize = useMemo(() => {
    return (data: Record<string, any>, schema: ValidationSchema): { 
      isValid: boolean; 
      errors: Record<string, string>; 
      sanitizedData: Record<string, any> 
    } => {
      const errors: Record<string, string> = {};
      const sanitizedData: Record<string, any> = {};

      for (const [field, rules] of Object.entries(schema)) {
        const value = data[field];
        let sanitizedValue = typeof value === 'string' ? sanitizeInput(value) : value;
        
        for (const rule of rules) {
          if (!rule.test(sanitizedValue)) {
            errors[field] = rule.message;
            break;
          }
        }
        
        sanitizedData[field] = sanitizedValue;
      }

      return {
        isValid: Object.keys(errors).length === 0,
        errors,
        sanitizedData
      };
    };
  }, [sanitizeInput]);

  return {
    validateEmail,
    validatePassword,
    validateName,
    validateProjectName,
    sanitizeInput,
    validateAndSanitize
  };
}
