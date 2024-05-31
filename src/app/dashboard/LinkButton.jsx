import { Button } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

const LinkButton = ({ text }) => {
  return (
    <Button colorScheme={"blue"} size={'md'} as={Link} href={"/projects"}>
      {text}
    </Button>
  );
};

export default LinkButton;
