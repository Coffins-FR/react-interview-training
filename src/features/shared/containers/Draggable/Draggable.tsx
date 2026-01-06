import React from "react";
import { useDraggable } from "@dnd-kit/core";
import clsx from "clsx";

interface DraggableProps {
  id: string;
  type: string;
  children: React.ReactNode;
}

const Draggable = ({ id, type, children }: DraggableProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
    data: { type },
  });
  return (
    <div
      className={clsx({
        "cursor-grabbing": !!transform,
        "cursor-grab": !transform,
      })}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        transform: transform
          ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
          : undefined,
      }}
    >
      {children}
    </div>
  );
};

export default Draggable;
