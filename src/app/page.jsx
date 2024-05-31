"use client";
import LogOutBtn from "@/components/LogOutBtn";
import { UserContext } from "@/utils/auth";
import { useContext } from "react";

export default function Home() {
  const { user } = useContext(UserContext);

  return (
    <main className="min-h-screen grid contents-center">
      <>
        <p>{user?.$id}</p>
        <p>{user?.email}</p>
        <LogOutBtn />
      </>
    </main>
  );
}
