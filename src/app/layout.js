import { Poppins } from "next/font/google";
import "./globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { UserProvider } from "@/utils/auth";

const inter = Poppins({ subsets: ["latin"], weight: ["500"] });

export const metadata = {
  title: "Project Master",
  description: "Making work easier for everyone",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} dark:bg-neutral-800 bg-white dark:text-white light:text-black`}>
        <UserProvider>
          <ChakraProvider>{children}</ChakraProvider>
        </UserProvider>
      </body>
    </html>
  );
}
