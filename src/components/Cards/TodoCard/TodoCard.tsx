import type { DndItem } from "../../../context/DndTodoApp/interface";
import clsx from "clsx";

type TodoCardProps = Pick<DndItem, "title" | "content" | "type">;

const TodoCard = ({ content, title, type = "todos" }: TodoCardProps) => {
  const cardClassName = clsx("p-4 border-l-4 bg-white shadow-sm", {
    [`c-card--${type}`]: !!type,
  });
  return (
    <div className={cardClassName}>
      <span className="font-bold"> {title}</span>
      <span className="block text-sm text-gray-500 mt-2">{content}</span>
    </div>
  );
};

export default TodoCard;
