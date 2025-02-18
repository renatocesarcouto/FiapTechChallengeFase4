import React from 'react';
import { StyleSheet, StyleProp, ViewStyle, TouchableOpacity, Text } from 'react-native';

type ButtonProps = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
} & React.ComponentProps<typeof TouchableOpacity>;

const Button: React.FC<ButtonProps> = ({ title, onPress, disabled, style, ...props }) => {
  return (
    <TouchableOpacity 
      {...props}
      style={[styles.button, disabled && styles.disabled, style]} 
      onPress={onPress}
      disabled={disabled}
    >
        <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  disabled: {
    opacity: 0.6,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Button;
