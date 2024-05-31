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
      <div className="">
        <Link href={"/profile"} className="font-bold text-lg text-black">
          Umar Muktar
        </Link>
        <p className="text-gray-800 text-sm">Software Engineer</p>
      </div>
    </div>
  );
};

export default UserCard;
