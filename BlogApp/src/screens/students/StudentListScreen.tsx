import React, { useState, useEffect } from 'react';
import { View, FlatList, Button, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { getStudents, deleteStudent } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import { Student } from '../../types';

type RootStackParamList = {
  StudentForm: { studentId?: number };
};

type NavigationProps = NavigationProp<RootStackParamList>;

const StudentListScreen = () => {
  const navigation = useNavigation<NavigationProps>();
  const { user } = useAuth();
  const [students, setStudents] = useState<Student[]>([]);

  if (user?.role !== 'teacher') {
    navigation.goBack();
    return null;
  }

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      const response = await getStudents();
      setStudents(response.data);
    } catch (error) {
      console.error('Erro ao carregar estudante:', error);
    }
  };

  const handleDelete = (studentId: number) => {
    Alert.alert(
      'Excluir estudante',
      'Tem certeza que deseja excluir esse estudante?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          onPress: async () => {
            try {
              await deleteStudent(studentId);
              loadStudents();
            } catch (error) {
              console.error('Erro ao excluir estudante:', error);
            }
          },
          style: 'destructive',
        },
      ]
    );
  };

  const renderItem = ({ item }: { item: Student }) => (
    <View style={styles.studentItem}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.email}>{item.email}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.editButton}
          onPress={() => navigation.navigate('StudentForm', { studentId: item.id })}
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
        title="Adicionar estudante" 
        onPress={() => navigation.navigate('StudentForm', { studentId: undefined })}
      />
      <FlatList
        data={students}
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
  studentItem: {
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

export default StudentListScreen;