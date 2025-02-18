import React, { useState, useCallback } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { Student } from '../types';
import Button from '../components/Button';
import StudentCard from '../components/StudentCard';
import api from '../services/api';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const ManageStudentsScreen = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<NavigationProp>();

  const loadStudents = async () => {
    try {
      setLoading(true);
      const response = await api.get('/students');
      setStudents(response.data);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadStudents();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Button 
        title="Adicionar estudante" 
        onPress={() => navigation.navigate('NewStudent')}
      />
      <FlatList
        data={students}
        renderItem={({ item }) => (
          <StudentCard 
            student={item}
            onPress={() => navigation.navigate('StudentDetail', { student: item })}
          />
        )}
        keyExtractor={item => item.id.toString()}
        refreshing={loading}
        onRefresh={loadStudents}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  }
});

export default ManageStudentsScreen;
