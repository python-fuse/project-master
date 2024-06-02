import { Avatar, AvatarGroup } from "@chakra-ui/react";
import { formatDistanceToNow,format } from "date-fns";
import Link from "next/link";

const ProjectCard = ({
  dueDate,
  projectTitle,
  description,
  members,
  createdAt,
  updatedAt
}) => {
  return (
    <Link
      href={"/dashboard"}
      className="shadow-lg shadow-neutral-950 hover:scale-95 duration-300 bg-gradient-to-br flex flex-col space-y-2 justify-between to-blue-400 from-blue-600 rounded-lg px-3  py-4"
    >
      <h2 className="font-bold text-4xl text-neutral-100">{projectTitle}</h2>
      <p className="text-neutral-300 truncate">{description}</p>

      <div className="flex h-[20px] justify-between">
        <p className="text-xs font-semibold text-gray-300">
          Updated{" "}
          <strong className="text-green-600">
            {formatDistanceToNow(updatedAt)} ago
          </strong>
        </p>
        <p className="text-xs text-gray-300">
          Due in <strong className="text-red-400 font-bold">{formatDistanceToNow(dueDate)}</strong>
        </p>
      </div>

      <AvatarGroup max={3} size={"sm"}>
        {members.map((member) => (
          <Avatar size={"sm"} name={member} />
        ))}
      </AvatarGroup>
    </Link>
  );
};

export default ProjectCard;
