import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Alert } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import Button from '../components/Button';
import api from '../services/api';

type EditPostRouteProp = RouteProp<RootStackParamList, 'EditPost'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const EditPostScreen = () => {
  const route = useRoute<EditPostRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const { post } = route.params;

  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!title || !content) {
      Alert.alert('Erro', 'Por favor preencha todos os campos');
      return;
    }

    try {
      setLoading(true);
      await api.put(`/posts/${post.id}`, {
        title,
        content,
        author: post.author
      });
      navigation.goBack();
    } catch (error) {
      console.log('Erro ao atualizar postagem:', error);
      Alert.alert('Erro', 'Falha ao atualizar postagem');
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
        title={loading ? "Alterando..." : "Alterar postagem"} 
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

export default EditPostScreen;
