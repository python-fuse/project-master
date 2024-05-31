import React from "react";
import ProjectList from "../components/ProjectList";

const Projects = ({ params }) => {
  const { userId } = params;

  return (
    <main>
      <h1>Projects</h1>
      <p>userId: {userId}</p>
      <ProjectList userId={userId} />
    </main>
  );
};

export default Projects;
