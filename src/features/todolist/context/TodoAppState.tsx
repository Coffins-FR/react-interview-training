import React, { useEffect, useState } from "react";
import type { AppState, TodoItem } from "./interface";
import DndTodoAppStateContext from "./context";

const initialState: AppState = {
  todos: [],
  running: [],
  completed: [],
};

export const DndTodoAppStateProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [state, setState] = useState<AppState>(() => {
    const savedState = localStorage.getItem("dndAppState");
    return savedState ? JSON.parse(savedState) : initialState;
  });

  useEffect(() => {
    localStorage.setItem("dndAppState", JSON.stringify(state));
  }, [state]);

  const setTaskState = (item: TodoItem, type: keyof AppState) => {
    setState((prev) => ({
      ...prev,
      [type]: [...prev[type], item],
    }));
  };

  const getTaskById = (id: string, type: keyof AppState) => {
    return state[type].find((item) => item.id === id);
  };

  const getAllTasks = () => {
    return Object.values(state).flat();
  };

  const switchTaskState = (itemId: string, toType: keyof AppState) => {
    setState((prev) => {
      const itemToMove = Object.values(prev)
        .flat()
        .find((item) => item.id === itemId);
      if (!itemToMove) return prev;
      const fromType = itemToMove.type as keyof AppState;

      return {
        ...prev,
        [fromType]: prev[fromType].filter((item) => item.id !== itemId),
        [toType]: [...prev[toType], { ...itemToMove, type: toType }],
      };
    });
  };

  const deleteTask = (itemId: string, fromType: keyof AppState) => {
    setState((prev) => ({
      ...prev,
      [fromType]: prev[fromType].filter((item) => item.id !== itemId),
    }));
  };

  return (
    <DndTodoAppStateContext.Provider
      value={{
        state,
        setTaskState,
        getTaskById,
        getAllTasks,
        switchTaskState,
        deleteTask,
      }}
    >
      {children}
    </DndTodoAppStateContext.Provider>
  );
};
