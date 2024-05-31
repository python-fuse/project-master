import { Spinner } from "@chakra-ui/react";
import React from "react";

const AuthButton = ({ text, icon, variant, isLoading }) => {
  return (
    <button
      className={`p-4 items-center space-x-2 justify-center flex rounded-lg ${variant}`}
    >
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {icon ? icon : null}

          <p className="font-semibold text-[20px]">{text}</p>
        </>
      )}
    </button>
  );
};

export default AuthButton;
