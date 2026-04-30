import type { Todo } from "../types/Todo";
import { axoisInstance } from "./axios";

const getTodos = async (): Promise<Todo[]> => {
  const res = await axoisInstance.get<Todo[]>("/todos");
  return res.data;
};

export { getTodos };
