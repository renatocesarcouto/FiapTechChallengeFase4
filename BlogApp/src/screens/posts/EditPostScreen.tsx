import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, ScrollView, Alert } from 'react-native';
import { useNavigation, useRoute, NavigationProp, RouteProp } from '@react-navigation/native';
import { getPost, updatePost, deletePost } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';

type RootStackParamList = {
  EditPost: { postId: number };
  Home: undefined;
};

type NavigationProps = NavigationProp<RootStackParamList>;
type RouteProps = RouteProp<RootStackParamList, 'EditPost'>;

const EditPostScreen = () => {
  const navigation = useNavigation<NavigationProps>();
  const route = useRoute<RouteProps>();
  const { user } = useAuth();
  const { postId } = route.params;

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // Only teachers can access this screen
  if (user?.role !== 'teacher') {
    navigation.goBack();
    return null;
  }

  useEffect(() => {
    loadPost();
  }, []);

  const loadPost = async () => {
    try {
      const response = await getPost(postId);
      const post = response.data;
      setTitle(post.title);
      setContent(post.content);
    } catch (error) {
      console.error('Erro ao carregar postagem:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      await updatePost(postId, {
        title,
        content,
      });
      navigation.navigate('Home');
    } catch (error) {
      console.error('Erro ao atualizar postagem:', error);
    }
  };

  const handleDelete = () => {
    Alert.alert(
      'Apagar postagem',
      'Tem certeza que deseja apagar essa postagem?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Apagar',
          onPress: async () => {
            try {
              await deletePost(postId);
              navigation.navigate('Home');
            } catch (error) {
              console.error('Erro ao apagar postagem:', error);
            }
          },
          style: 'destructive',
        },
      ]
    );
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
      <View style={styles.buttonContainer}>
        <Button title="Atualizar postagem" onPress={handleUpdate} />
        <Button title="Excluir postagem" onPress={handleDelete} color="#ff0000" />
      </View>
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
  buttonContainer: {
    gap: 10,
  },
});

export default EditPostScreen;