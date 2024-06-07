import { createContext, useContext, useState } from "react";

const ProjectContext = createContext();

export const useProject = () => {
  return useContext(ProjectContext);
};

export const ProjectProvider = ({ children }) => {
  const [project, setProject] = useState({});

  const value = {
    project,
    setProject,
  };

  return (
    <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
  );
};
