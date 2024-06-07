"use client";
import { Progress } from "@nextui-org/progress";
import Link from "next/link";
import React from "react";
import { FaTasks } from "react-icons/fa";

const TopBar = () => {
  return (
    <nav className="px-4 h-[54px] z-index-10 shadow-lg py-3 items-center dark:text-white border-b border-gray-700 light:text-black dark:bg-neutral-700 flex justify-between min-w-max">
      <div className="flex items-center justify-between w-[100px]">
        <Link href={"/dashboard"}>
          <FaTasks className="text-4xl text-blue-500" />
        </Link>
      </div>

      <div className="flex items-center gap-2 flex-col w-[200px]">
        <p className="font-semibold">Progress</p>
        <Progress size="sm" value={1} maxValue={4} />
      </div>
    </nav>
  );
};

export default TopBar;
