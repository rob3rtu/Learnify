import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Login($email: String!) {
    login(email: $email)
  }
`;

export const SAVE_PROFILE_IMAGE = gql`
    mutation saveProfileImage($downloadURL: String!) {
            saveProfileImage(url: $$downloadURL)
          }
`;
