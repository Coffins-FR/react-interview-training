import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Routes, Route } from "react-router";
import Autocomplete from "./features/autocomplete/page";
import DndTodoList from "./features/todolist/page";
import DndTodoAppStateProvider from "./features/todolist/context/index.ts";
import Dogo from "./features/infinitedogogallery/page/Dogo.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DndTodoAppStateProvider>
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<App />} />
          <Route path="page/autocomplete" element={<Autocomplete />} />
          <Route path="page/dndtodolist" element={<DndTodoList />} />
          <Route path="page/dogogallery" element={<Dogo />} />
        </Routes>
      </BrowserRouter>
    </DndTodoAppStateProvider>
  </StrictMode>
);
