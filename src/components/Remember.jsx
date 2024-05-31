import React from "react";

const Remember = () => {
  return (
    <div className="flex">
      <input className="mr-2" type="checkbox" id="c" />
      <label htmlFor="c" className=" text-blue-500">
        Remember me
      </label>
    </div>
  );
};

export default Remember;
