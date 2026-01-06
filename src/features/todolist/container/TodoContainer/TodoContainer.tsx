import Draggable from "../../../shared/containers/Draggable";
import Droppable from "../../../shared/containers/Dropppable";
import type { TodoItem, AppState } from "../../context/interface";
import TodoCard from "../../components/Card";
import clsx from "clsx";

interface TodoContainerProps {
  title: string;
  type: keyof AppState;
  items: TodoItem[];
  className?: string;
}

const TodoContainer = ({ items, type, className }: TodoContainerProps) => {
  const mainClasseName = clsx(
    "p-4 border border-gray-300 rounded-md min-w-[250px] bg-gray-100 flex-1 shadow-md ",
    className
  );
  return (
    <Droppable type={type} className={mainClasseName}>
      <div className="font-bold mb-4 text-center">{type.toUpperCase()}</div>
      <ul className="space-y-4">
        {items.map((item) => (
          <Draggable key={item.id} id={item.id} type={item.type}>
            <li>
              <TodoCard
                title={item.title}
                content={item.content}
                type={item.type}
              />
            </li>
          </Draggable>
        ))}
      </ul>
    </Droppable>
  );
};

export default TodoContainer;
