import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Alert } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import Button from '../components/Button';
import api from '../services/api';

type EditTeacherRouteProp = RouteProp<RootStackParamList, 'EditTeacher'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const EditTeacherScreen = () => {
  const route = useRoute<EditTeacherRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const { teacher } = route.params;

  const [name, setName] = useState(teacher.name);
  const [email, setEmail] = useState(teacher.email);
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
      
      await api.put(`/teachers/${teacher.id}`, data);
      navigation.goBack();
    } catch (error) {
      console.log('Error updating teacher:', error);
      Alert.alert('Erro', 'Falha ao alterar professor(a)');
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
        title={loading ? "Alterando..." : "Alterar professor(a)"} 
        onPress={handleSubmit}
        disabled={loading}
      />
    </View>
  );
};

export default EditTeacherScreen;

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
  }
});
