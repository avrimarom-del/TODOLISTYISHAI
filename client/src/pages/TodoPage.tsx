import { useState, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import {
  Stack,
  Button,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { ErrorFallback } from "../components/common/ErrorFallback";
import { TodoList } from "../components/Todo/TodoList";
import { TodoDialog } from "../components/Todo/TodoDialog";
import type { Todo } from "../types/Todo";
import {
  apiCreateTodo,
  apiGetTodos,
  apiEditTodo,
  apiDeleteTodo,
} from "../api/todos";
import { useTodos } from "../hooks/useTodos";

const TodoPage = () => {
  const { getTodosQuery } = useTodos();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [todoToEdit, setTodoToEdit] = useState<Todo | null>(null);

  // const fetchTodos = async () => {
  //   try {
  //     setLoading(true);
  //     const resData = await apiGetTodos();
  //     setTodos(resData);
  //   } catch (err: any) {
  //     setError(err.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchTodos();
  // }, []);

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
        const updatedData = { ...todoToEdit, ...formData };
        const res = await apiEditTodo(todoToEdit._id, updatedData);
        setTodos((prev) =>
          prev.map((todo) => (todo._id === todoToEdit._id ? res : todo)),
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
      setError("Failed to save changes.");
    }
  };

  const deleteTodo = async (todoId: string) => {
    try {
      await apiDeleteTodo(todoId);
      setTodos((prev) => prev.filter((t) => t._id !== todoId));
    } catch (err: any) {
      setError(err.message);
    }
  };

  const toggleCompleted = async (todo: Todo) => {
    try {
      const updatedData = { ...todo, completed: !todo.completed };
      const res = await apiEditTodo(todo._id, updatedData);
      setTodos((prev) => prev.map((t) => (t._id === todo._id ? res : t)));
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <Stack spacing={4} sx={{ p: 4, maxWidth: "800px", margin: "0 auto" }}>
      {error && (
        <Typography color="error" sx={{ textAlign: "center" }}>
          {error}
        </Typography>
      )}
      <Stack
        direction="row"
        sx={{ justifyContent: "space-between", alignItems: "center" }}
      >
        <Typography
          variant="h4"
          component="h1"
          sx={{ fontWeight: "bold", color: "primary.main" }}
        >
          Mission Control
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={onOpenCreate}
        >
          Add New Task
        </Button>
      </Stack>

      <TodoDialog
        open={isDialogOpen}
        initialData={todoToEdit}
        onSave={onSaveTodo}
        onClose={onCloseDialog}
      />

      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        // onReset={() => fetchTodos()}
      >
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <TodoList
            todos={getTodosQuery.data || []}
            onDelete={deleteTodo}
            onEdit={onOpenEdit}
            onToggleCompleted={toggleCompleted}
            isLoading={loading}
          />
        )}
      </ErrorBoundary>
    </Stack>
  );
};

export { TodoPage };
