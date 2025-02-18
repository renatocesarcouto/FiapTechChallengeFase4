import { Post, Teacher, Student } from './index';

export type RootStackParamList = {
  Home: undefined;
  NewPost: undefined;
  ManageStudents: undefined;
  AllPosts: undefined;
  PostDetail: { post: Post };
  TeachersManagement: undefined;
  NewTeacher: undefined;
  TeacherDetail: { teacher: Teacher };
  EditTeacher: { teacher: Teacher };
  EditPost: { post: Post };
  StudentDetail: { student: Student };
  EditStudent: { student: Student };
  NewStudent: undefined;
  Login: undefined;
};