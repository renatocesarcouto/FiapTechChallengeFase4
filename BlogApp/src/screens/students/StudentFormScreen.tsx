import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { useNavigation, useRoute, NavigationProp, RouteProp } from '@react-navigation/native';
import { createStudent, updateStudent, getStudent } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';

type RootStackParamList = {
  StudentForm: { studentId?: number };
  StudentList: undefined;
};

type NavigationProps = NavigationProp<RootStackParamList>;
type RouteProps = RouteProp<RootStackParamList, 'StudentForm'>;

const StudentFormScreen = () => {
  const navigation = useNavigation<NavigationProps>();
  const route = useRoute<RouteProps>();
  const { user } = useAuth();
  const studentId = route.params?.studentId;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (user?.role !== 'teacher') {
    navigation.goBack();
    return null;
  }

  useEffect(() => {
    if (studentId) {
      loadStudent();
    }
  }, [studentId]);

  const loadStudent = async () => {
    try {
      if (typeof studentId === 'number') {
        const response = await getStudent(studentId);
        const student = response.data;
        setName(student.name);
        setEmail(student.email);
      }
    } catch (error) {
      console.error('Erro ao carregar estudante:', error);
    }
  };

  const handleSubmit = async () => {
    try {
      const studentData = {
        name,
        email,
        ...(password ? { password } : {}),
      };

      if (studentId) {
        await updateStudent(studentId, studentData);
      } else {
        await createStudent({ ...studentData, password: password || '' });
      }
      navigation.navigate('StudentList');
    } catch (error) {
      console.error('Erro ao salvar estudante:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {!studentId && (
        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      )}
      <Button 
        title={studentId ? "Atualizar estudante" : "Adicionar estudante"} 
        onPress={handleSubmit}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});

export default StudentFormScreen;