import { Routes, Route } from "react-router-dom";
import { pages } from "./Pages";
import { MainLayout } from "../components/layout/MainLayout";
import { ProtectedRoute } from "./ProtectedRoute"; // Import the guard
import { LoginPage } from "../pages/LoginPage"; // Import your login page

const Router = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route element={<MainLayout />}>
        {pages.map((page) => (
          <Route
            key={page.path}
            path={page.path}
            element={<ProtectedRoute>{page.element}</ProtectedRoute>}
          />
        ))}
      </Route>
    </Routes>
  );
};

export { Router };
