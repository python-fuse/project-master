"use client";
import { UserContext } from "@/utils/auth";
import { Avatar } from "@chakra-ui/react";
import { Skeleton } from "@nextui-org/skeleton";
import Link from "next/link";
import React, { useContext } from "react";

const AvatarIcon = () => {
  const { user } = useContext(UserContext);
  return (
    <Avatar
      as={Link}
      aria-label="Profile"
      title="Profile"
      href={"/profile"}
      name={user?.email}
    />
  );
};

export default AvatarIcon;
