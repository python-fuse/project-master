import { Progress, ProgressLabel } from "@chakra-ui/react";
import React from "react";

const UserGreeting = () => {
  return (
    <div className="flex justify-between">
      <h2 className="font-bold text-3xl">Hi, Umar</h2>

      {/* <Progress value={10}>
        <ProgressLabel />
      </Progress>
      <Progress value={36} /> */}
    </div>
  );
};

export default UserGreeting;
