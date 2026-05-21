import type { Todo } from "../types/Todo";
import { axiosInstance } from "./axios";

const apiGetTodos = async (): Promise<Todo[]> => {
  const res = await axiosInstance.get<Todo[]>("/todos");
  return res.data.data;
};

const apiCreateTodo = async (todo: Omit<Todo, "_id">) => {
  const res = await axiosInstance.post<Todo>("/todos", todo);
  return res.data;
};

const apiEditTodo = async (id: string, todo: Todo) => {
  const payload = {
    title: todo.title,
    description: todo.description,
    completed: todo.completed,
    priority: todo.priority,
  }

  const res = await axiosInstance.put<Todo>(`/todos/${id}`, payload);
  return res.data;
};

const apiDeleteTodo = async (id: string) => {
  const res = await axiosInstance.delete<Todo>("/todos/" + id);
  return res.data;
};

export { apiEditTodo, apiCreateTodo, apiGetTodos, apiDeleteTodo };
