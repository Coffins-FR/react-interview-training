import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Routes, Route } from "react-router";
import Autocomplete from "./page/Autocomplete";
import DndTodoList from "./page/DndTodoList";
import DndTodoAppStateProvider from "./context/DndTodoApp";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DndTodoAppStateProvider>
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<App />} />
          <Route path="page/autocomplete" element={<Autocomplete />} />
          <Route path="page/dndtodolist" element={<DndTodoList />} />
        </Routes>
      </BrowserRouter>
    </DndTodoAppStateProvider>
  </StrictMode>
);
