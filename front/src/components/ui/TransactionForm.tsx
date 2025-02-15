"use client";

import { FormEvent, useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_TRANSACTION } from "@/graphql/mutations/transaction.mutation";

import { toast } from "react-hot-toast";

const TransactionForm = () => {
  const [createTransaction, { loading, error }] = useMutation(
    CREATE_TRANSACTION,
    { refetchQueries: ["GetTransactions", "CategoryStatistics"] }
  );
  const [selectedPayment, setSelectedPayment] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleSubmitAdd = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const transactionData = {
      description: formData.get("description"), // goes from form attribute name="description"
      paymentType: formData.get("paymentType"),
      category: formData.get("category"),
      amount: parseFloat(formData.get("amount") as string),
      location: formData.get("location"),
      date: formData.get("date"),
    };
    try {
      await createTransaction({
        variables: {
          input: transactionData,
        },
      });

      form.reset();
      setSelectedPayment("");
      setSelectedCategory("");
      toast.success("Transaction created successfully");
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
    <form
      className="z-50 w-full max-w-lg flex flex-col justify-center gap-5 px-3 "
      onSubmit={handleSubmitAdd}
    >
      {/* TRANSACTION */}
      <div className="flex ">
        <div className="w-full">
          <label
            className="block uppercase tracking-wide  text-xs font-bold mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="description"
            name="description"
            type="text"
            required
            placeholder="Rent, Groceries, Salary, etc."
          />
        </div>
      </div>
      {/* PAYMENT TYPE */}
      <div className="flex flex-wrap gap-3">
        <div className="w-full flex-1 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-xs font-bold mb-2"
            htmlFor="paymentType"
          >
            Payment Type
          </label>
          <div className="relative">
            <select
              className={` ${
                selectedPayment
                  ? "text-gray-700 text-md"
                  : "text-gray-500 text-sm"
              } block appearance-none w-full bg-gray-200 border border-gray-200 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
              id="paymentType"
              name="paymentType"
              required
              value={selectedPayment}
              onChange={(e) => setSelectedPayment(e.target.value)}
            >
              <option value="" className="text-xs" disabled>
                Select a payment type...
              </option>
              <option value={"card"} className="text-md text-gray-700">
                Card
              </option>
              <option value={"cash"} className="text-md text-gray-700">
                Cash
              </option>
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
            className="block uppercase tracking-wide  text-xs font-bold mb-2"
            htmlFor="category"
          >
            Category
          </label>
          <div className="relative">
            <select
              className={` ${
                selectedCategory
                  ? "text-gray-700 text-md"
                  : "text-gray-500 text-sm"
              } block appearance-none w-full bg-gray-200 border border-gray-200 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
              id="category"
              name="category"
              required
              defaultValue={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="" disabled className="text-xs">
                Select a category...
              </option>
              <option value={"saving"} className="text-md text-gray-700">
                Saving
              </option>
              <option value={"expense"} className="text-md text-gray-700">
                Expense
              </option>
              <option value={"investment"} className="text-md text-gray-700">
                Investment
              </option>
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
            className="block uppercase text-xs font-bold mb-2"
            htmlFor="amount"
          >
            Amount($)
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="amount"
            name="amount"
            type="number"
            required
            placeholder="150"
            step="0.01"
            // min="0"
          />
        </div>
      </div>

      {/* LOCATION */}
      <div className="flex flex-wrap gap-3">
        <div className="w-full flex-1 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-xs font-bold mb-2"
            htmlFor="location"
          >
            Location
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 h-11 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="location"
            name="location"
            type="text"
            placeholder="New York"
          />
        </div>

        {/* DATE */}
        <div className="w-full flex-1">
          <label
            className="block uppercase tracking-wide text-xs font-bold mb-2"
            htmlFor="date"
          >
            Date
          </label>
          <input
            type="date"
            name="date"
            id="date"
            required
            className="appearance-none block w-full bg-gray-200 h-11 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none
                             focus:bg-white"
            placeholder="Select date"
          />
        </div>
      </div>
      {/* SUBMIT BUTTON */}
      <button
        className="text-white font-bold w-full rounded px-4 py-2 bg-gradient-to-br
              from-pink-500 to-pink-500 hover:from-pink-600 hover:to-pink-600
                            disabled:opacity-70 disabled:cursor-not-allowed"
        type="submit"
        disabled={loading}
      >
        {loading ? "Loading ..." : "Add Transaction"}
      </button>
    </form>
  );
};

export default TransactionForm;
