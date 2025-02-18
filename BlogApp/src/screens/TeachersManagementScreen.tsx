import React, { useState, useCallback } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import Button from '../components/Button';
import TeacherCard from '../components/TeacherCard';
import api from '../services/api';
import { Teacher } from '../types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const TeachersManagementScreen = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<NavigationProp>();

  const loadTeachers = async () => {
    try {
      setLoading(true);
      const response = await api.get('/teachers');
      setTeachers(response.data);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadTeachers();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Button 
        title="Adicionar professor(a)" 
        onPress={() => navigation.navigate('NewTeacher')}
      />
      <FlatList
        data={teachers}
        renderItem={({ item }) => (
          <TeacherCard 
            teacher={item}
            onPress={() => navigation.navigate('TeacherDetail', { teacher: item })}
          />
        )}
        keyExtractor={item => item.id.toString()}
        refreshing={loading}
        onRefresh={loadTeachers}
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

export default TeachersManagementScreen;
