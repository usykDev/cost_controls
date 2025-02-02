import { gql } from "@apollo/client";

export const GET_AUTHENTICATED_USER = gql`
  query GetAuthenticatedUser {
    authUser {
      _id
      username
      name
      avatar
    }
  }
`;

export const GET_USER_AND_TRANSACTIONS = gql`
query GetUserAndTransactions($userId: ID!) {
  user(userId: $userId) {
    _id
    name
    username
    avatar
    # relationships
    transactions {
      _id
      amount
      category
      date
      description
      location
      paymentType
    }
  }
}`