import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../contexts/AuthContext';
import { Post } from '../types';

import LoginScreen from '../screens/auth/LoginScreen.tsx';
import HomeScreen from '../screens/HomeScreen.tsx';
import PostDetailScreen from '../screens/PostDetailScreen.tsx';
import CreatePostScreen from '../screens/posts/CreatePostScreen.tsx';
import EditPostScreen from '../screens/posts/EditPostScreen.tsx';
import AdminScreen from '../screens/admin/AdminScreen.tsx';
import TeacherListScreen from '../screens/teachers/TeacherListScreen.tsx';
import TeacherFormScreen from '../screens/teachers/TeacherFormScreen.tsx';
import StudentListScreen from '../screens/students/StudentListScreen.tsx';
import StudentFormScreen from '../screens/students/StudentFormScreen.tsx';

type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  PostDetail: { post: Post };
  CreatePost: undefined;
  EditPost: { postId: number };
  Admin: undefined;
  TeacherList: undefined;
  TeacherForm: { teacherId?: number };
  StudentList: undefined;
  StudentForm: { studentId?: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();
export function AppNavigator() {
  const { user } = useAuth();

  return (
    <Stack.Navigator>
      {!user ? (
        <Stack.Screen name="Login" component={LoginScreen} />
      ) : (
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="PostDetail" component={PostDetailScreen} />
          {user.role === 'teacher' && (
            <>
              <Stack.Screen name="CreatePost" component={CreatePostScreen} />
              <Stack.Screen name="EditPost" component={EditPostScreen} />
              <Stack.Screen name="Admin" component={AdminScreen} />
              <Stack.Screen name="TeacherList" component={TeacherListScreen} />
              <Stack.Screen name="TeacherForm" component={TeacherFormScreen} />
              <Stack.Screen name="StudentList" component={StudentListScreen} />
              <Stack.Screen name="StudentForm" component={StudentFormScreen} />
            </>
          )}
        </>
      )}
    </Stack.Navigator>
  );
}
