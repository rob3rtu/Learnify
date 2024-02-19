import { AccountInterface } from "../Login/types";

export interface FullCourseInterface {
  id: string;
  shortName: string;
  longName: string;
  year: number;
  semester: number;
  domain: string;
  posts: PostInterface[];
}

export interface PostInterface {
  id: string;
  classId: string;
  userId: string;
  title: string;
  description: string;
  resourceType: string;
  resourceUrl: string;
  classSection: string;
  user: AccountInterface;
  likes: LikeInterface[];
  comments: CommentInterface[];
  createdAt: string;
}

interface LikeInterface {
  id: string;
  userId: string;
  postId: string;
}

interface CommentInterface {
  id: string;
  userId: string;
  postId: string;
  message: string;
  createdAt: string;
  user: AccountInterface;
}

export interface CourseFilters {
  section: "materials" | "courses" | "seminars" | "laboratory" | "forum";
}

export const courseFiltersObkect = [
  "materials",
  "courses",
  "seminars",
  "laboratory",
  "forum",
];

//filters from the sidebar

export interface SideSortingInterface {
  sortBy: "newest" | "oldest" | "mostlikes" | "leastlikes" | null;
}

export interface SideFiltersInterface {
  filterBy: "myposts" | "postsi'veliked" | null;
}

///forum

export interface ForumInterface {
  id: string;
  classId: string;
  messages: MessageInterface[];
}

interface MessageInterface {
  id: string;
  userId: string;
  forumId: string;
  message: string;
  createdAt: string;
  user: AccountInterface;
}

//teachers modal

export interface CourseTeacherInterface {
  id: string;
  classId: string;
  teacherId: string;
  teacher: GenericTeacherInterface;
}

export interface GenericTeacherInterface {
  id: string;
  userId: string;
  user: AccountInterface;
}
