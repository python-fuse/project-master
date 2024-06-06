import { Avatar, AvatarGroup, IconButton } from "@chakra-ui/react";
import { Progress } from "@nextui-org/progress";
import Link from "next/link";
import React from "react";
import { FaGripHorizontal, FaTasks } from "react-icons/fa";

const TopBar = ({ isOpen, setOpen }) => {
  const toggleSidebar = () => {
    setOpen(!isOpen);
  };

  return (
    <nav className="px-4 shadow-md py-2 items-center dark:text-white border-b border-gray-700 light:text-black dark:bg-neutral-800 flex justify-between w-screen min-w-max">
      <div className="flex items-center justify-between w-[100px]">
        <IconButton
          variant={"ghost"}
          className="absolute top-0 r"
          icon={<FaGripHorizontal size={"md"} color="white" />}
          onClick={toggleSidebar}
        />

        <Link href={"/dashboard"}>
          <FaTasks className="text-4xl text-blue-500" />
        </Link>
      </div>

      <div className="flex items-center gap-x-1">
        <p>Progress</p>
        <Progress value={16} maxValue={32} />
      </div>

      <AvatarGroup size={"sm"} max={3}>
        {Array.from(["a", "s", "f", "v"]).map((member) => (
          <Avatar name={member} />
        ))}
      </AvatarGroup>
    </nav>
  );
};

export default TopBar;
