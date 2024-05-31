import React from "react";
import Header from "./components.jsx/header";
import LeftSideBar from "./components.jsx/LeftSideBar";

export const metadata = {
  title: "Dashboard | Project Master",
  description:
    "Welcome to project master, Manage your projects eficiently,collaborate effectively!",
};

const layout = ({ children }) => {
  return (
    <>
      <main className="flex">
        <LeftSideBar />
        <div className="w-full">
          <Header />
          {children}
        </div>
      </main>
    </>
  );
};

export default layout;
