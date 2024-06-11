"use client";
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
import React, { useState } from "react";
import { convertToDate } from "@/utils/convertToDate";
import { Select, SelectItem } from "@nextui-org/select";
import { editTask } from "@/utils/databaseFunctions";

const EditTaskForm = ({ onClose, task }) => {
  const [taskName, setTaskName] = useState(task?.name);
  const [description, setDescription] = useState(task?.description);
  const [priority, setPriority] = useState(task?.priority);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(task?.status);

  const [dueDate, setDueDate] = useState(
    parseDate(new Date().toISOString().split("T")[0])
  );
  const toast = useToast();

  const taskModel = {
    taskId: task.taskId,
    name: taskName,
    description: description,
    status: status ? status : task.status,
    priority: priority ? priority : task.priority,
    dueDate: dueDate ? convertToDate(dueDate) : task.dueDate,
    updatedAt: new Date(),
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const task = await editTask(taskModel.taskId, taskModel);
      toast({
        title: "Task Edited Successfully!",
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
        <FormLabel>Task Name</FormLabel>
        <Input
          required
          placeholder="Enter task name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Description</FormLabel>
        <Textarea
          placeholder="What's needed to be done?"
          value={description}
          rows={4}
          required
          onChange={(e) => setDescription(e.target.value)}
        />
      </FormControl>

      <Select
        label="Status"
        variant="filled"
        className="w-full"
        placeholder="Select status"
        selectedKeys={[status]}
        onChange={(e) => setStatus(e.target.value)}
      >
        <SelectItem key="todo">Todo</SelectItem>
        <SelectItem key="doing">Doing</SelectItem>
        <SelectItem key="completed">Completed</SelectItem>
      </Select>

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
          Save
        </Button>
      </div>
    </form>
  );
};

export default EditTaskForm;
