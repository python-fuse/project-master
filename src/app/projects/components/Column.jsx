import React from "react";

const Column = ({ children, provided , snapshot, title }) => {
  return (
    <div
      ref={provided.innerRef}
      {...provided.droppableProps}
      className={`flex min-h-[300px] flex-col items-center gap-y-4 items-center p-4 ${snapshot.isDraggingOver ? 'bg-blue-200': ''}`}
    >
    <h2>{title}</h2>
      {children}
    </div>
  );
};

export default Column;
