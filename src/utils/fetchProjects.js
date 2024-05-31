import { Query } from "appwrite";
import { database } from "@/scripts/data";

const fetchProjects = async (userId) => {
  let projects = [];

  const promise = await database.listDocuments(
    "project-master",
    "6654a886000b7fd29d6d",
    [
      Query.or([
        Query.equal("ownerId", userId),
        Query.contains("members", userId),
      ]),
    ]
  );
  projects = promise.documents;
  console.log(projects);

  return projects;
};

export default fetchProjects;
