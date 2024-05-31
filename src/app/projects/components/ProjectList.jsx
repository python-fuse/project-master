
import fetchProjects from "@/utils/fetchProjects";
import { Spinner } from "@chakra-ui/react";
import { Suspense } from "react";

const ProjectList = async ({ userId }) => {
  let projects = [];
  try {
    projects = await fetchProjects(userId);
  } catch (error) {
    console.log(error);
  }
  return (
    <div>
      <Suspense fallback={<Spinner />}>
        <ul>
          {projects.map((project) => (
            <li key={project.$id}>
              <h2>{project.name}</h2>
              <p>{project.description}</p>
            </li>
          ))}
        </ul>
      </Suspense>
    </div>
  );
};

export default ProjectList;
