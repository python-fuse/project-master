import Link from "next/link";
import React from "react";

const MenuItem = ({ title, icon, link }) => {
  return (
    <Link
      href={link}
      className="flex hover:bg-white hover:bg-opacity-10 duration-200 border-blue-500 border-[3px] p-2 rounded-lg gap-x-4 items-center  grid-cols-3"
    >
      {icon}
      <p href={link} className="text-sm">
        {title}
      </p>
    </Link>
  );
};

export default MenuItem;
