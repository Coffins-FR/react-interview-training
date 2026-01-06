import { createContext } from "react";
import type { AppContextProps } from "./interface";

const DndTodoAppStateContext = createContext<AppContextProps | null>(null);

export default DndTodoAppStateContext;
