import Link from "next/link";
import React from "react";

const TaskCard = ({ title, dueDate, projectTitle }) => {
  return (
    <Link
      href={"/dashboard"}
      className="shadow-lg shadow-neutral-950 hover:scale-95 duration-300 bg-gradient-to-br  to-blue-400 from-blue-600 rounded-lg p-4"
    >
      <h2 className="font-bold text-sm text-neutral-300 mb-4">
        {projectTitle}
      </h2>
      <h2 className="font-bold text-4xl text-neutral-100 mb-4">{title}</h2>

      <div className="flex justify-between">
        <p className="text-sm font-semibold text-gray-300">
          Due in <strong className="text-red-400 font-bold">{dueDate}</strong>
        </p>
      </div>
    </Link>
  );
};

export default TaskCard;
