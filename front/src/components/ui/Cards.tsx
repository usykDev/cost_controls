"use client";

import { useQuery } from "@apollo/client";
import Card from "./Card";
import { GET_TRANSACTIONS } from "@/graphql/queries/transaction.query";

import { Transaction } from "./Card";

const Cards = () => {
  const { data, loading, error } = useQuery(GET_TRANSACTIONS);

  //   if (error) return <p>Error: {error.message}</p>;
  //   if (loading) return <p>Loading ...</p>;

  //   console.log("cards:", data?.transactions);

  // todo => add relationships
  return (
    <div className="w-full px-3 min-h-[40vh]">
      <p className="text-4xl font-bold text-center text-primary-dark my-5">
        History
      </p>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-start mb-20">
        {!loading &&
          data?.transactions?.map((transaction: Transaction) => (
            <Card key={transaction._id} transaction={transaction} />
          ))}
      </div>
      {!loading && data?.transactions?.length === 0 && (
        <p className="text-2xl text-center w-full font-bold">
          No transaction history found
        </p>
      )}
    </div>
  );
};
export default Cards;
