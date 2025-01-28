"use client";
import { MdLogout } from "react-icons/md";

const Logout = () => {
  const handleLogout = () => {
    console.log("Logging out...");
  };
  return (
    <MdLogout className="mx-2 w-5 h-5 cursor-pointer" onClick={handleLogout} />
  );
};

export default Logout;
