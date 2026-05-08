import { HomePage } from "../pages/HomePage";
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
    path: "*",
    label: "not found",
    visible: false,
    element: <NotFoundPage />,
  },
];

export { pages };
