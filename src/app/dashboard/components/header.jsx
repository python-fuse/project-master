"use client";
import Link from "next/link";
import React from "react";
import { FaCog, FaTasks } from "react-icons/fa";
import LinkButton from "./LinkButton";
import { IconButton, useDisclosure } from "@chakra-ui/react";
import AvatarIcon from "./AvatarIcon";
import NewProjectModal from "./NewProjectModal";

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <nav className="px-4 shadow-md py-2 items-center dark:text-white border-b border-gray-700 light:text-black dark:bg-neutral-800 flex justify-between">
      <Link href={"/dashboard"}>
        <FaTasks className="text-4xl text-blue-500" />
      </Link>

      <div className="flex gap-x-3">
        <LinkButton text={"New Project"} onOpen={onOpen} />
      </div>

      <NewProjectModal isOpen={isOpen} onClose={onClose} />

      <div className="flex gap-2 items-center">
        <AvatarIcon />
        <Link href={"#"}>
          <IconButton
            icon={<FaCog />}
            aria-label="Settings"
            title="Settings"
            isRound
            size={"lg"}
          />
        </Link>
      </div>
    </nav>
  );
};

export default Header;
