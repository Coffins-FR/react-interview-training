import React from "react";
import { useDroppable } from "@dnd-kit/core";
import clsx from "clsx";

interface DroppableProps {
  // Define any props if needed
  type?: string;
  children?: React.ReactNode;
  className?: string;
}

const Droppable = ({ type, children, className }: DroppableProps) => {
  const { setNodeRef } = useDroppable({
    id: type ?? "droppable",
    data: { type },
  });

  const mainClasseName = clsx(className);
  return (
    <div ref={setNodeRef} className={mainClasseName}>
      {children}
    </div>
  );
};

export default Droppable;
