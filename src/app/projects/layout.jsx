import React from "react";
import TopBar from "./components/TopBar";
import SideBar from "./components/SideBar";

export const metadata = {
  title: "Project | Project Master",
};

const layout = ({ children }) => {
  return (
    <main className="flex h-screen overflow-hidden">
      <SideBar />
      <div className="flex-1">
        <TopBar />
        {children}
      </div>
    </main>
  );
};

export default layout;
