import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Post } from '../../types';

interface PostCardProps {
  post: Post;
  onPress?: () => void;
}

const PostCard = ({ post, onPress }: PostCardProps) => {
  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={onPress}
    >
      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.author}>Por {post.author}</Text>
      <Text style={styles.content} numberOfLines={3}>
        {post.content}
      </Text>
      <Text style={styles.date}>{new Date(post.date).toLocaleDateString()}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  author: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  content: {
    fontSize: 14,
    color: '#444',
    marginBottom: 8,
  },
  date: {
    fontSize: 12,
    color: '#999',
  },
});

export default PostCard;
