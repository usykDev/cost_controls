import { FaLocationDot } from "react-icons/fa6";
import { BsCardText } from "react-icons/bs";
import { MdOutlinePayments } from "react-icons/md";
import { FaSackDollar } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import { HiPencilAlt } from "react-icons/hi";
import Link from "next/link";
import { formatDate } from "../../../utils/formatDate";
import { useMutation } from "@apollo/client";
import { DELETE_TRANSACTION } from "@/graphql/mutations/transaction.mutation";
import toast from "react-hot-toast";

type Category = "saving" | "expense" | "investment";

const categoryColorMap: Record<Category, string> = {
  saving: "from-[#308C70] to-[#43D5A8]",
  expense: "from-pink-800 to-pink-600",
  investment: "from-blue-700 to-blue-400",
};

export interface Transaction {
  _id: number;
  userId: number;
  description: string;
  paymentType: string;
  category: Category;
  amount: number;
  location: string;
  date: string;
}

const Card: React.FC<{ transaction: Transaction }> = ({ transaction }) => {
  let { description, paymentType, category, amount, location, date } =
    transaction;

  const [deleteTransaction, { loading }] = useMutation(DELETE_TRANSACTION, {
    refetchQueries: ["GetTransactions"],
  });

  const cardClass = categoryColorMap[category];
  description = description[0]?.toUpperCase() + description.slice(1);
  category = category?.toUpperCase() as Category;
  paymentType = paymentType[0].toUpperCase() + paymentType.slice(1);
  date = formatDate(date);

  const handleDelete = async () => {
    try {
      await deleteTransaction({
        variables: {
          transactionId: transaction._id,
        },
      });
      toast.success("Transaction deleted successfully");
    } catch (error) {
      console.error("Error deleting transaction:", error);
      toast.error((error as Error).message);
    }
  };

  return (
    <div
      className={`flex flex-col justify-between rounded-md p-4 bg-gradient-to-br ${cardClass}`}
    >
      <div className="flex flex-col gap-3">
        <div className="flex flex-row items-center justify-between">
          <h2 className="text-lg font-bold text-white">{category}</h2>
          <div className="flex items-center gap-2">
            {!loading && (
              <FaTrash className={"cursor-pointer"} onClick={handleDelete} />
            )}
            {loading && (
              <div className="w-5 h-5 border-t-2 border-b-2 rounded-full animate-spin"></div>
            )}
            <Link href={`/transaction/${transaction._id}`}>
              <HiPencilAlt className="cursor-pointer" size={20} />
            </Link>
          </div>
        </div>
        <p className="text-white flex items-center gap-1">
          <BsCardText />
          Description: {description}
        </p>
        <p className="text-white flex items-center gap-1">
          <MdOutlinePayments />
          Payment Type: {paymentType}
        </p>
        <p className="text-white flex items-center gap-1">
          <FaSackDollar />
          Amount: ${amount}
        </p>

        {location ? (
          <p className="text-white flex items-center gap-1">
            <FaLocationDot />
            Location: {location}
          </p>
        ) : (
          ""
        )}
      </div>

      <div className="flex justify-between items-center">
        <p className="text-xs text-black font-bold">{date}</p>
        <img
          src={"https://tecdn.b-cdn.net/img/new/avatars/2.webp"}
          className="h-8 w-8 border rounded-full"
          alt=""
        />
      </div>
    </div>
  );
};
export default Card;
