"use client";
import React, { useContext } from "react";
import TaskCard from "./TaskCard";
import { UserContext } from "@/utils/auth";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

const TopTasks = () => {
  const { user } = useContext(UserContext);
  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold dark:text-neutral-500 light:text-black">
          Urgent Tasks
        </h2>

        <Link
          href={`/tasks/${user?.$id}`}
          className="text-blue-400 hover:text-white duration-300"
        >
          <FaArrowRight />
        </Link>
      </div>
      <div className="grid grid-cols-4  gap-5">
        <TaskCard
          projectTitle={"Student Hub"}
          title={"Make Landing Page"}
          dueDate={"3 days"}
        />
        <TaskCard
          projectTitle={"Movie Sure"}
          title={"Make Landing Page"}
          dueDate={"3 days"}
        />
        <TaskCard
          projectTitle={"Facebook"}
          title={"Implement Google Auth"}
          dueDate={"6 days"}
        />
        <TaskCard
          projectTitle={"Hot AI"}
          title={"Integrate OpenAI"}
          dueDate={"1 week"}
        />
      </div>
    </>
  );
};

export default TopTasks;
