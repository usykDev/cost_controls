"use client";
import { useMutation, useQuery } from "@apollo/client";
import { MdLogout } from "react-icons/md";
import { LOGOUT } from "../../graphql/mutations/user.mutation";
import toast from "react-hot-toast";
import { GET_AUTHENTICATED_USER } from "@/graphql/queries/user.query";
import { useRouter } from "next/navigation";

const Logout = () => {
  const { data, refetch } = useQuery(GET_AUTHENTICATED_USER);
  const router = useRouter();

  const [logout, { loading }] = useMutation(LOGOUT, {
    onCompleted: () => {
      router.refresh();
    },
  });

  const handleLogout = async () => {
    // console.log("Logging out...");
    try {
      await logout();
      // clear cash
    } catch (error) {
      console.error("Error:", error);
      toast.error((error as Error).message);
    }
  };

  return (
    <div className="flex justify-center items-center relative z-50 mb-5">
      <img
        src={"https://tecdn.b-cdn.net/img/new/avatars/2.webp"}
        className="w-10 h-10 rounded-full border cursor-pointer"
        alt="Avatar"
      />

      {!loading && (
        <MdLogout
          className="mx-2 w-5 h-5 cursor-pointer"
          onClick={handleLogout}
          title="Log out"
        />
      )}
      {/* loading spinner */}
      {loading && (
        <div className="w-6 h-6 border-t-2 border-b-2 mx-2 rounded-full animate-spin"></div>
      )}
    </div>
  );
};

export default Logout;
