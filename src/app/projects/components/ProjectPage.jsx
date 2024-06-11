"use client";

import {
  fetchColumns,
  fetchTasks,
  fetchProject,
  updateTaskStatus,
} from "@/utils/databaseFunctions";
import { TASKCOLLECTIONID } from "@/utils/databaseFunctions";
import client from "@/utils/appwrite";
import TaskCard from "../components/TaskCard";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useState, useEffect, useContext } from "react";
import Column from "../components/Column";
import { Spinner, useToast } from "@chakra-ui/react";
import { useProject } from "@/utils/ProjectContext";
import { UserContext } from "@/utils/auth";
import { toTileCase } from "@/utils/toTitleCase";

const transformData = (columns, tasks) => {
  const formattedColumns = {};
  columns.forEach((column) => {
    formattedColumns[column.columnId] = {
      name: column.name,
      items: tasks.filter(
        (task) => task.status.toLowerCase() === column.name.toLowerCase()
      ),
    };
  });
  return formattedColumns;
};

const ProjectPage = ({ projectId }) => {
  const [columns, setColumns] = useState({});
  const [fetchedTasks, setFetchedTasks] = useState([]);
  const { project, setProject } = useProject();
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    const loadData = async () => {
      try {
        const projectRes = await fetchProject(projectId);
        const columnsRes = await fetchColumns(projectId);
        const tasks = await fetchTasks(projectId);
        const formattedColumns = transformData(columnsRes, tasks);
        setColumns(formattedColumns);
        setProject(projectRes);
        setFetchedTasks(tasks);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
        toast({
          title: "Error",
          status: "error",
          duration: 3000,
          description: error.message,
        });
      }
    };

    loadData();

    const unsubscribe = client.subscribe(
      `databases.project-master.collections.${TASKCOLLECTIONID}.documents`,
      (response) => {
        if (
          response.events.includes(
            "databases.*.collections.*.documents.*.create"
          ) ||
          response.events.includes(
            "databases.*.collections.*.documents.*.update"
          ) ||
          response.events.includes(
            "databases.*.collections.*.documents.*.delete"
          )
        ) {
          try {
            loadData();
          } catch (error) {
            console.log(error);
            toast({
              title: "Error",
              status: "error",
              duration: 3000,
              description: "Unable to pull updated data, Please refresh.",
            });
          }
        }
      }
    );

    return () => {
      unsubscribe();
    };
  }, [projectId, setProject, toast]);

  const handleDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const sourceColumn = columns[source.droppableId];
    const destinationColumn = columns[destination.droppableId];

    const sourceItems = [...sourceColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);

    if (source.droppableId === destination.droppableId) {
      sourceItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
      });
    } else {
      const destinationItems = [...destinationColumn.items];
      destinationItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destinationColumn,
          items: destinationItems,
        },
      });
    }

    if (result.source.droppableId !== result.destination.droppableId) {
      try {
        updateTaskStatus(removed.taskId, destinationColumn.name.toLowerCase());
      } catch (error) {
        toast({
          title: "Error",
          status: "error",
          duration: 3000,
          description: error.message,
        });
      }
    }
  };

  if (loading)
    return (
      <div className="place-content-center grid h-full w-full">
        {" "}
        <Spinner />
      </div>
    );

  return (
    <>
      {fetchedTasks.length === 0 ? (
        <div className="flex justify-center flex-col space-y-3 items-center h-full w-full">
          <h2 className="text-2xl font-bold">No tasks yet</h2>
          <p className="text-sm">Create a new task from the sidebar</p>
        </div>
      ) : (
        <main className="grid grid-cols-3 flex-1 px-10 py-4 p	b-4 gap-5 bg-transparent overflow-auto">
          <DragDropContext
            onDragEnd={(result) => handleDragEnd(result, columns, setColumns)}
          >
            {Object.entries(columns).map(([id, col]) => {
              return (
                <Droppable key={id} droppableId={id}>
                  {(provided, snapshot) => {
                    return (
                      <Column
                        title={toTileCase(col.name)}
                        provided={provided}
                        snapshot={snapshot}
                      >
                        {col.items.map((todo, index) => {
                          return (
                            <Draggable
                              index={index}
                              draggableId={todo.taskId}
                              key={todo.taskId}
                            >
                              {(provided, snapshot) => {
                                return (
                                  <TaskCard
                                    task={todo}
                                    members={project.members}
                                    provided={provided}
                                    snapshot={snapshot}
                                  />
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </Column>
                    );
                  }}
                </Droppable>
              );
            })}
          </DragDropContext>
        </main>
      )}
    </>
  );
};

export default ProjectPage;
