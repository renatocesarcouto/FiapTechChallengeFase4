import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAuth } from '../contexts/AuthContext';
import HomeScreen from '../screens/HomeScreen';
import TeacherListScreen from '../screens/teachers/TeacherListScreen';
import StudentListScreen from '../screens/students/StudentListScreen';

const Tab = createBottomTabNavigator();

export const RoleBasedNavigator = () => {
  const { user } = useAuth();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#4CAF50',
        tabBarInactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
      />
      {user?.role === 'teacher' && (
        <>
          <Tab.Screen 
            name="Teachers" 
            component={TeacherListScreen}
          />
          <Tab.Screen 
            name="Students" 
            component={StudentListScreen}
          />
        </>
      )}
    </Tab.Navigator>
  );
};