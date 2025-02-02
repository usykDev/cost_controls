"use client";
import { useMutation, useQuery } from "@apollo/client";
import { MdLogout } from "react-icons/md";

import { LOGOUT } from "../../graphql/mutations/user.mutation";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { client } from "@/apollo/apolloProvider";
import ThemeSwitch from "./ThemeSwitch";
import { GET_AUTHENTICATED_USER } from "@/graphql/queries/user.query";
import { useEffect } from "react";

const Logout = () => {
  const router = useRouter();
  const { data } = useQuery(GET_AUTHENTICATED_USER);

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
        src={data?.authUser?.avatar}
        className={
          data?.authUser?.avatar
            ? "w-10  h-10 rounded-full border cursor-pointer"
            : "w-6 h-6 border-t-2 border-b-2 rounded-full animate-spin"
        }
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
