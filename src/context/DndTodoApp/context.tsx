import { createContext } from "react";
import type { DndAppContextProps } from "./interface";

const DndTodoAppStateContext = createContext<DndAppContextProps | null>(null);

export default DndTodoAppStateContext;
