import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { useNavigation, useRoute, NavigationProp, RouteProp } from '@react-navigation/native';
import { createTeacher, updateTeacher, getTeacher } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';

type RootStackParamList = {
  TeacherForm: { teacherId?: number };
  TeacherList: undefined;
};

type NavigationProps = NavigationProp<RootStackParamList>;
type RouteProps = RouteProp<RootStackParamList, 'TeacherForm'>;

const TeacherFormScreen = () => {
  const navigation = useNavigation<NavigationProps>();
  const route = useRoute<RouteProps>();
  const { user } = useAuth();
  const teacherId = route.params?.teacherId;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (user?.role !== 'teacher') {
    navigation.goBack();
    return null;
  }

  useEffect(() => {
    if (teacherId) {
      loadTeacher();
    }
  }, [teacherId]);

  const loadTeacher = async () => {
    try {
      if (typeof teacherId === 'number') {
        const response = await getTeacher(teacherId);
        const teacher = response.data;
        setName(teacher.name);
        setEmail(teacher.email);
      }
    } catch (error) {
      console.error('Error loading teacher:', error);
    }
  };

  const handleSubmit = async () => {
    try {
      const teacherData = {
        name,
        email,
        ...(password ? { password } : {}),
      };

      if (teacherId) {
        await updateTeacher(teacherId, teacherData);
      } else {
        await createTeacher({ ...teacherData, password: password || '' });
      }
      navigation.navigate('TeacherList');
    } catch (error) {
      console.error('Error saving teacher:', error);
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
      {!teacherId && (
        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      )}
      <Button 
        title={teacherId ? "Alterar professor(a)" : "Criar professor(a)"} 
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

export default TeacherFormScreen;