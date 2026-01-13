import App from "../App.tsx";
import { BrowserRouter, Routes, Route } from "react-router";
import Autocomplete from "../features/autocomplete/page";
import DndTodoList from "../features/todolist/page";

import Dogo from "../features/infinitedogogallery/page/Dogo.tsx";
import Layout from "@/src/features/shared/Layout";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index path="/" element={<App />} />
          <Route path="page/autocomplete" element={<Autocomplete />} />
          <Route path="page/dndtodolist" element={<DndTodoList />} />
          <Route path="page/dogogallery" element={<Dogo />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
