import { database } from "@/scripts/data";
import {
  COLUMNSCOLLECTIONID,
  PROJECTCOLLECTIONID,
  TASKCOLLECTIONID,
} from "./databaseFunctions";
import { ID } from "appwrite";

const createProject = async (project) => {
  const res = await database.createDocument(
    "project-master",
    PROJECTCOLLECTIONID,
    project.projectId,
    project
  );

  await createColumns(project.projectId);

  return res.id;
};

export default createProject;

export const createTask = async (task) => {
  const res = await database.createDocument(
    "project-master",
    TASKCOLLECTIONID,
    task.taskId,
    task
  );

  return res.id;
};

const createColumn = async (column) => {
  const res = await database.createDocument(
    "project-master",
    COLUMNSCOLLECTIONID,
    column.columnId,
    column
  );

  return res.id;
};

export const createColumns = async (projectId) => {
  const columns = [
    {
      columnId: ID.unique(),
      name: "todo",
      projectId: projectId,
    },
    {
      columnId: ID.unique(),
      name: "doing",
      projectId: projectId,
    },
    {
      columnId: ID.unique(),
      name: "completed",
      projectId: projectId,
    },
  ];
  for (const col of columns) {
    await createColumn(col);
  }
};
