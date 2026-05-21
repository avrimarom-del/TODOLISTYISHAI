import { Routes, Route } from "react-router-dom";
import { pages } from "./Pages";
import { MainLayout } from "../components/layout/MainLayout";

const Router = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        {pages.map((page) => (
          <Route path={page.path} element={page.element} />
        ))}
      </Route>
    </Routes>
  );
};
  
export { Router };
