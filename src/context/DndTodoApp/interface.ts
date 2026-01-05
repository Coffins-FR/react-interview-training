export interface DndItem {
  id: string;
  content?: string;
  title?: string;
  type: keyof DndAppState;
}

export interface DndAppState {
  todos: DndItem[];
  running: DndItem[];
  completed: DndItem[];
}

export interface DndAppContextProps {
  state: DndAppState;
  setTaskState: (item: DndItem, type: keyof DndAppState) => void;
  getTaskById?: (id: string, type: keyof DndAppState) => DndItem | undefined;
  getAllTasks?: () => DndItem[];
  switchTaskState?: (itemId: string, toType: keyof DndAppState) => void;
  deleteTask?: (itemId: string, fromType: keyof DndAppState) => void;
}
