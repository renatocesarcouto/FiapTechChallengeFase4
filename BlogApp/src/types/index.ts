export interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
}

export interface Teacher {
  id: number;
  name: string;
  email: string;
  password?: string;
}

export interface Student {
  id: number;
  name: string;
  email: string;
  password?: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'teacher' | 'student';
}