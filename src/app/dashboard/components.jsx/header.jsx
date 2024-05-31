import Link from "next/link";
import React from "react";
import { FaCog, FaTasks, FaWrench } from "react-icons/fa";
import LinkButton from "../LinkButton";
import { Avatar, IconButton } from "@chakra-ui/react";
import AvatarIcon from "./AvatarIcon";

const Header = () => {
  return (
    <nav className="px-4 shadow-md py-2 items-center bg-red-400 flex justify-between">
      <Link href={"/dashboard"}>
        <FaTasks className="text-4xl text-blue-500" />
      </Link>

      <div className="flex gap-x-3">
        <LinkButton text={"Projects"} />
        <LinkButton text={"Team"} />
      </div>

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
