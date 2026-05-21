import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { NotFoundPage } from "../pages/NotFoundPage";
import { TodoPage } from "../pages/TodoPage";

import type { ReactNode } from "react";

interface Page {
  path: string;
  label: string;
  visible: boolean;
  element: ReactNode;
}

const pages: Page[] = [
  {
    path: "/",
    label: "בית",
    visible: true,
    element: <HomePage />,
  },
  {
    path: "/todos",
    label: "משימות",
    visible: true,
    element: <TodoPage />,
  },
  {
    path: "/login",
    label: "התחברות",
    visible: true,
    element: <LoginPage />,
  },
  {
    path: "*",
    label: "not found",
    visible: false,
    element: <NotFoundPage />,
  },
];

export { pages };
