import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import Button from '../components/Button';
import PostList from '../components/PostList';
import { useAuth } from '../contexts/AuthContext';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const HomeScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigation = useNavigation<NavigationProp>();
  const { user, signOut } = useAuth();

  return (
    <View style={styles.container}>
      {user?.role === 'teacher' && (
        <View style={styles.adminButtons}>
          <Button 
            title="Adicionar nova postagem" 
            onPress={() => navigation.navigate('NewPost')} 
          />
          <Button 
            title="Gerenciar estudantes" 
            onPress={() => navigation.navigate('ManageStudents')} 
          />
          <Button 
            title="Gerenciar professores(as)" 
            onPress={() => navigation.navigate('TeachersManagement')} 
          />
          <Button 
            title="Ver todas postagens" 
            onPress={() => navigation.navigate('AllPosts')} 
          />
        </View>
      )}
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar postagens..."
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      <PostList searchTerm={searchTerm} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 16,
  },
  authButton: {
    width: 100,
  },
  adminButtons: {
    gap: 8,
    marginBottom: 16,
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
});

export default HomeScreen;