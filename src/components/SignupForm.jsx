"use client";
import Input from "@/components/Input";
import AuthButton from "@/components/AuthButton";
import React, { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@chakra-ui/react";
import { UserContext } from "@/utils/auth";

const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();
  const toast = useToast();
  const { signUp, error, loading } = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    signUp(
      email,
      password,
      () => router.push("/login"),
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

      <Input
        name={"Confirm Password"}
        type={"password"}
        placeholder={"Confirm your password"}
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <AuthButton text={"Login"} variant="filled" isLoading={loading} />

      <p className="text-center">OR</p>
    </form>
  );
};

export default SignupForm;
