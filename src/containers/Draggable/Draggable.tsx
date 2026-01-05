import React from "react";
import { type DndItem } from "../../context/DndTodoApp/interface";
import { useDraggable } from "@dnd-kit/core";

interface DraggableProps extends Pick<DndItem, "id" | "type"> {
  children: React.ReactNode;
}

const Draggable = ({ id, type, children }: DraggableProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
    data: { type },
  });
  return (
    <div
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
