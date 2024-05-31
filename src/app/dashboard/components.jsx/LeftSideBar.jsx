import React from "react";
import UserCard from "./UserCard";
import Menu from "./Menu";

const LeftSideBar = () => {
  return (
    <aside className="flex flex-col pt-3 px-4 cursor-pointer bg-red-300 w-1/5 h-screen max-h-screen">
      <UserCard />
      <Menu />
    </aside>
  );
};

export default LeftSideBar;
