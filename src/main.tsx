import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/globals.css";
import DndTodoAppStateProvider from "./features/todolist/context/index.ts";
import AppRoutes from "@/src/router/routes.tsx";
import { ThemeProvider } from "@/src/features/shared/providers/theme/ThemeProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DndTodoAppStateProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <AppRoutes />
      </ThemeProvider>
    </DndTodoAppStateProvider>
  </StrictMode>
);
