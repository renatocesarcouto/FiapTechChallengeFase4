import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#ffebee',
    borderRadius: 4,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  text: {
    color: '#c62828',
    fontSize: 14,
  },
});

export default ErrorMessage;
