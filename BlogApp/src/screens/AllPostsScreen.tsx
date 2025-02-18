import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { Post } from '../types';
import PostCard from '../components/PostCard';
import api from '../services/api';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const AllPostsScreen = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<NavigationProp>();

  const loadPosts = async () => {
    try {
      setLoading(true);
      const response = await api.get('/posts/admin');
      setPosts(response.data);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      loadPosts();
    }, [])
  );

  const handlePostPress = (post: Post) => {
    navigation.navigate('PostDetail', { post });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <PostCard 
            post={item} 
            onPress={() => handlePostPress(item)}
          />
        )}
        keyExtractor={item => item.id.toString()}
        refreshing={loading}
        onRefresh={loadPosts}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
});

export default AllPostsScreen;