import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Teacher } from '../../types';

interface TeacherCardProps {
  teacher: Teacher;
  onPress?: () => void;
}

const TeacherCard = ({ teacher, onPress }: TeacherCardProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.info}>
        <Text style={styles.name}>{teacher.name}</Text>
        <Text style={styles.email}>{teacher.email}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});

export default TeacherCard;
