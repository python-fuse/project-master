"use client";
import React, { useEffect, useState, useContext } from "react";
import ProjectCard from "./ProjectCard";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { UserContext } from "@/utils/auth";
import fetchProjects from "@/utils/fetchProjects";
import { Spinner } from "@chakra-ui/react";
import { database } from "@/scripts/data";
import client from "@/utils/appwrite";

const TopProjects = () => {
  const { user, loading: userLoading } = useContext(UserContext);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      if (user && user.$id) {
        const fetchedProjects = await fetchProjects(user.$id);
        setProjects(fetchedProjects);
      }
      setLoading(false);
    };

    if (!userLoading) {
      loadProjects();

      // Setup real-time listener
      const unsubscribe = client.subscribe(
        "databases.project-master.collections.6654a886000b7fd29d6d.documents",
        (response) => {
          // Handle real-time events
          if (response.events.includes("databases.*.collections.*.documents.*.create") ||
              response.events.includes("databases.*.collections.*.documents.*.update") ||
              response.events.includes("databases.*.collections.*.documents.*.delete")) {
            loadProjects(); // Refetch projects on any create, update, or delete
          }
        }
      );

      // Cleanup subscription on component unmount
      return () => {
        unsubscribe();
      };
    }
  }, [user, userLoading]);

  if (userLoading || loading) return <Spinner />;

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
        {projects.length > 0 ? (
          projects.slice(0,4).map((project, index) => {
            return (
              <ProjectCard
                key={index}
                projectTitle={project.name}
                description={project.description}
                members={project.members}
                createdAt={project.createdAt}
                updatedAt={project.updatedAt}
                dueDate={project.dueDate}
              />
            );
          })
        ) : (
          <div className="flex flex-col w-full text-center">
            <h2 className="text-3xl text-red-400">No projects found!</h2>
            <p>Create a project to get started</p>
          </div>
        )}
      </div>
    </>
  );
};

export default TopProjects;

