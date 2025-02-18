import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

const SearchBar = ({ 
  value, 
  onChangeText, 
  placeholder = 'Busca...' 
}: SearchBarProps) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#666"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 16,
    borderRadius: 20,
    fontSize: 16,
  },
});

export default SearchBar;
