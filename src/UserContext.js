import React, { createContext, useState, useEffect, useContext } from 'react';
import { auth, getRedirectResult } from './firebase-config';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribe;
    
    const initializeAuth = async () => {
      try {
        console.log('UserProvider: Initializing auth');
        const result = await getRedirectResult(auth);
        if (result && result.user) {
          console.log('UserProvider: Redirect result found', result.user);
          setUser(result.user);
        } else {
          console.log('UserProvider: No redirect result found');
        }
      } catch (error) {
        console.error('UserProvider: Error handling redirect', error);
      } finally {
        console.log('UserProvider: Setting up auth state listener');
        unsubscribe = auth.onAuthStateChanged((currentUser) => {
          console.log('UserProvider: Auth state changed', currentUser);
          setUser(currentUser);
          setLoading(false);
        });
      }
    };

    initializeAuth();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const logout = async () => {
    try {
      await auth.signOut();
      console.log('UserProvider: User signed out');
    } catch (error) {
      console.error('UserProvider: Error signing out', error);
    }
  };

  const value = {
    user,
    setUser,
    loading,
    logout
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};