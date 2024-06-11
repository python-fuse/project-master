"use client";
import { Progress } from "@nextui-org/progress";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaTasks } from "react-icons/fa";

const TopBar = () => {
  return (
    <nav className="px-4 h-[54px] z-index-10 shadow-lg py-3 items-center dark:text-white border-b border-gray-700 light:text-black dark:bg-neutral-700 flex justify-between min-w-max">
      <div className="flex items-center justify-between w-[100px]">
        <Link href={"/dashboard"}>
           <Image
          height={50}
          className="rounded-xl p-2"
          width={50}
          src={"/pm_logo_blue_bg.png"}
        />
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
