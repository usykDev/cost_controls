import { gql } from "@apollo/client";

export const GET_TRANSACTIONS = gql`
  query GetTransactions {
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
`;

export const GET_TRANSACTION = gql`
  query GetTransaction($transactionId: ID!) {
    transaction(transactionId: $transactionId) {
      _id
      amount
      category
      date
      description
      location
      paymentType
    }
  }
`;

export const UPDATE_TRANSACTION = gql`
  mutation UpdateTransaction($input: UpdateTransactionInput!) {
    updateTransaction(input: $input) {
      _id
      amount
      category
      date
      description
      location
      paymentType
    }
  }
`;

export const GET_TRANSACTION_STATISTICS = gql`
query CategoryStatistics {
  categoryStatistics {
    category
    totalAmount
  }
}` 
