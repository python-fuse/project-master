import { FaGoogle } from "react-icons/fa";
import Link from "next/link";
import AuthButton from "@/components/AuthButton";
import Image from "next/image";
import LoginForm from "@/components/LoginForm";

const metadata = {
  title: "Login | Project Master ",
  description: "Login to continue managing your projects",
  image: "/login.svg",
};

const LoginPage = () => {
  return (
    <div className="flex h-dvh min-h-screen p-10 space-x-10 overflow-hidden">
      <div className="w-1/2 px-10 flex flex-col space-y-3">
        <Image
          height={100}
          className="rounded-xl p-2"
          width={100}
          src={"/pm_logo_blue_bg.png"}
        />

        <h2 className="text-4xl font-bold">Welcome back!</h2>

        <p>Login to continue managing your projects.</p>
        <LoginForm />
        <AuthButton
          icon={<FaGoogle className="text-[28px]" />}
          text={"Login with Google"}
          variant={"outline"}
        />

        <p className="text-center">
          Don&apos;t have an account?{" "}
          <Link className="text-blue-500 hover:underline" href={"/signup"}>
            Get Started
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
        />
      </div>
    </div>
  );
};

export { metadata };
export default LoginPage;
