import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { createPost } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';

type RootStackParamList = {
  Home: undefined;
};

type NavigationProps = NavigationProp<RootStackParamList>;

const CreatePostScreen = () => {
  const navigation = useNavigation<NavigationProps>();
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // Only teachers can access this screen
  if (user?.role !== 'teacher') {
    navigation.goBack();
    return null;
  }

  const handleSubmit = async () => {
    try {
      await createPost({
        title,
        content,
        author: user.email, // Using email instead of name
        date: new Date().toISOString(),
      });
      navigation.navigate('Home');
    } catch (error) {
      console.error('Erro ao criar postagem:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Título"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.contentInput}
        placeholder="Conteúdo"
        value={content}
        onChangeText={setContent}
        multiline
      />
      <Button title="Adicionar postagem" onPress={handleSubmit} />
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
  contentInput: {
    height: 200,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
    textAlignVertical: 'top',
  },
});

export default CreatePostScreen;