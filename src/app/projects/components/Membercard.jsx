import { Avatar } from "@chakra-ui/react";
import React from "react";

const Membercard = ({ member }) => {
  return (
    <div className="grid grid-cols-3 hover:bg-neutral-700 duration-300 cursor-pointer w-full items-center rounded-lg bg-neutral-800 p-2">
      <Avatar size={'sm'} name={member} />
      <h2 className="col-span-2 truncate">{member}</h2>
    </div>
  );
};

export default Membercard;
