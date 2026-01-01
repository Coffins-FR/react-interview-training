import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Routes, Route } from "react-router";
import Autocomplete from "./page/Autocomplete";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<App />} />
        <Route path="page/autocomplete" element={<Autocomplete />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
