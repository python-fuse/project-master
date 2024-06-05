"use client"
import { useState } from 'react'
import {
  Avatar,
  AvatarGroup,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  IconButton,
  useToast
} from "@chakra-ui/react";
import { FaEllipsisV, FaTrash, FaEdit } from 'react-icons/fa'
import { formatDistanceToNow,format } from "date-fns";
import Link from "next/link";
import deleteProject from "@/utils/deleteProject";


const ProjectCard = ({
  projectId,
  dueDate,
  projectTitle,
  description,
  members,
  createdAt,
  updatedAt
}) => {

  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true)
      const res = await deleteProject(projectId)

      toast({
        title:"Project Deleted",
        status: "success",
        isClosable:true,
        duration:2000,
      })
      setLoading(false)
    }
    catch(error){
      setLoading(false)
      toast({
        title:"An error occured!",
        status: "error",
        description:error.message,
        isClosable:true,
        duration:2000,
      })
    }
  }

  return (
    <Link
      href={`/projects/${projectId}`}
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

      <div className="flex justify-between mt-4">
        <AvatarGroup max={3} size={"sm"}>
        {members.map((member) => (
          <Avatar key={member} size={"sm"} name={member} />
        ))}
        </AvatarGroup>

        <Menu>
          <MenuButton
          as={IconButton}
          variant="ghost"
          color="white"
          aria-label='Options'
          icon={<FaEllipsisV/>}
          />

          <MenuList bg='#18181B'>
            <MenuItem bg='#18181B' icon={<FaEdit />} >
              Edit
            </MenuItem>

            <MenuItem bg='#18181B' icon={<FaTrash />} onClick={handleDelete} isLoading={loading}>
              Delete
            </MenuItem>
          </MenuList>
        </Menu>
      </div>
    </Link>
  );
};

export default ProjectCard;
