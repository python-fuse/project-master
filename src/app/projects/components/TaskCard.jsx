import { Avatar, AvatarGroup, Divider, IconButton } from "@chakra-ui/react";
import { formatDistanceToNow } from "date-fns";
import React from "react";
import { FaCalendar, FaComment, FaEllipsisV } from "react-icons/fa";
import Actions from "./Actions";

const TaskCard = ({ task, members, extraClasses, provided, snapshot }) => {
  return (
    <div
      ref={provided.innerRef}
      className={
        `flex flex-col w-[300px] p-2 space-y-5 select-none shadow-lg shadow-black rounded-lg p-4 ${snapshot.isDragging ? 'bg-neutral-700' : 'dark:bg-neutral-800'}`
      }
      {...provided.draggableProps}

      style={{ ...provided.draggableProps.style }}
    >
      <div {...provided.dragHandleProps} className="flex justify-between font-bold">
        <h2 className="text-2xl">{task.name}</h2>
        <IconButton size={"sm"} color={'white'} icon={<FaEllipsisV />} variant={"ghost"} />
      </div>

      <p className="text-neutral-500">{task.description}</p>

      <div className="flex w-max p-1 items-center gap-x-1">
        <FaCalendar />

        <p className="text-sm border p-1 rounded items-center">{formatDistanceToNow(task.dueDate)}</p>
      </div>

      <Divider />

      <div className="flex justify-between items-center">
        <AvatarGroup max={3} size={'sm'}>
          {members.map((member, id) => (
            <Avatar key={id} name="member" />
          ))}
        </AvatarGroup>

        <Actions icon={<FaComment />} value={5} />
      </div>
    </div>
  );
};

export default TaskCard;
