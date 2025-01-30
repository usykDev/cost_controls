import TransactionForm from "@/components/ui/TransactionForm";
import TransactionFormSkeleton from "@/components/skeletons/TransactionFormSkeleton";
import Logout from "@/components/ui/Logout";

const Transaction = () => {
  //   return <TransactionFormSkeleton />;

  return (
    <>
      <Logout />

      <div className="flex flex-col justify-center items-center">
        <p className="text-2xl font-bold text-center relative z-50 mb-4 bg-gradient-to-r from-secondary-300 via-pink-400 to-secondary-300 inline-block text-transparent bg-clip-text">
          Update this transaction
        </p>

        <TransactionForm />
      </div>
    </>
  );
};

export default Transaction;
