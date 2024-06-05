import { Query } from "appwrite";
import { database } from "@/scripts/data";


export const fetchProject = async (projectId) => {
  const promise = await database.getDocument(
    "project-master",
    "6654a886000b7fd29d6d",
    projectId
  );

  return promise;
}

export const fetchColumns = async (projectId) => {
  const promise = await database.listDocuments(
    "project-master",
    "665fa0f30027b9c6c85e",
    [
        Query.equal("projectId", projectId),
    ]
  );

  return promise.documents;
}

export const fetchTasks = async (projectId) => {
  const promise = await database.listDocuments(
    "project-master",
    "6654c3c30012da254da7",
    [
        Query.equal("projectId", projectId),
    ]
  );

  return promise.documents;
}
