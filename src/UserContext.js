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
        console.log('UserProvider: Checking redirect result');
        const result = await getRedirectResult(auth);
        if (result && result.user) {
          console.log('UserProvider: Redirect result found', result.user);
          setUser(result.user);
          setLoading(false);
        } else {
          console.log('UserProvider: No redirect result, setting up auth listener');
          unsubscribe = auth.onAuthStateChanged((currentUser) => {
            console.log('UserProvider: Auth state changed', currentUser);
            setUser(currentUser);
            setLoading(false);
          });
        }
      } catch (error) {
        console.error('UserProvider: Error during auth initialization', error);
        setLoading(false);
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