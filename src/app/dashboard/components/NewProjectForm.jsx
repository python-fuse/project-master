"use client";
import { UserContext } from "@/utils/auth";
import createProject from "@/utils/createProject";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import { parseDate, getLocalTimeZone } from "@internationalized/date";
import { DatePicker } from "@nextui-org/date-picker";
import React, { useContext, useState } from "react";
import { ID } from "appwrite";
import { convertToDate } from "@/utils/convertToDate";

const NewProjectForm = () => {
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [dueDate, setDueDate] = useState(parseDate("2024-04-04"));
  const { user } = useContext(UserContext);
  const toast = useToast();

  const project = {
    projectId: ID.unique(),
    name: projectName,
    description: description,
    members: [user?.$id],
    ownerId: user?.$id,
    createdAt: new Date(),
    updatedAt: new Date(),
    dueDate: convertToDate(dueDate),
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const proj = await createProject(project);
      toast({
        title: "Project Created Sucessfully",
        status: "success",
        isClosable: true,
      });
      setLoading(false);
    } catch (error) {
      toast({
        title: "An error occored!",
        description: error?.message,
        status: "error",
      });
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-y-4 py-3 ">
      <FormControl>
        <FormLabel>Project Name*</FormLabel>
        <Input
          placeholder="Enter project name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Description*</FormLabel>
        <Input
          placeholder="What's this project about?"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Due date</FormLabel>
        <DatePicker
          label="Due date"
          validate
          errorMessage="Please enter a valid date."
          value={dueDate}
          onChange={setDueDate}
        />
      </FormControl>

      <div className="flex place-content-end">
        <Button type="submit" colorScheme="blue" isLoading={loading}>
          Create
        </Button>
      </div>
    </form>
  );
};

export default NewProjectForm;
