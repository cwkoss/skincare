import React, { createContext, useState, useEffect, useContext } from 'react';
import { auth, getRedirectResult } from './firebase-config';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result && result.user) {
          console.log('UserProvider: Redirect result', result.user);
          setUser(result.user);
        }
      } catch (error) {
        console.error('UserProvider: Error handling redirect', error);
      }
    };

    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      console.log('UserProvider: Auth state changed', currentUser);
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
        await checkRedirectResult(); // Check for redirect result if no user is found
      }
      setLoading(false);
    });

    return () => unsubscribe();
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