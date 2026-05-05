import { useState, useEffect } from "react";
import { TodoList } from "../components/Todo/TodoList";
import { TodoDialog } from "../components/Todo/TodoDialog";
import type { Todo } from "../types/Todo";
import { Stack } from "@mui/material";
import {
  apiCreateTodo,
  apiGetTodos,
  apiEditTodo,
  apiDeleteTodo,
} from "../api/todos";

const TodoPage = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState(""); // whats the role
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setLoading(true);
        const resData = await apiGetTodos();
        setTodos(resData);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const addTodo = async (todo: Todo) => {
    try {
      const newTodo = await apiCreateTodo(todo);
      setTodos((prevTodos) => [...prevTodos, newTodo]);
    } catch (err) {
      console.error("Failed to sync the create to the server:", err);
    }
  };

  const deleteTodo = async (todoId: string) => {
    try {
      const deletedTodo = await apiDeleteTodo(todoId);
      setTodos((prevTodos) => prevTodos.filter((t) => t._id !== todoId));
    } catch (err) {
      console.error("Failed to sync the delete to the server:", err);
    }
  };
  const editTodo = async (id: string, newTodo: Todo) => {
    try {
      const editedTodo = await apiEditTodo(id, newTodo);
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo._id === id ? editedTodo : todo)),
      );
    } catch (err) {
      console.error("Failed to sync the edit to the server:", err);
    }
  };
  return (
    <Stack>
      <TodoDialog onAdd={addTodo} />
      <TodoList
        todos={todos}
        onDelete={deleteTodo}
        onEdit={editTodo}
        isLoading={loading}
      />
    </Stack>
  );
};

export { TodoPage };
