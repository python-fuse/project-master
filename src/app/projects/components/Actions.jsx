import React from "react";

const Actions = ({ icon, value }) => {
  return (
    <div className="flex w-max gap-x-1">
      {icon}
      <p className="text-sm">{value}</p>
    </div>
  );
};

export default Actions;
