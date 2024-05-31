import AuthButton from "@/components/AuthButton";
import SignupForm from "@/components/SignupForm";
import Image from "next/image";
import Link from "next/link";
import { FaGoogle, FaTasks } from "react-icons/fa";

export const metadata = {
  title: "Register | Project Master",
  description:
    "Welcome to Project Master! Login to start managing your projects.",
  image: "/login.svg",
};

const RegisterPage = () => {
  return (
    <div className="flex  h-dvh min-h-screen p-10 space-x-10  ">
      <div className="w-1/2 px-10 flex flex-col space-y-3">
        <FaTasks className=" text-blue-500 text-6xl" />

        <h2 className="text-4xl font-bold">Welcome to Project Master!</h2>

        <p>Login to continue managing your projects.</p>
        <SignupForm />
        <AuthButton
          icon={<FaGoogle className="text-[28px]" />}
          text={"Login with Google"}
          variant={"outline"}
        />
        <p className="text-center">
          Already have an account?{" "}
          <Link className="text-blue-500 hover:underline" href={"/login"}>
            Log in here
          </Link>
        </p>
      </div>
      <div className="w-1/2">
        <Image
          height={1024}
          width={720}
          className="w-full h-full"
          src="/login.svg"
          alt="Login"
        />{" "}
      </div>
    </div>
  );
};

export default RegisterPage;
