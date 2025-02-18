import React, { useState, useEffect } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import PostCard from '../PostCard';
import api from '../../services/api';
import { Post } from '../../types';
import { RootStackParamList } from '../../types/navigation';

interface PostListProps {
  searchTerm: string;
}

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const PostList = ({ searchTerm }: PostListProps) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<NavigationProp>();
  const loadPosts = async () => {
    try {
      setLoading(true);
      const response = await api.get(searchTerm ? `/posts/search?term=${searchTerm}` : '/posts');
      setPosts(response.data);
    } finally {
      setLoading(false);
    }
  };

    useFocusEffect(
      React.useCallback(() => {
        loadPosts();
      }, [searchTerm])
    );

  return (
    <FlatList
      data={posts}
      renderItem={({ item }) => (
        <PostCard 
          post={item}
          onPress={() => navigation.navigate('PostDetail', { post: item })}
        />
      )}
      keyExtractor={item => item.id.toString()}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={loadPosts} />
      }
    />
  );
};

export default PostList;
