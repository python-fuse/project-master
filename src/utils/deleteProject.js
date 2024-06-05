import { database } from "@/scripts/data";


const deleteProject = async (projectId) => {
  const res = await database.deleteDocument(
    "project-master",
    "6654a886000b7fd29d6d",
    projectId,
  );

  return res;
};

export default deleteProject;
