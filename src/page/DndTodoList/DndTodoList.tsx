import { useContext } from "react";
import { DndContext, type DragMoveEvent } from "@dnd-kit/core";
import Modal from "../../components/Modal/Modal";
import DndModalForm from "../../containers/DndModalForm";
import TodoContainer from "../../containers/TodoContainer";
import DndTodoAppStateContext from "../../context/DndTodoApp/context";

const DndTodoList = () => {
  const context = useContext(DndTodoAppStateContext);

  if (!context) {
    throw new Error("DndTodoAppStateContext must be used within a provider");
  }

  const { state, switchTaskState } = context;

  const handleDragEnd = (event: DragMoveEvent) => {
    const { active, over } = event;
    const activeType = active.data.current?.type as keyof typeof state;
    const overType = over?.data.current?.type as keyof typeof state;
    if (activeType && overType && activeType !== overType) {
      if (switchTaskState) {
        switchTaskState(active.id as string, overType);
      }
    }

    // Handle drag end logic here
  };

  return (
    <div className="p-16 h-screen bg-gray-50">
      <h1 className="font-bold text-3xl mb-16">Dnd Todo List Page</h1>
      <DndContext onDragEnd={handleDragEnd}>
        <Modal
          title="Add New ToDo"
          description="Fill the form below to add a new todo item. Then, drag and drop it to the desired state. Then, manage your tasks with ease!"
          buttonProps={{ children: <span>Add ToDo</span> }}
        >
          <DndModalForm />
        </Modal>
        <div className=" overflow-y-scroll">
          <div className="flex gap-4 mt-8 ">
            <TodoContainer title="To Do" items={state.todos} type="todos" />
            <TodoContainer
              title="Running"
              items={state.running}
              type="running"
            />
            <TodoContainer
              title="Done"
              items={state.completed}
              type="completed"
            />
          </div>
        </div>
      </DndContext>
    </div>
  );
};

export default DndTodoList;
