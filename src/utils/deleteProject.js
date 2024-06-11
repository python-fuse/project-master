import { database } from "@/scripts/data";
import { DATABASEID, PROJECTCOLLECTIONID } from "./databaseFunctions";

const deleteProject = async (projectId) => {
  const res = await database.deleteDocument(
    DATABASEID,
    PROJECTCOLLECTIONID,
    projectId
  );

  return res;
};

export default deleteProject;
