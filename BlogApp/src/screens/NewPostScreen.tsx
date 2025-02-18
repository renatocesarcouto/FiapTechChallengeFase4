import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/Button';
import api from '../services/api';
const NewPostScreen = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const { user } = useAuth();

  const handleSubmit = async () => {
    if (!title || !content) {
      Alert.alert('Erro', 'Por favor preencha todos os campos');
      return;
    }

    try {
      setLoading(true);
      console.log('Adicionando postagem:', { title, content, author: user?.name, id: user?.id });
      await api.post('/posts', {
        title,
        content,
        author: user?.name,
        teacher_id: user?.id
      });
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', 'Falha ao adicionar postagem');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Título"
        value={title}
        onChangeText={setTitle}
        editable={!loading}
      />
      <TextInput
        style={[styles.input, styles.contentInput]}
        placeholder="Conteúdo"
        value={content}
        onChangeText={setContent}
        multiline
        editable={!loading}
      />
      <Button 
        title={loading ? "Adicionando..." : "Adicionar postagem"} 
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
  contentInput: {
    height: 200,
    textAlignVertical: 'top',
  },
});

export default NewPostScreen;