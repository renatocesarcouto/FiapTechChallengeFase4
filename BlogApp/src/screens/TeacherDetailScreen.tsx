import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useRoute, RouteProp, useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import Button from '../components/Button';
import api from '../services/api';
import axios, { AxiosError } from 'axios';

type TeacherDetailRouteProp = RouteProp<RootStackParamList, 'TeacherDetail'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const TeacherDetailScreen = () => {
  const route = useRoute<TeacherDetailRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const [teacherData, setTeacherData] = useState(route.params.teacher);
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      const loadTeacherData = async () => {
        try {
          const response = await api.get(`/teachers/${route.params.teacher.id}`);
          setTeacherData(response.data);
        } catch (error) {
          console.log('Erro ao carregar professor(a):', error);
        }
      };
      
      loadTeacherData();
    }, [route.params.teacher.id])
  );

  const handleDelete = async () => {
    Alert.alert(
      'Excluir professor(a)',
      'Ter certeza que deseja excluir esse(a) professor(a)?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              setLoading(true);
              await api.delete(`/teachers/${teacherData.id}`);
              navigation.goBack();
            } catch (error) {
              const axiosError = error as AxiosError<{ error: string }>;
              Alert.alert('Erro', axiosError.response?.data?.error || 'Falha ao excluir professor(a)');
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
      <Text style={styles.label}>Nome:</Text>
      <Text style={styles.value}>{teacherData.name}</Text>
      
      <Text style={styles.label}>Email:</Text>
      <Text style={styles.value}>{teacherData.email}</Text>
      
      <View style={styles.actions}>
        <Button 
          title="Alterar professor(a)"
          onPress={() => navigation.navigate('EditTeacher', { teacher: teacherData })}
        />
        <Button 
          title={loading ? "Excluindo..." : "Excluir professor(a)"}
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

export default TeacherDetailScreen;
