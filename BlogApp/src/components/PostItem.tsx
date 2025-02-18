import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Post } from '../types';

interface PostItemProps {
  post: Post;
}

type RootStackParamList = {
  PostDetail: { post: Post };
};

type NavigationProps = NavigationProp<RootStackParamList>;

const PostItem = ({ post }: PostItemProps) => {
  const navigation = useNavigation<NavigationProps>();
  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={() => navigation.navigate('PostDetail', { post })}
    >
      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.author}>Por {post.author}</Text>
      <Text style={styles.date}>{new Date(post.date).toLocaleDateString()}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  author: {
    fontSize: 14,
    color: '#666',
  },
  date: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
});

export default PostItem;
