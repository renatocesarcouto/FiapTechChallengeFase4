import React, { createContext, useState, useContext, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';
import { User } from '../types';

interface AuthContextData {
  signed: boolean;
  user: User | null;
  loading: boolean;
  signIn(email: string, password: string): Promise<void>;
  signOut(): void;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const response = await api.post('/auth/login', { email, password });
      
      const { user, token } = response.data;
      
      api.defaults.headers.Authorization = `Bearer ${token}`;
      await AsyncStorage.setItem('@BlogApp:user', JSON.stringify(user));
      await AsyncStorage.setItem('@BlogApp:token', token);
      
      setUser(user);
    } catch (error: any) {
      if (error.response?.status === 401) {
        throw new Error('Credentcais inválidas');
      }
      throw new Error('Erro de conexão');
    } finally {
      setLoading(false);
    }
  };
  const signOut = async () => {
    await AsyncStorage.removeItem('@BlogApp:user');
    await AsyncStorage.removeItem('@BlogApp:token');
    setUser(null);
    api.defaults.headers.Authorization = '';
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      signIn, 
      signOut,
      signed: !!user 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};
