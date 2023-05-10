"use client";

import { useEffect } from "react";
import { destroyCookie } from "nookies";
import { useRouter } from "next/navigation";

const Logout = () => {
  const router = useRouter();

  useEffect(() => {
    destroyCookie(null, "access_token");

    router.push("/auth/login");
  }, []);

  return null;
};

export default Logout;
