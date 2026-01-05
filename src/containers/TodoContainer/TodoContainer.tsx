import Draggable from "../Draggable";
import Droppable from "../Dropppable";
import type { DndItem, DndAppState } from "../../context/DndTodoApp/interface";
import TodoCard from "../../components/Cards/TodoCard";
import clsx from "clsx";

interface TodoContainerProps {
  title: string;
  type: keyof DndAppState;
  items: DndItem[];
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
