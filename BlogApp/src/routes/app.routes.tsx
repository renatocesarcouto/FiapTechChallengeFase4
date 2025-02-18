import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import NewPostScreen from '../screens/NewPostScreen';
import ManageStudentsScreen from '../screens/ManageStudentsScreen';
import AllPostsScreen from '../screens/AllPostsScreen';
import PostDetailScreen from '../screens/PostDetailScreen';
import EditPostScreen from '../screens/EditPostScreen';
import TeachersManagementScreen from '../screens/TeachersManagementScreen';
import NewTeacherScreen from '../screens/NewTeacherScreen';
import TeacherDetailScreen from '../screens/TeacherDetailScreen';
import EditTeacherScreen from '../screens/EditTeacherScreen';
import StudentDetailScreen from '../screens/StudentDetailScreen';
import EditStudentScreen from '../screens/EditStudentScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import NewStudentScreen from '../screens/NewStudentScreen';
import { RootStackParamList } from '../types/navigation';
import { useAuth } from '../contexts/AuthContext';
import { TouchableOpacity, Text } from 'react-native';

const AppStack = createNativeStackNavigator<RootStackParamList>();

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const AppRoutes = () => {
  const { user, signOut } = useAuth();
  const navigation = useNavigation<NavigationProp>();

  const headerRight = () => (
    <TouchableOpacity 
      onPress={user ? signOut : () => navigation.navigate('Login')}
      style={{
        marginRight: 16,
        backgroundColor: '#007AFF',
        paddingHorizontal: 18,
        paddingVertical: 6,
        borderRadius: 6,
        width: 70,
        height: 30
      }}
    >
      <Text style={{ 
        color: '#FFFFFF', 
        fontSize: 14,
        width: 70,
        fontWeight: '600'
      }}>
        {user ? 'Sair' : 'Entrar'}
      </Text>
    </TouchableOpacity>
  );
  return (
    <AppStack.Navigator>
      <AppStack.Screen 
        name="Home" 
        component={HomeScreen}
        options={{ 
          title: 'Início',
          headerRight 
        }}
      />
      <AppStack.Screen name="Login" component={LoginScreen} />
      <AppStack.Screen 
        name="NewPost" 
        options={{ title: 'Adicionar Postagem' }}
        component={NewPostScreen} 
      />
      <AppStack.Screen 
        name="ManageStudents" 
        options={{ title: 'Estudantes' }}
        component={ManageStudentsScreen} 
      />
      <AppStack.Screen 
        name="AllPosts" 
        options={{ title: 'Todas postagens' }}
        component={AllPostsScreen} 
      />
      <AppStack.Screen 
        name="PostDetail"
        options={{ title: 'Detalhe Postagem' }}
        component={PostDetailScreen} 
      />
      <AppStack.Screen 
        name="EditPost" 
        options={{ title: 'Alterar postagem' }}
        component={EditPostScreen} 
      />
      <AppStack.Screen 
        name="TeachersManagement" 
        component={TeachersManagementScreen}
        options={{ title: 'Professores(as)' }}
      />
      <AppStack.Screen 
        name="NewTeacher" 
        component={NewTeacherScreen}
        options={{ title: 'Adicionar professor(a)' }}
      />
      <AppStack.Screen 
        name="TeacherDetail" 
        component={TeacherDetailScreen}
        options={{ title: 'Detalhe professor(a)' }}
      />
      <AppStack.Screen 
        name="EditTeacher" 
        component={EditTeacherScreen}
        options={{ title: 'Alterar professor(a)' }}
      />
      <AppStack.Screen 
        name="StudentDetail" 
        component={StudentDetailScreen}
        options={{ title: 'Detalhe estudante' }}
      />
      <AppStack.Screen 
        name="EditStudent" 
        component={EditStudentScreen}
        options={{ title: 'Alterar estudante' }}
      />
      <AppStack.Screen 
        name="NewStudent" 
        component={NewStudentScreen}
        options={{ title: 'Adicionar estudante' }}
      />
    </AppStack.Navigator>
  );
};
export default AppRoutes;