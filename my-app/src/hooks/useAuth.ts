// hooks/useAuth.ts

import { useState, useEffect } from 'react';
import { User as FirebaseUser, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../services/firebase/config.ts';
import apiClient from '../services/api/client.ts';  // importの修正
import { User, SignupRequest } from '../types.ts';  // importの修正

export const useAuth = () => {  // default exportを削除し、named exportに変更
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const token = await firebaseUser.getIdToken();
          console.log('Firebase token:', token); // デバッグ用
          const response = await apiClient.post('/auth/login');
          setUser(response.data);
        } catch (err) {
          console.error('Failed to fetch user data:', err);
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });
  
    return () => unsubscribe();
  }, []);

  const signup = async (email: string, password: string, username: string, displayName: string) => {
    try {
      setError(null);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      const signupData: SignupRequest = {
        username,
        displayName,
      };
      
      const response = await apiClient.post('/auth/signup', signupData);
      setUser(response.data);
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setError(null);
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const logout = async () => {
    try {
      setError(null);
      await signOut(auth);
      setUser(null);
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  return { user, loading, error, signup, login, logout };
};