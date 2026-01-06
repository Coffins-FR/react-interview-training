export interface TodoItem {
  id: string;
  content?: string;
  title?: string;
  type: keyof AppState;
}

export interface AppState {
  todos: TodoItem[];
  running: TodoItem[];
  completed: TodoItem[];
}

export interface AppContextProps {
  state: AppState;
  setTaskState: (item: TodoItem, type: keyof AppState) => void;
  getTaskById?: (id: string, type: keyof AppState) => TodoItem | undefined;
  getAllTasks?: () => TodoItem[];
  switchTaskState?: (itemId: string, toType: keyof AppState) => void;
  deleteTask?: (itemId: string, fromType: keyof AppState) => void;
}
