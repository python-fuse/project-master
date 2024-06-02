import { Button } from "@chakra-ui/react";
import React from "react";

const LinkButton = ({ text, onOpen }) => {
  return (
    <Button colorScheme={"blue"} size={"md"} onClick={onOpen}>
      {text}
    </Button>
  );
};

export default LinkButton;
