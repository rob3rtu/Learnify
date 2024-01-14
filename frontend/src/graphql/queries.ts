import { gql } from "@apollo/client";

export const VERIFY_TOKEN = gql`
  query verifyToken($token: String!) {
    verifyToken(token: $token) {
      id
      fullName
      email
      role
      profileImage
    }
  }
`;
