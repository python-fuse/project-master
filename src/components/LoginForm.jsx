"use client";

import React, { useContext, useState } from "react";
import Input from "./Input";
import Remember from "./Remember";
import { UserContext } from "@/utils/auth";
import { useRouter } from "next/navigation";
import { useToast } from "@chakra-ui/react";
import Link from "next/link";
import AuthButton from "./AuthButton";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const toast = useToast();
  const { logIn, error, loading } = useContext(UserContext);
  const handleSubmit = (e) => {
    e.preventDefault();

    logIn(
      email,
      password,
      () => {
        router.push("/");
      },
      () =>
        toast({
          title: "An error occured!",
          description: error.message,
          duration: 3000,
          status: "error",
          isClosable: true,
        })
    );
  };
  return (
    <form className="flex flex-col space-y-3" onSubmit={handleSubmit}>
      <Input
        name={"Email"}
        type={"email"}
        placeholder={"Enter your Email"}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <Input
        name={"Password"}
        type={"password"}
        placeholder={"Enter your password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <div className="flex justify-between">
        <Remember />
        <Link href="/forgot" className="text-blue-500">
          Forgot Password?
        </Link>
      </div>

      <AuthButton text={"Login"} variant="filled" isLoading={loading}/>

      <p className="text-center">OR</p>
    </form>
  );
};

export default LoginForm;
