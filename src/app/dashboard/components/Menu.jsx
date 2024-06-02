"use client";

import React, { useContext } from "react";
import { FaCompass, FaInbox, FaTasks } from "react-icons/fa";
import MenuItem from "./MenuItem";
import { UserContext } from "@/utils/auth";

const Menu = () => {
  const { user } = useContext(UserContext);


  const menu = [
    { title: "My Tasks", icon: <FaTasks />, link: `/tasks/${user?.$id}` },
    { title: "Projects", icon: <FaCompass />, link: `/projects/${user?.$id}` },
    { title: "Inbox", icon: <FaInbox />, link: "/inbox" },
  ];

  const content = menu.map((item, index) => (
    <MenuItem
      key={index}
      title={item.title}
      link={item.link}
      icon={item.icon}
    />
  ));

  return (
    <div className="mt-10 place-items-start dark:text-white text-black">
      <p className="font-bold">Menu</p>

      <div className="flex mt-3 flex-col space-y-2">{content}</div>
    </div>
  );
};

export default Menu;
