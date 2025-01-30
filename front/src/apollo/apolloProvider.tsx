"use client";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(), // Apollo Client uses to cache results after fetching them - provides optimised performance
  credentials: "include", // allows Apollo Client to send cookies alongside our requests to the server
});

import React from "react";

const ApolloProviderClient = ({ children }: { children: React.ReactNode }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloProviderClient;
