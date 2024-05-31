"use client";

import { UserContext } from "@/utils/auth";
import { useRouter } from "next/navigation";
import { useContext } from "react";

const LogOutBtn = () => {
  const { logOut } = useContext(UserContext);
  const router = useRouter();

  const handleLogout = () => {
    logOut(() => router.push("/login"));
  };
  return (
    <button className="bg-red-800 p-2" onClick={handleLogout}>
      Log Out
    </button>
  );
};

export default LogOutBtn;
