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
        console.error("Error gettion transaction: ", error);
        throw new Error(error.message || "Error gettion transaction");
      }
    },

    // todo => add categotyStatistics query
  },
  Mutation: {
    createTransaction: async (_, { input }, context) => {
      try {
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

    deleteTransaction: async (_, { transactionId }, context) => {
      try {
        await Transaction.findByIdAndDelete(transactionId);

        if (!context.getUser()) throw new Error("Unauthorized");

        const userId = await context.getUser()._id;

        const transactions = Transaction.find({ userId });

        return transactions;
      } catch (error) {
        console.error("Error deleting transaction: ", error);
        throw new Error(error.message || "Error deleting transaction");
      }
    },

    // todo => add thansaction/user relationship
  },
};

export default transactionResolver;
