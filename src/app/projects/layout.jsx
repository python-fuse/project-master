import React from "react";

const layout = ({ children }) => {
  return (
    <main className="flex">
      <aside className="h-screen w-[300px] overflow-auto">
        <h2>Bankai</h2>
      </aside>

      {children}
    </main>
  );
};

export default layout;
