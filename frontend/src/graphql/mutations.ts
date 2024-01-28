import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Login($email: String!) {
    login(email: $email)
  }
`;

export const SAVE_PROFILE_IMAGE = gql`
  mutation saveProfileImage($downloadURL: String!) {
    saveProfileImage(url: $downloadURL)
  }
`;

export const ADD_COURSE = gql`
  mutation addCourse(
    $shortName: String!
    $longName: String!
    $domain: String!
    $year: Int!
    $semester: Int!
  ) {
    addCourse(
      course: {
        shortName: $shortName
        longName: $longName
        domain: $domain
        year: $year
        semester: $semester
      }
    ) {
      id
      shortName
      longName
      domain
      year
      semester
    }
  }
`;

export const DELETE_COURSE = gql`
  mutation deleteCourse($id: String!) {
    deleteCourse(id: $id)
  }
`;
