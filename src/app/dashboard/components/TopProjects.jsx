import React from "react";
import ProjectCard from "./ProjectCard";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { projects } from "@/scripts/data";

const TopProjects = () => {
  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold dark:text-neutral-500 light:text-black">
          Projects
        </h2>

        <Link
          href="/projects"
          className="text-blue-400 hover:text-white duration-300"
        >
          <FaArrowRight />
        </Link>
      </div>

      <div className="grid grid-cols-4 gap-5">
        {projects.map((project) => {
          return (
            <ProjectCard
              projectTitle={project.name}
              description={project.description}
              members={project.members}
              createdAt={project.createdAt}
              dueDate={"3 days"}
            />
          );
        })}
      </div>
    </>
  );
};

export default TopProjects;
