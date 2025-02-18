import jwt from 'react-native-pure-jwt';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../types';
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';
export const generateToken = (user: User) => {
  const payload = { 
    id: user.id, 
    email: user.email,
    role: user.role 
  };
  return jwt.sign(
    payload, 
    JWT_SECRET,
    { 
      alg: 'HS256'
    }
  );
};

export const verifyToken = (token: string) => {
  return jwt.decode(
    token,
    JWT_SECRET
  );
};

export const getTokenFromStorage = async () => {
  try {
    const token = await AsyncStorage.getItem('@Auth:token');
    if (token) {
      return token;
    }
    return null;
  } catch (error) {
    return null;
  }
};

import api from './api';

interface LoginResponse {
  user: {
    id: number;
    name: string;
    email: string;
    role: 'teacher' | 'student';
  };
  token: string;
}

export const login = async (email: string, password: string) => {
  const response = await api.post<LoginResponse>('/auth/login', {
    email,
    password
  });
  
  return response.data;
};
