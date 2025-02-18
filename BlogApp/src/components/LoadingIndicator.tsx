import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

interface LoadingIndicatorProps {
  size?: 'small' | 'large';
  color?: string;
}

const LoadingIndicator = ({ 
  size = 'large', 
  color = '#4CAF50' 
}: LoadingIndicatorProps) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoadingIndicator;
