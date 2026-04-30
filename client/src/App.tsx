import { useState, useEffect } from "react";
import { TodoList } from "./components/Todo/TodoList";
import { TodoForm } from "./components/Todo/TodoForm";
import type { Todo } from "./types/Todo";
import { Stack } from "@mui/material";
import { getTodos } from "./api/todos";

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setLoading(true); 
        const resData = await getTodos()
        setTodos(resData)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    };
  }, []);

  const addTodo = (todo: Todo) => {  
    setTodos((prevTodos) => [...prevTodos, todo]);
  };

  const deleteTodo = (todoId: string) => {
    setTodos((prevTodos) => prevTodos.filter((t) => t._id !== todoId));
  };

  const editTodo = (todoId: string, updatedTodo: Todo) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo._id === todoId ? updatedTodo : todo)),
    );
  };

  return (
    <Stack>
      <TodoForm onAdd={addTodo} />
      <TodoList todos={todos} onDelete={deleteTodo} onEdit={editTodo} />
    </Stack>
  );
};

export { App };
