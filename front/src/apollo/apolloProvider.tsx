"use client";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

export const client = new ApolloClient({
  uri:
    process.env.NODE_ENV === "development"
      ? process.env.NEXT_PUBLIC_GRAPHQL_URI_DEV
      : process.env.NEXT_PUBLIC_GRAPHQL_URI_PROD,

  cache: new InMemoryCache(),
  credentials: "include", // For sending cookies alongside the request
});

const ApolloProviderClient = ({ children }: { children: React.ReactNode }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloProviderClient;
