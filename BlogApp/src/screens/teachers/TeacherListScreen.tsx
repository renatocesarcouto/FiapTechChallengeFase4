import React, { useState, useEffect } from 'react';
import { View, FlatList, Button, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { getTeachers, deleteTeacher } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import { Teacher } from '../../types';

type RootStackParamList = {
  TeacherForm: { teacherId?: number };
};

type NavigationProps = NavigationProp<RootStackParamList>;

const TeacherListScreen = () => {
  const navigation = useNavigation<NavigationProps>();
  const { user } = useAuth();
  const [teachers, setTeachers] = useState<Teacher[]>([]);

  // Only teachers can access this screen
  if (user?.role !== 'teacher') {
    navigation.goBack();
    return null;
  }

  useEffect(() => {
    loadTeachers();
  }, []);

  const loadTeachers = async () => {
    try {
      const response = await getTeachers();
      setTeachers(response.data);
    } catch (error) {
      console.error('Error loading teachers:', error);
    }
  };

  const handleDelete = (teacherId: number) => {
    Alert.alert(
      'Excluir professor(a)',
      'Tem certeza que deseja excluir esse professor(a)?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          onPress: async () => {
            try {
              await deleteTeacher(teacherId);
              loadTeachers();
            } catch (error) {
              console.error('Erro ao excluir professor(a):', error);
            }
          },
          style: 'destructive',
        },
      ]
    );
  };

  const renderItem = ({ item }: { item: Teacher }) => (
    <View style={styles.teacherItem}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.email}>{item.email}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.editButton}
          onPress={() => navigation.navigate('TeacherForm', { teacherId: item.id })}
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.deleteButton}
          onPress={() => handleDelete(item.id)}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Button 
        title="Adicionar professor(a)" 
        onPress={() => navigation.navigate('TeacherForm', { teacherId: undefined })}
      />
      <FlatList
        data={teachers}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  teacherItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 14,
    color: '#666',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
    gap: 10,
  },
  editButton: {
    backgroundColor: '#4CAF50',
    padding: 8,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: '#f44336',
    padding: 8,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
  },
});

export default TeacherListScreen;