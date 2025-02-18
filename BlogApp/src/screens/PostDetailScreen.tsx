import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { useRoute, RouteProp, useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import Button from '../components/Button';

type PostDetailRouteProp = RouteProp<RootStackParamList, 'PostDetail'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const PostDetailScreen = () => {
  const route = useRoute<PostDetailRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const { user } = useAuth();
  const [post, setPost] = useState(route.params.post);
  
  useFocusEffect(
    React.useCallback(() => {
      const loadPost = async () => {
        const response = await api.get(`/posts/${post.id}`);
        setPost(response.data);
      };
      loadPost();
    }, [post.id])
  );

  const handleDeletePost = async () => {
    try {
      await api.delete(`/posts/${post.id}`);
      navigation.goBack();
    } catch (error) {
      console.log('Erro ao excluir postagem:', error);
      Alert.alert('Erro', 'Falha ao excluir postagem');
    }
  };

  const handleEditPost = () => {
    navigation.navigate('EditPost', { post });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.author}>Por {post.author}</Text>
      <Text style={styles.date}>
        {new Date(post.date).toLocaleDateString()}
      </Text>
      <Text style={styles.content}>{post.content}</Text>
      
      {user?.role === 'teacher' && (
        <View style={styles.actions}>
          <Button 
            title="Alterar postagem" 
            onPress={handleEditPost}
          />
          <Button 
            title="Excluir postagem" 
            onPress={handleDeletePost}
          />
        </View>
      )}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  author: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
    color: '#999',
    marginBottom: 16,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  actions: {
    marginTop: 24,
    gap: 8,
  },
});

export default PostDetailScreen;