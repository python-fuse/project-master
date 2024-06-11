"use client";

import {
  Avatar,
  AvatarGroup,
  Divider,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { formatDistanceToNow } from "date-fns";
import React, { useState } from "react";
import {
  FaCalendar,
  FaComment,
  FaEllipsisV,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import Actions from "./Actions";
import EditTaskModal from "./EditTaskModal";
import { deleteTask } from "@/utils/databaseFunctions";

const TaskCard = ({ task, members, extraClasses, provided, snapshot }) => {
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const handleDelete = async () => {
    try {
      setLoading(true);
      const res = await deleteTask(task.taskId);

      toast({
        title: "Task Deleted",
        status: "success",
        isClosable: true,
        duration: 2000,
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast({
        title: "An error occured!",
        status: "error",
        description: error.message,
        isClosable: true,
        duration: 2000,
      });
    }
  };

  return (
    <div
      ref={provided.innerRef}
      className={`flex flex-col w-[300px] space-y-5 select-none hover:bg-blue-600 shadow-lg shadow-black rounded-lg p-4 ${
        snapshot.isDragging ? "bg-neutral-700" : "dark:bg-neutral-800"
      }`}
      {...provided.draggableProps}
      style={{ ...provided.draggableProps.style }}
    >
      <div
        {...provided.dragHandleProps}
        className="flex justify-between font-bold"
      >
        <div
          className={`p-2 rounded-lg ${
            task.priority == "low"
              ? "bg-green-400"
              : task.priority == "medium"
              ? "bg-yellow-400"
              : "bg-red-500"
          } text-xs`}
        >
          {task.priority}
        </div>

        <Menu>
          <MenuButton
            as={IconButton}
            variant="ghost"
            color="white"
            aria-label="Options"
            icon={<FaEllipsisV />}
          />

          <MenuList bg="#18181B">
            <MenuItem bg="#18181B" icon={<FaEdit />} onClick={onOpen}>
              Edit
            </MenuItem>

            <MenuItem bg="#18181B" icon={<FaTrash />} onClick={handleDelete}>
              Delete
            </MenuItem>
          </MenuList>
        </Menu>
      </div>

      <EditTaskModal task={task} onClose={onClose} isOpen={isOpen} />

      <h2 className="text-2xl">{task.name}</h2>

      <p className="text-neutral-500">{task.description}</p>

      <div className="flex w-max p-1 items-center gap-x-1">
        <FaCalendar />

        <p className="text-sm font-bold border-[3px] p-1 rounded items-center">
          {formatDistanceToNow(task.dueDate)}
        </p>
      </div>

      <Divider />

      <div className="flex justify-between items-center">
        <AvatarGroup max={3} size={"sm"}>
          {members.map((member, id) => (
            <Avatar key={id} name={member} />
          ))}
        </AvatarGroup>

        <Actions icon={<FaComment />} value={5} />
      </div>
    </div>
  );
};

export default TaskCard;
