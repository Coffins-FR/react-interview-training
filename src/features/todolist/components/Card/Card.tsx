import type { TodoItem } from "../../context/interface"; // Update the path if the file is named differently
import clsx from "clsx";

type CardProps = Pick<TodoItem, "title" | "content" | "type">;

const Card = ({ content, title, type = "todos" }: CardProps) => {
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

export default Card;
