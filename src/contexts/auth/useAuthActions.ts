import { useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useRateLimiter } from '@/hooks/useRateLimiter';
import { useInputValidation } from '@/hooks/useInputValidation';

export function useAuthActions() {
  const [loading, setLoading] = useState(false);
  
  // Rate limiting for auth attempts
  const { isAllowed, getRemainingTime } = useRateLimiter({
    maxAttempts: 5,
    windowMs: 15 * 60 * 1000 // 15 minutes
  });
  
  const { validateEmail, validatePassword, validateName, sanitizeInput } = useInputValidation();

  const signUp = async (email: string, password: string, userData?: any) => {
    try {
      setLoading(true);
      
      // Rate limiting check
      const clientId = `signup_${email}`;
      if (!isAllowed(clientId)) {
        const remainingMs = getRemainingTime(clientId);
        const remainingMin = Math.ceil(remainingMs / 60000);
        toast.error(`Too many signup attempts. Please wait ${remainingMin} minutes.`);
        return { error: new Error('Rate limited') };
      }
      
      // Input validation
      const emailError = validateEmail(email);
      if (emailError) {
        toast.error(emailError);
        return { error: new Error(emailError) };
      }
      
      const passwordError = validatePassword(password);
      if (passwordError) {
        toast.error(passwordError);
        return { error: new Error(passwordError) };
      }
      
      // Sanitize user data
      const sanitizedUserData = userData ? {
        first_name: userData.first_name ? sanitizeInput(userData.first_name) : '',
        last_name: userData.last_name ? sanitizeInput(userData.last_name) : '',
        company_name: userData.company_name ? sanitizeInput(userData.company_name) : ''
      } : {};
      
      // Validate names if provided
      if (sanitizedUserData.first_name) {
        const firstNameError = validateName(sanitizedUserData.first_name);
        if (firstNameError) {
          toast.error(`First name: ${firstNameError}`);
          return { error: new Error(firstNameError) };
        }
      }
      
      if (sanitizedUserData.last_name) {
        const lastNameError = validateName(sanitizedUserData.last_name);
        if (lastNameError) {
          toast.error(`Last name: ${lastNameError}`);
          return { error: new Error(lastNameError) };
        }
      }
      
      const { error } = await supabase.auth.signUp({
        email: email.toLowerCase().trim(),
        password,
        options: {
          data: sanitizedUserData,
          emailRedirectTo: `${window.location.origin}/dashboard`
        }
      });
      
      if (error) {
        console.error('SignUp error:', error);
        const sanitizedMessage = error.message.includes('already registered') 
          ? 'An account with this email already exists'
          : 'Unable to create account. Please try again.';
        toast.error(sanitizedMessage);
      } else {
        toast.success('Check your email to confirm your account!');
      }
      
      return { error };
    } catch (error) {
      console.error('SignUp catch error:', error);
      toast.error('An unexpected error occurred during sign up');
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      
      // Rate limiting check
      const clientId = `signin_${email}`;
      if (!isAllowed(clientId)) {
        const remainingMs = getRemainingTime(clientId);
        const remainingMin = Math.ceil(remainingMs / 60000);
        toast.error(`Too many signin attempts. Please wait ${remainingMin} minutes.`);
        return { error: new Error('Rate limited') };
      }
      
      // Input validation
      const emailError = validateEmail(email);
      if (emailError) {
        toast.error(emailError);
        return { error: new Error(emailError) };
      }
      
      if (!password) {
        toast.error('Password is required');
        return { error: new Error('Password is required') };
      }
      
      const { error } = await supabase.auth.signInWithPassword({
        email: email.toLowerCase().trim(),
        password,
      });
      
      if (error) {
        console.error('SignIn error:', error);
        const sanitizedMessage = error.message.includes('Invalid login credentials')
          ? 'Invalid email or password'
          : 'Unable to sign in. Please try again.';
        toast.error(sanitizedMessage);
      } else {
        toast.success('Welcome back!');
      }
      
      return { error };
    } catch (error) {
      console.error('SignIn catch error:', error);
      toast.error('An unexpected error occurred during sign in');
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    try {
      console.log('Starting Google sign in...');
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`
        }
      });
      
      if (error) {
        console.error('Google sign in error:', error);
        toast.error('Unable to sign in with Google. Please try again.');
      }
      
      return { error };
    } catch (error) {
      console.error('Google sign in catch error:', error);
      toast.error('An unexpected error occurred with Google sign in');
      return { error };
    }
  };

  const signInWithLinkedIn = async () => {
    try {
      console.log('Starting LinkedIn sign in...');
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'linkedin_oidc',
        options: {
          redirectTo: `${window.location.origin}/dashboard`
        }
      });
      
      if (error) {
        console.error('LinkedIn sign in error:', error);
        toast.error('Unable to sign in with LinkedIn. Please try again.');
      }
      
      return { error };
    } catch (error) {
      console.error('LinkedIn sign in catch error:', error);
      toast.error('An unexpected error occurred with LinkedIn sign in');
      return { error };
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Sign out error:', error);
        toast.error('Unable to sign out. Please try again.');
      } else {
        toast.success('Signed out successfully');
      }
    } catch (error) {
      console.error('Sign out catch error:', error);
      toast.error('An unexpected error occurred during sign out');
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (data: any, user: User | null) => {
    try {
      if (!user) throw new Error('No user logged in');
      
      // Enhanced input sanitization and validation
      const sanitizedData = Object.keys(data).reduce((acc, key) => {
        if (typeof data[key] === 'string') {
          acc[key] = sanitizeInput(data[key]);
          
          // Additional validation for specific fields
          if (key.includes('name') && acc[key]) {
            const nameError = validateName(acc[key]);
            if (nameError) {
              throw new Error(`${key}: ${nameError}`);
            }
          }
          
          if (key === 'email' && acc[key]) {
            const emailError = validateEmail(acc[key]);
            if (emailError) {
              throw new Error(emailError);
            }
          }
        } else {
          acc[key] = data[key];
        }
        return acc;
      }, {} as any);
      
      const { error } = await supabase
        .from('profiles')
        .update(sanitizedData)
        .eq('id', user.id);
      
      if (error) {
        console.error('Update profile error:', error);
        toast.error('Unable to update profile. Please try again.');
      } else {
        toast.success('Profile updated successfully');
      }
      
      return { error };
    } catch (error) {
      console.error('Update profile catch error:', error);
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred while updating profile';
      toast.error(errorMessage);
      return { error };
    }
  };

  return {
    loading,
    signUp,
    signIn,
    signInWithGoogle,
    signInWithLinkedIn,
    signOut,
    updateProfile,
  };
}
