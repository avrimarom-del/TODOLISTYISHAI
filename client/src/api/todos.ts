import type { Todo } from "../types/Todo";
import { axiosInstance } from "./axios";

const getTodos = async (): Promise<Todo[]> => {
  const res = await axiosInstance.get<Todo[]>("/todos");
  return res.data.data;
};

const createTodo = async (todo: Omit<Todo, "_id">) => {
  const res = await axiosInstance.post<Todo>("/todos", todo);
  return res.data;
};

export { getTodos, createTodo };
