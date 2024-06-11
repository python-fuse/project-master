import { Query } from "appwrite";
import { database } from "@/scripts/data";
export const DATABASEID = process.env.NEXT_PUBLIC_DATABASE_ID;
export const TASKCOLLECTIONID = process.env.NEXT_PUBLIC_TASKS_COLLECTION_ID;
export const PROJECTCOLLECTIONID =
  process.env.NEXT_PUBLIC_PROJECT_COLLECTION_ID;
export const COLUMNSCOLLECTIONID =
  process.env.NEXT_PUBLIC_COLUMNS_COLLECTION_ID;

export const fetchTodoTasks = async (projectId) => {
  const promise = await database.listDocuments(DATABASEID, TASKCOLLECTIONID, [
    Query.equal("projectId", projectId),
    Query.equal("status", "todo"),
  ]);

  return promise.documents;
};

export const fetchInProgressTasks = async (projectId) => {
  const promise = await database.listDocuments(DATABASEID, TASKCOLLECTIONID, [
    Query.equal("projectId", projectId),
    Query.equal("status", "doing"),
  ]);

  return promise.documents;
};

export const fetchCompletedTasks = async (projectId) => {
  const promise = await database.listDocuments(DATABASEID, TASKCOLLECTIONID, [
    Query.equal("projectId", projectId),
    Query.equal("status", "completed"),
  ]);

  return promise.documents;
};

export const fetchProject = async (projectId) => {
  const promise = await database.getDocument(
    DATABASEID,
    PROJECTCOLLECTIONID,
    projectId
  );

  return promise;
};

export const fetchColumns = async (projectId) => {
  const promise = await database.listDocuments(
    DATABASEID,
    COLUMNSCOLLECTIONID,
    [Query.equal("projectId", projectId)]
  );

  return promise.documents;
};

export const fetchTasks = async (projectId) => {
  const promise = await database.listDocuments(DATABASEID, TASKCOLLECTIONID, [
    Query.equal("projectId", projectId),
  ]);

  return promise.documents;
};

export const updateTaskStatus = async (taskId, newStatus) => {
  const promise = await database.updateDocument(
    DATABASEID,
    TASKCOLLECTIONID,
    taskId,
    {
      status: newStatus,
    }
  );

  return promise;
};

export const deleteTask = async (taskId) => {
  const promise = await database.deleteDocument(
    DATABASEID,
    TASKCOLLECTIONID,
    taskId
  );

  return promise;
};

export const editTask = async (taskId, task) => {
  const promise = await database.updateDocument(
    DATABASEID,
    TASKCOLLECTIONID,
    taskId,
    task
  );

  return promise;
};
