"use client";

import React, { useContext } from "react";
import AvatarIcon from "./AvatarIcon";
import { UserContext } from "@/utils/auth";
import Link from "next/link";

const UserCard = () => {
  const { user, loading } = useContext(UserContext);

  return (
    <div className="flex space-x-3">
      <AvatarIcon />
      <div className="dark:text-white text-black">
        <Link href={"/profile"} className="font-bold text-lg ">
          Umar Muktar
        </Link>
        <p className="light:text-gray-800 text-sm">Software Engineer</p>
      </div>
    </div>
  );
};

export default UserCard;
