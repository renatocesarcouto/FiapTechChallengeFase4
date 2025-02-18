import React, { useState, useEffect } from 'react';
import { View, FlatList, Button, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { getPosts, deletePost } from '../../services/api';
import { Post } from '../../types';

type RootStackParamList = {
  EditPost: { postId: number };
  CreatePost: undefined;
};

type NavigationProps = NavigationProp<RootStackParamList>;

const AdminScreen = () => {
  const navigation = useNavigation<NavigationProps>();  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const response = await getPosts();
      setPosts(response.data);
    } catch (error) {
      console.error('Erro ao carregar postagens:', error);
    }
  };

  const handleDelete = async (postId: number) => {
    try {
      await deletePost(postId);
      loadPosts();
    } catch (error) {
      console.error('Erro ao excluir postagem:', error);
    }
  };

  const renderItem = ({ item }: { item: Post }) => (
    <View style={styles.postItem}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.author}>Por {item.author}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.editButton}
          onPress={() => navigation.navigate('EditPost', { postId: item.id })}
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.deleteButton}
          onPress={() => handleDelete(item.id)}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Button 
        title="Adicionar postagem" 
        onPress={() => navigation.navigate('CreatePost')}
      />
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  postItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  author: {
    fontSize: 14,
    color: '#666',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  editButton: {
    backgroundColor: '#4CAF50',
    padding: 8,
    borderRadius: 5,
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: '#f44336',
    padding: 8,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
  },
});

export default AdminScreen;
