"use client";
import { useMutation } from "@apollo/client";
import { MdLogout } from "react-icons/md";

import { LOGOUT } from "../../graphql/mutations/user.mutation";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { client } from "@/apollo/apolloProvider";
import ThemeSwitch from "./ThemeSwitch";

const Logout = () => {
  const router = useRouter();

  const [logout, { loading }] = useMutation(LOGOUT, {
    onCompleted: () => {
      router.refresh();
    },
  });

  const handleLogout = async () => {
    try {
      await logout();
      client.clearStore();
    } catch (error) {
      console.error("Error:", error);
      toast.error((error as Error).message);
    }
  };

  return (
    <div className="flex justify-center gap-4 items-center relative z-50 mb-5 pt-3">
      <img
        src={"https://tecdn.b-cdn.net/img/new/avatars/2.webp"}
        className="w-10  h-10 rounded-full border cursor-pointer"
        alt="Avatar"
      />

      <ThemeSwitch />

      {!loading && (
        <MdLogout
          className="w-6 h-6 cursor-pointer"
          onClick={handleLogout}
          title="Log out"
        />
      )}
      {/* loading spinner */}
      {loading && (
        <div className="w-6 h-6 border-t-2 border-b-2 rounded-full animate-spin"></div>
      )}
    </div>
  );
};

export default Logout;
