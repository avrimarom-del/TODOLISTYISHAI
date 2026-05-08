import { Routes, Route } from "react-router-dom";
import { pages } from "./Pages";
const Router = () => {
  return (
    <Routes>
      {pages.map((page) => (
        // לשנות ל key
        <Route path={page.path} element={page.element} />
      ))}
    </Routes>
  );
};

export { Router };
