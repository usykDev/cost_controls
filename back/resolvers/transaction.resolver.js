import Transaction from "../models/transaction.model.js";

const transactionResolver = {
  Query: {
    transactions: async (_, __, context) => {
      try {
        if (!context.getUser()) throw new Error("Unauthorized");

        const userId = await context.getUser()._id;

        const transactions = Transaction.find({ userId });
        return transactions;
      } catch (error) {
        console.error("Error gettion transactions: ", error);
        throw new Error(error.message || "Error gettion transactions");
      }
    },

    transaction: async (_, { transactionId }) => {
      try {
        const transaction = await Transaction.findById(transactionId);
        return transaction;
      } catch (error) {
        console.error("Error getting transaction: ", error);
        throw new Error(error.message || "Error gettion transaction");
      }
    },

    categoryStatistics: async (_, __, context) => {
      try {
        if (!context.getUser()) throw new Error("Unauthorized");
        const userId = context.getUser()._id;
        const transactions = await Transaction.find({ userId });
        const categoryMap = {};

        transactions.forEach((transaction) => {
          if (!categoryMap[transaction.category]) {
            categoryMap[transaction.category] = 0;
          }
          categoryMap[[transaction.category]] += transaction.amount;
        });

        return Object.entries(categoryMap).map(([category, totalAmount]) => ({
          category,
          totalAmount,
        }));
      } catch (error) {
        console.error("Error getting chart data: ", error);
        throw new Error(error.message || "Error gettion transaction");
      }
    },
  },
  Mutation: {
    createTransaction: async (_, { input }, context) => {
      try {
        if (input.amount <= 0) {
          throw new Error("Amount must be a non-negative number");
        }

        const newTransaction = new Transaction({
          ...input,
          userId: context.getUser()._id,
        });

        await newTransaction.save();

        return newTransaction;
      } catch (error) {
        console.error("Error creating transaction: ", error);
        throw new Error(error.message || "Error creating transaction");
      }
    },

    updateTransaction: async (_, { input }) => {
      try {
        if (input.amount <= 0) {
          throw new Error("Amount must be a non-negative number");
        }

        const updatedTransaction = await Transaction.findByIdAndUpdate(
          input.transactionId,
          input,
          { new: true }
        );
        return updatedTransaction;
      } catch (error) {
        console.error("Error updating transaction: ", error);
        throw new Error(error.message || "Error updating transaction");
      }
    },

    deleteTransaction: async (_, { transactionId }) => {
      try {
        const deletedTransaction = await Transaction.findByIdAndDelete(
          transactionId
        );
        return deletedTransaction;
      } catch (error) {
        console.error("Error deleting transaction: ", error);
        throw new Error(error.message || "Error deleting transaction");
      }
    },

    // todo => add thansaction/user relationship
  },
};

export default transactionResolver;
