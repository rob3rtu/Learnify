export interface AccountInterface {
  id: string;
  email: string;
  fullName: string;
  role: string;
  profileImage: string | null;
}

export interface TeacherInterface {
  email: string;
  name: string;
}
