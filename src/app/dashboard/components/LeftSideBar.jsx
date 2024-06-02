import React from "react";
import UserCard from "./UserCard";
import Menu from "./Menu";

const LeftSideBar = () => {
  return (
    <aside className="flex flex-col pt-3 px-4 cursor-pointer dark:bg-neutral-700 border-r border-gray-700 shadow-lg bg-red-300 w-1/5 h-screen max-h-screen">
      <UserCard />
      <Menu />
    </aside>
  );
};

export default LeftSideBar;
