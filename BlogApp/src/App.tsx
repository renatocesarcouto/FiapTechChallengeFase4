import React from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { AuthNavigator } from './navigation/AuthNavigator';
import { StatusBar } from 'react-native';

function App(): React.JSX.Element {
  return (
    <AuthProvider>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <AuthNavigator />
    </AuthProvider>
  );
}

export default App;