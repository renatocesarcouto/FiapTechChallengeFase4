export interface User {
  id: number;
  name: string;
  email: string;
  role: 'teacher' | 'student';
}

export interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
  teacher_id: number;
}

export interface Teacher {
  id: number;
  name: string;
  email: string;
}

export interface Student {
  id: number;
  name: string;
  email: string;
}
