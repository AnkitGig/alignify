
import React, { createContext, useContext } from 'react';
import { AuthContextType } from './auth/types';
import { useAuthState } from './auth/useAuthState';
import { useAuthActions } from './auth/useAuthActions';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { user, session, loading: authLoading } = useAuthState();
  const { 
    loading: actionLoading, 
    signUp, 
    signIn, 
    signInWithGoogle, 
    signInWithLinkedIn, 
    signOut, 
    updateProfile: updateProfileAction 
  } = useAuthActions();

  const updateProfile = async (data: any) => {
    return updateProfileAction(data, user);
  };

  const loading = authLoading || actionLoading;

  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signInWithGoogle,
    signInWithLinkedIn,
    signOut,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
