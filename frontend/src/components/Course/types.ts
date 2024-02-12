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
  resourseType: string;
  resourceUrl: string;
  classSection: string;
  user: AccountInterface;
}
