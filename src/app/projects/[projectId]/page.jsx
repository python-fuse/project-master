"use client";

import { tasks, todoTasks } from "@/scripts/data";
import { fetchColumns, fetchTasks, fetchProject } from '@/utils/databaseFunctions'
import TaskCard from "../components/TaskCard";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useState, useEffect } from "react";
import Column from "../components/Column";
import { ID } from 'appwrite';
import { useToast } from "@chakra-ui/react";

// const project = {
//   projectId: "project1",
//   name: "Project Alpha",
//   description: "This is the first project.",
//   members: ["user1", "user2"],
//   ownerId: "6658f4bde77ceb6a4b21",
//   createdAt: new Date(),
//   updatedAt: new Date(),
// };

const transformData = (columns, tasks) => {
  const formattedColumns = {};
  columns.forEach(column => {
    formattedColumns[column.columnId] = {
      name: column.name,
      items: tasks.filter(task => task.status.toLowerCase() === column.name.toLowerCase())
    };
  });
  return formattedColumns;
};

const initialColumns = {
  [ID.unique()]: {
    name: 'Todo',
    items: todoTasks,
  },
  [ID.unique()]: {
    name: 'In Progress',
    items: [],
  },
  [ID.unique()]: {
    name: 'Done',
    items: [],
  },
};

const Page = ({params}) => {
  const [columns, setColumns] = useState({});
  const [project, setProject] = useState({})
  const { projectId } = params
  const toast = useToast()

  useEffect(() => {
    const loadData = async () => {
      console.log(projectId);
      try{
        const projectRes = await fetchProject(projectId)
        const columnsRes = await fetchColumns(projectId);
        const tasks = await fetchTasks(projectId);
        const formattedColumns = transformData(columnsRes, tasks);
        setColumns(formattedColumns);
        setProject(projectRes)
        console.log(columnsRes);
      }
      catch (error) {
        console.log(error);
        toast({
          title:'Error',
          status:'error',
          duration:3000,
          description:error.message
        })
      }
    };
    loadData();
  }, []);

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
  };

  return (
    <main className="grid grid-cols-3 px-10 py-4 gap-5 h-screen flex-1 bg-red-200 overflow-y-scroll">
      <DragDropContext onDragEnd={(result) => handleDragEnd(result, columns, setColumns)}>
        {Object.entries(columns).map(([id, col]) => {
          return (
            <Droppable key={id} droppableId={id}>
              {(provided, snapshot) => {
                return (
                  <Column title={col.name} provided={provided} snapshot={snapshot}>
                    {col.items.map((todo, index) => {
                      return (
                        <Draggable index={index} draggableId={todo.taskId} key={todo.taskId}>
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
  );
};

export default Page;
