import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider, useAuth } from './src/contexts/AuthContext';
import AppRoutes from './src/routes/app.routes';
import AuthRoutes from './src/routes/auth.routes';
import LoadingScreen from './src/screens/LoadingScreen';

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </NavigationContainer>
  );
}

function Routes() {
  const { loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  return <AppRoutes />;
}