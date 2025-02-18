import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useRoute, RouteProp, useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import Button from '../components/Button';
import api from '../services/api';
import axios, { AxiosError } from 'axios';

type StudentDetailRouteProp = RouteProp<RootStackParamList, 'StudentDetail'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const StudentDetailScreen = () => {
  const route = useRoute<StudentDetailRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const [studentData, setStudentData] = useState(route.params.student);
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      const loadStudentData = async () => {
        try {
          const response = await api.get(`/students/${route.params.student.id}`);
          setStudentData(response.data);
        } catch (error) {
          console.log('Erro ao carregar estudante:', error);
        }
      };
      
      loadStudentData();
    }, [route.params.student.id])
  );

  const handleDelete = async () => {
    Alert.alert(
      'Ecluir estudante',
      'Ter certeza que deseja excluir esse estudante?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              setLoading(true);
              await api.delete(`/students/${studentData.id}`);
              navigation.goBack();
            } catch (error) {
              const axiosError = error as AxiosError<{ error: string }>;
              Alert.alert('Erro', axiosError.response?.data?.error || 'Falha ao excluir estudante');
            } finally {
              setLoading(false);
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name:</Text>
      <Text style={styles.value}>{studentData.name}</Text>
      
      <Text style={styles.label}>Email:</Text>
      <Text style={styles.value}>{studentData.email}</Text>
      
      <View style={styles.actions}>
        <Button 
          title="Alterar estudante"
          onPress={() => navigation.navigate('EditStudent', { student: studentData })}
        />
        <Button 
          title={loading ? "Excluindo..." : "Excluir estudante"}
          onPress={handleDelete}
          disabled={loading}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    color: '#666',
    marginTop: 16,
  },
  value: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 4,
  },
  actions: {
    marginTop: 32,
    gap: 16,
  },
});

export default StudentDetailScreen;
