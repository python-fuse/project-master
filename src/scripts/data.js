import client from "@/utils/appwrite";
import { Databases, ID } from "appwrite";

export const database = new Databases(client);

const projects = [
  {
    projectId: ID.unique(),
    name: "Project Alpha",
    description: "This is the first project.",
    members: ["user1", "user2"],
    ownerId: "6658f4bde77ceb6a4b21",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    projectId: ID.unique(),
    name: "Project Beta",
    description: "This is the second project.",
    members: ["user2", , "6658f4bde77ceb6a4b21", "user3"],
    ownerId: "6658f4bde77ceb6a4b21",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    projectId: ID.unique(),
    name: "Project Gamma",
    description: "This is the third project.",
    members: ["user1", "user3", "6658f4bd e77ceb6a4b21"],
    ownerId: "6658f4bde77ceb6a4b21",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const tasks = [
  {
    id: "task1",
    title: "Design Homepage",
    description: "Create the design for the homepage.",
    status: "todo",
    priority: "high",
    dueDate: "2024-06-15",
    projectId: "project1",
    assigneeId: "user1",
  },
  {
    id: "task2",
    title: "Develop API",
    description: "Develop the REST API for the application.",
    status: "doing",
    priority: "medium",
    dueDate: "2024-06-20",
    projectId: "project1",
    assigneeId: "user2",
  },
  // Add more tasks as shown above
];

const comments = [
  {
    id: "comment1",
    content: "Great progress on the homepage design!",
    taskId: "task1",
    userId: "user2",
    timestamp: "2024-06-01T10:00:00Z",
  },
  {
    id: "comment2",
    content: "API endpoints look good. Just a few changes needed.",
    taskId: "task2",
    userId: "user1",
    timestamp: "2024-06-02T12:00:00Z",
  },
  // Add more comments as shown above
];

// Function to create documents in Appwrite
const createDocument = async (collectionId, data) => {
  try {
    const response = await database.createDocument(
      "project-master",
      collectionId,
      data.projectId,
      data
    );
    console.log(`Created document: ${response.$id}`);
  } catch (error) {
    console.error(`Failed to create document: ${error.message}`);
  }
};

// Create users, projects, tasks, and comments
export const seedData = async () => {
  for (const project of projects) {
    await createDocument("6654a886000b7fd29d6d", project);
  }
  // for (const task of tasks) {
  //   await createDocument("tasks", task);
  // }
  // for (const comment of comments) {
  //   await createDocument("comments", comment);
  // }
};
