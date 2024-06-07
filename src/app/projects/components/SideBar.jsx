"use client";

import React, { useEffect, useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import Membercard from "./Membercard";
import { IconButton, Button, useToast, Spinner } from "@chakra-ui/react";
import { useProject } from "@/utils/ProjectContext";
import {
  TASKCOLLECTIONID,
  fetchCompletedTasks,
  fetchInProgressTasks,
  fetchTodoTasks,
} from "@/utils/databaseFunctions";
import client from "@/utils/appwrite";

const SideBar = () => {
  const { project } = useProject();
  const [todoTasks, setTodoTasks] = useState([]);
  const [inProgressTasks, setInProgressTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const toast = useToast();

  useEffect(() => {
    const loadTasks = async () => {
      try {
        fetchTodoTasks(project.projectId).then((data) => {
          setTodoTasks(data);
        });
        fetchInProgressTasks(project.projectId).then((data) => {
          setInProgressTasks(data);
        });
        fetchCompletedTasks(project.projectId).then((data) => {
          setCompletedTasks(data);
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch tasks",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    };

    loadTasks();

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
          loadTasks();
        }
      }
    );

    return () => {
      unsubscribe();
    };
  }, [project]);

  return (
    <aside className="flex justify-between flex-col p-2 h-screen dark:bg-neutral-700 border-r border-gray-700 shadow-lg w-[250px] overflow-auto">
      {project === null ? (
        <Spinner />
      ) : (
        <>
          <div className="">
            <h2 className="text-2xl text-wrap font-bold">{project.name}</h2>
            <p className="dark:text-gray-400">{project.description}</p>
          </div>

          <div className="flex flex-col gap-y-1">
            <div className="flex justify-between items-center">
              <p className="font-bold text-xl">Tasks</p>

              <IconButton
                isRound
                colorScheme={"grey"}
                title="New Task"
                variant={"ghost"}
                icon={<FaPlusCircle />}
              />
            </div>

            <div className="rounded dark:bg-neutral-900 gap-y-2 p-4 grid grid-cols-2">
              <p className="font-bold text-blue-300">Todo</p>
              <p className="text-right text-blue-300">{todoTasks.length}</p>

              <p className="font-bold text-yellow-400">In progress</p>
              <p className="text-right text-yellow-400">
                {inProgressTasks.length}
              </p>

              <p className="font-bold text-green-600">Done</p>
              <p className="text-green-600 text-right">
                {completedTasks.length}
              </p>
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            <h2 className="font-bold text-xl">Members</h2>

            <div className="rounded-lg dark:bg-neutral-900 gap-y-2 p-4 space-y-2 ">
              {project.members.map((mem, index) => {
                return <Membercard key={index} member={mem} />;
              })}
            </div>
          </div>
          <div className="flex flex-col space-y-2 ">
            <Button variant={"outline"} colorScheme={"blue"}>
              Add member
            </Button>
            <Button colorScheme={"blue"}>Assign task</Button>
          </div>
        </>
      )}
    </aside>
  );
};

export default SideBar;
