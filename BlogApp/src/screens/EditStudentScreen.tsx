import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Alert } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import Button from '../components/Button';
import api from '../services/api';
import axios, { AxiosError } from 'axios';

type EditStudentRouteProp = RouteProp<RootStackParamList, 'EditStudent'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const EditStudentScreen = () => {
  const route = useRoute<EditStudentRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const [studentData, setStudentData] = useState(route.params.student);
  const [name, setName] = useState(studentData.name);
  const [email, setEmail] = useState(studentData.email);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name || !email) {
      Alert.alert('Erro', 'Por favor preencha todos os campos');
      return;
    }

    try {
      setLoading(true);
      const data = {
        name,
        email,
        ...(password ? { password } : {})
      };
      
      await api.put(`/students/${studentData.id}`, data);
      navigation.goBack();
    } catch (error) {
      const axiosError = error as AxiosError<{ error: string }>;
      Alert.alert('Erro', axiosError.response?.data?.error || 'Falha ao atualizar estudante');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={name}
        onChangeText={setName}
        editable={!loading}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        editable={!loading}
      />
      <TextInput
        style={styles.input}
        placeholder="Nova senha (opcional)"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        editable={!loading}
      />
      <Button 
        title={loading ? "Alterando..." : "Alterar estudante"}
        onPress={handleSubmit}
        disabled={loading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
});

export default EditStudentScreen;
