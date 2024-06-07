import { Poppins } from "next/font/google";
import "./globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { UserProvider } from "@/utils/auth";
import { ProjectProvider } from "@/utils/ProjectContext";

const poppins = Poppins({ subsets: ["latin"], weight: ["500"] });

export const metadata = {
  title: "Project Master",
  description: "Making work easier for everyone",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} dark text-foreground dark:bg-neutral-800 dark:text-white light:text-black`}
      >
        <UserProvider>
          <ProjectProvider>
            <ChakraProvider>{children}</ChakraProvider>
          </ProjectProvider>
        </UserProvider>
      </body>
    </html>
  );
}
