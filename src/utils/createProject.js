import { database } from "@/scripts/data";

const createProject = async (project) => {
  const res = await database.createDocument(
    "project-master",
    "6654a886000b7fd29d6d",
    project.projectId,
    project
  );

  return res.id;
};

export default createProject;
