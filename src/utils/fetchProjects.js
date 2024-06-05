import { Query } from "appwrite";
import { database } from "@/scripts/data";

const fetchProjects = async (userId) => {
  const promise = await database.listDocuments(
    "project-master",
    "6654a886000b7fd29d6d",
    [
      Query.or([
        Query.equal("ownerId", userId),
        Query.contains("members", userId),
      ]),
      Query.orderDesc("updatedAt")
    ]
  );

  return promise.documents;
};

export default fetchProjects;
