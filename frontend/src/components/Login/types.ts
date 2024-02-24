import { PostInterface } from "../Course/types";

export interface AccountInterface {
  id: string;
  email: string;
  fullName: string;
  role: string;
  profileImage: string | null;
  posts: PostInterface[];
}

export interface TeacherInterface {
  email: string;
  name: string;
}
