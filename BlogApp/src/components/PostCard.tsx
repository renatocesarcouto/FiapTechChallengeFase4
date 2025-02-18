import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import type { Post } from '../types';

type Props = {
  post: Post;
  onPress: () => void;
};

const PostCard = ({ post, onPress }: Props) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.card}>
        <Text style={styles.title}>{post.title}</Text>
        <Text style={styles.author}>Por {post.author}</Text>
        <Text style={styles.date}>
          {new Date(post.date).toLocaleDateString()}
        </Text>
        <Text style={styles.preview} numberOfLines={2}>
          {post.content}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 15,
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  author: {
    fontSize: 14,
    color: '#666',
  },
  date: {
    fontSize: 12,
    color: '#999',
  },
  preview: {
    marginTop: 10,
    color: '#333',
  },
});

export default PostCard;
