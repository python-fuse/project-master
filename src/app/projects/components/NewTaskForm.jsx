"use client";
import { UserContext } from "@/utils/auth";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { parseDate } from "@internationalized/date";
import { DatePicker } from "@nextui-org/date-picker";
import React, { useContext, useState } from "react";
import { ID } from "appwrite";
import { convertToDate } from "@/utils/convertToDate";
import { useProject } from "@/utils/ProjectContext";
import { createTask } from "@/utils/createDocuments";
import { Select, SelectItem } from "@nextui-org/select";

const NewTaskForm = ({ onClose }) => {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [loading, setLoading] = useState(false);

  const [dueDate, setDueDate] = useState(
    parseDate(new Date().toISOString().split("T")[0])
  );
  const { user } = useContext(UserContext);
  const { project } = useProject();
  const toast = useToast();

  const taskModel = {
    taskId: ID.unique(),
    projectId: project?.$id,
    name: taskName,
    description: description,
    assigneeId: user.$id,
    status: "todo",
    priority: priority ? priority : "medium",
    dueDate: convertToDate(dueDate),
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const task = await createTask(taskModel);
      toast({
        title: "Task Added Successfully!",
        status: "success",
        isClosable: true,
      });
      setLoading(false);
      onClose();
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
        <FormLabel>Task Name*</FormLabel>
        <Input
          required
          placeholder="Enter task name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Description*</FormLabel>
        <Textarea
          placeholder="What's needed to be done?"
          value={description}
          rows={4}
          required
          onChange={(e) => setDescription(e.target.value)}
        />
      </FormControl>

      <Select
        label="Priority"
        variant="filled"
        className="w-full"
        placeholder="Select priority"
        selectedKeys={[priority]}
        onChange={(e) => setPriority(e.target.value)}
      >
        <SelectItem key="low">Low</SelectItem>
        <SelectItem key="medium">Medium</SelectItem>
        <SelectItem key="high">High</SelectItem>
      </Select>

      <FormControl>
        <FormLabel>Due date</FormLabel>
        <DatePicker
          isRequired
          classname="dark"
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

export default NewTaskForm;
