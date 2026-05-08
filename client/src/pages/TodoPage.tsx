import { useState, useEffect } from "react";
// Added Button and Typography to imports
import { Stack, Button, Typography, CircularProgress } from "@mui/material";
import { TodoList } from "../components/Todo/TodoList";
import { TodoDialog } from "../components/Todo/TodoDialog";
import type { Todo } from "../types/Todo";
import {
  apiCreateTodo,
  apiGetTodos,
  apiEditTodo,
  apiDeleteTodo,
} from "../api/todos";

const TodoPage = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [todoToEdit, setTodoToEdit] = useState<Todo | null>(null);

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

  const onOpenCreate = () => {
    setTodoToEdit(null);
    setIsDialogOpen(true);
  };

  const onOpenEdit = (todo: Todo) => {
    setTodoToEdit(todo);
    setIsDialogOpen(true);
  };

  const onCloseDialog = () => {
    setIsDialogOpen(false);
    setTodoToEdit(null);
  };

  const onSaveTodo = async (formData: any) => {
    try {
      if (todoToEdit) {
        const updatedTodo = await apiEditTodo(todoToEdit._id, {
          ...todoToEdit,
          ...formData,
        });
        setTodos((prev) =>
          prev.map((todo) =>
            todo._id === todoToEdit._id ? updatedTodo : todo,
          ),
        );
      } else {
        const newTodo = await apiCreateTodo({
          ...formData,
          completed: false,
          userId: "69ed222338f3d85b4f5bdb39",
        });
        setTodos((prev) => [newTodo, ...prev]);
      }
      onCloseDialog();
    } catch (err) {
      console.error("Save failed:", err);
      setError("Failed to save changes.");
    }
  };

  const deleteTodo = async (todoId: string) => {
    try {
      await apiDeleteTodo(todoId);
      setTodos((prevTodos) => prevTodos.filter((t) => t._id !== todoId));
    } catch (err) {
      console.error("Failed to sync the delete to the server:", err);
    }
  };

  return (
    <Stack spacing={2} sx={{ p: 4 }}>
      {error && <Typography color="error">{error}</Typography>}

      <Button
        variant="contained"
        onClick={onOpenCreate}
        sx={{ alignSelf: "flex-start" }}
      >
        Add New Task
      </Button>

      <TodoDialog
        open={isDialogOpen}
        initialData={todoToEdit}
        onSave={onSaveTodo}
        onClose={onCloseDialog}
      />

      {loading ? (
        <CircularProgress sx={{ alignSelf: "center" }} />
      ) : (
        <TodoList
          todos={todos}
          onDelete={deleteTodo}
          onEdit={onOpenEdit}
          isLoading={loading}
        />
      )}
    </Stack>
  );
};

export { TodoPage };
