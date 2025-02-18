import axios from 'axios';
import { ApiError } from '../utils/ApiError';

const api = axios.create({
  baseURL: 'http://10.0.2.2:3000',
});

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      console.log('Error:', error);
      throw new ApiError(
        error.response.status,
        error.response.data.message || 'An error occurred again',
        error.response.data
      );
    }
    throw new ApiError(500, 'Network error occurred');
  }
);

// Auth
export const login = (email: string, password: string) => 
  api.post('/auth/login', { email, password });

// Posts
export const getPosts = () => api.get('/posts');
export const getPost = (id: number) => api.get(`/posts/${id}`);
export const createPost = (data: any) => api.post('/posts', data);
export const updatePost = (id: number, data: any) => api.put(`/posts/${id}`, data);
export const deletePost = (id: number) => api.delete(`/posts/${id}`);

// Teachers
export const getTeachers = () => api.get('/teachers');
export const getTeacher = (id: number) => api.get(`/teachers/${id}`);
export const createTeacher = (data: any) => api.post('/teachers', data);
export const updateTeacher = (id: number, data: any) => api.put(`/teachers/${id}`, data);
export const deleteTeacher = (id: number) => api.delete(`/teachers/${id}`);

// Students
export const getStudents = () => api.get('/students');
export const getStudent = (id: number) => api.get(`/students/${id}`);
export const createStudent = (data: any) => api.post('/students', data);
export const updateStudent = (id: number, data: any) => api.put(`/students/${id}`, data);
export const deleteStudent = (id: number) => api.delete(`/students/${id}`);

export default api;