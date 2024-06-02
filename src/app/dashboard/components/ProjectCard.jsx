import { Avatar, AvatarGroup } from "@chakra-ui/react";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";

const ProjectCard = ({
  dueDate,
  projectTitle,
  description,
  members,
  createdAt,
}) => {
  return (
    <Link
      href={"/dashboard"}
      className="shadow-lg shadow-neutral-950 hover:scale-95 duration-300 bg-gradient-to-br flex flex-col space-y-2 justify-between to-blue-400 from-blue-600 rounded-lg px-3  py-4"
    >
      <h2 className="font-bold text-4xl text-neutral-100">{projectTitle}</h2>
      <p className="text-neutral-300">{description}</p>

      <div className="flex justify-between">
        <p className="text-sm font-semibold text-gray-300">
          Started{" "}
          <strong className="text-green-600">
            {formatDistanceToNow(createdAt)} ago
          </strong>
        </p>
        <p className="text-sm text-gray-300">
          Due in <strong className="text-red-400 font-bold">{dueDate}</strong>
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
