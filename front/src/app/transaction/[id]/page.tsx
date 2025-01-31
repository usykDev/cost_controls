"use client";

import TransactionFormSkeleton from "@/components/skeletons/TransactionFormSkeleton";
import Logout from "@/components/ui/Logout";
import { useParams } from "next/navigation";
import { useMutation, useQuery } from "@apollo/client";
import { GET_TRANSACTION } from "@/graphql/queries/transaction.query";
import { FormEvent, useEffect, useState } from "react";
import { UPDATE_TRANSACTION } from "@/graphql/queries/transaction.query";
import toast from "react-hot-toast";


const Transaction = () => {
  const { id } = useParams();
  const { data, loading } = useQuery(GET_TRANSACTION, {
    variables: { transactionId: id },
  });

  const [formData, setFormData] = useState({
    description: data?.transaction?.description || "",
    paymentType: data?.transaction?.paymentType || "",
    category: data?.transaction?.category || "",
    amount: data?.transaction?.amount || "",
    location: data?.transaction?.location || "",
    date: data?.transaction?.date || "",
  });

  const [updateTransaction, { loading: loadingUpdate }] =
    useMutation(UPDATE_TRANSACTION);

  useEffect(() => {
    if (data) {
      setFormData({
        description: data?.transaction?.description,
        paymentType: data?.transaction?.paymentType,
        category: data?.transaction?.category,
        amount: data?.transaction?.amount,
        location: data?.transaction?.location,
        date: new Date(+data.transaction.date).toISOString().slice(0, 10),
      });
    }
  }, [data]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const amount = parseFloat(formData.amount);
    try {
      await updateTransaction({
        variables: {
          input: { ...formData, amount, transactionId: id },
        },
      });
      toast.success("Transaction updated successfully");
    } catch (error) {
      console.error("Error:", error);
      toast.error((error as Error).message);
    }
  };

  if (loading) return <TransactionFormSkeleton />;

  return (
    <>
      <Logout />

      <div className="flex flex-col justify-center items-center">
        <p className="text-2xl font-bold text-center relative z-50 mb-4 bg-gradient-to-r from-secondary-300 via-pink-400 to-secondary-300 inline-block text-transparent bg-clip-text">
          Update this transaction
        </p>

        {/* <TransactionForm /> */}

        <form
          className="z-50 w-full max-w-lg flex flex-col justify-center gap-5 px-3 "
          onSubmit={handleSubmitUpdate}
        >
          {/* TRANSACTION */}
          <div className="flex ">
            <div className="w-full">
              <label
                className="block uppercase tracking-wide text-primary-medium text-xs font-bold mb-2"
                htmlFor="description"
              >
                Transaction
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="description"
                name="description"
                type="text"
                placeholder="Rent, Groceries, Salary, etc."
                value={formData.description}
                onChange={handleInputChange}
              />
            </div>
          </div>
          {/* PAYMENT TYPE */}
          <div className="flex flex-wrap gap-3">
            <div className="w-full flex-1 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-primary-medium text-xs font-bold mb-2"
                htmlFor="paymentType"
              >
                Payment Type
              </label>
              <div className="relative">
                <select
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="paymentType"
                  name="paymentType"
                  value={formData.paymentType}
                  onChange={handleInputChange}
                >
                  <option value={"card"}>Card</option>
                  <option value={"cash"}>Cash</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* CATEGORY */}
            <div className="w-full flex-1 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-primary-medium text-xs font-bold mb-2"
                htmlFor="category"
              >
                Category
              </label>
              <div className="relative">
                <select
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                >
                  <option value={"saving"}>Saving</option>
                  <option value={"expense"}>Expense</option>
                  <option value={"investment"}>Investment</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* AMOUNT */}
            <div className="w-full flex-1 mb-6 md:mb-0">
              <label
                className="block uppercase text-primary-medium text-xs font-bold mb-2"
                htmlFor="amount"
              >
                Amount($)
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="amount"
                name="amount"
                type="number"
                placeholder="150"
                value={formData.amount}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* LOCATION */}
          <div className="flex flex-wrap gap-3">
            <div className="w-full flex-1 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-primary-medium text-xs font-bold mb-2"
                htmlFor="location"
              >
                Location
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="location"
                name="location"
                type="text"
                placeholder="New York"
                value={formData.location}
                onChange={handleInputChange}
              />
            </div>

            {/* DATE */}
            <div className="w-full flex-1">
              <label
                className="block uppercase tracking-wide text-primary-medium text-xs font-bold mb-2"
                htmlFor="date"
              >
                Date
              </label>
              <input
                type="date"
                name="date"
                id="date"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-[11px] px-4 mb-3 leading-tight focus:outline-none
                             focus:bg-white"
                placeholder="Select date"
                value={formData.date}
                onChange={handleInputChange}
              />
            </div>
          </div>
          {/* SUBMIT BUTTON */}
          <button
            className="text-white font-bold w-full rounded px-4 py-2 bg-gradient-to-br
              from-pink-500 to-pink-500 hover:from-pink-600 hover:to-pink-600
                            disabled:opacity-70 disabled:cursor-not-allowed"
            type="submit"
            disabled={loadingUpdate}
          >
            {loadingUpdate ? "Loading ..." : "Update Transaction"}
          </button>
        </form>
      </div>
    </>
  );
};

export default Transaction;
