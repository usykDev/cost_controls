"use client";

import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";

import { usePathname, useRouter } from "next/navigation";
import Logout from "@/components/ui/Logout";
import { GET_AUTHENTICATED_USER } from "../graphql/queries/user.query";

const PUBLIC_ROUTES = ["/login", "/register"];

const IsAuthenticated = ({ children }: { children: React.ReactNode }) => {
  const { loading, data, error } = useQuery(GET_AUTHENTICATED_USER);
  const router = useRouter();
  const pathname = usePathname();

  const isAuthenticated = !!data?.authUser;
  console.log(data?.authUser);

  useEffect(() => {
    if (loading) return;

    if (!loading && !isAuthenticated && !PUBLIC_ROUTES.includes(pathname)) {
      router.replace("/login");
    }

    if (!loading && isAuthenticated && PUBLIC_ROUTES.includes(pathname)) {
      router.replace("/");
    }
  }, [loading, data, router, pathname]);

  if (error) {
    console.error("Error fetching user:", error.message);
    return null;
  }

  return (
    <>
      {isAuthenticated && <Logout />}
      {children}
    </>
  );
};

export default IsAuthenticated;
