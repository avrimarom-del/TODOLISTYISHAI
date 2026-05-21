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
import { useTodos } from "../hooks/useTodos";
import { useAuth } from "../context/AuthContext";

const TodoPage = () => {
  const { getTodosQuery, createTodo, editTodo, deleteTodo } = useTodos();
  const [error, setError] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [todoToEdit, setTodoToEdit] = useState<Todo | null>(null);

  const { user, logout } = useAuth();

  const onOpenCreate = () => {
    if (user?.role !== "admin") return;
    setTodoToEdit(null);
    setIsDialogOpen(true);
  };

  const onOpenEdit = (todo: Todo) => {
    if (user?.role !== "admin") return;
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
        await editTodo({
          id: todoToEdit._id,
          updatedData: formData,
        });
      } else {
        await createTodo({
          ...formData,
          completed: false,
          userId: "69ed222338f3d85b4f5bdb39",
        });
      }
      onCloseDialog();
    } catch (err) {
      setError("Failed to save changes.");
    }
  };

  const onDeleteTodo = async (todoId: string) => {
    try {
      await deleteTodo(todoId);
    } catch (err: any) {
      setError(err.message || "Failed to delete task.");
    }
  };

  const toggleCompleted = async (todo: Todo) => {
    try {
      await editTodo({
        id: todo._id,
        updatedData: { ...todo, completed: !todo.completed } as any,
      });
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
      <Stack>
        <Typography>
          Logged in as: <b>{user?.username}</b>
        </Typography>
        <Button size="small" color="error" onClick={logout}>
          Logout
        </Button>
      </Stack>
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
        {user?.role === "admin" && (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={onOpenCreate}
          >
            Add New Task
          </Button>
        )}
      </Stack>

      <TodoDialog
        open={isDialogOpen}
        initialData={todoToEdit}
        onSave={onSaveTodo}
        onClose={onCloseDialog}
      />

      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => getTodosQuery.refetch()}
      >
        {getTodosQuery.isLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <TodoList
            todos={getTodosQuery.data || []}
            onDelete={onDeleteTodo}
            onEdit={onOpenEdit}
            onToggleCompleted={toggleCompleted}
            isLoading={getTodosQuery.isFetching}
          />
        )}
      </ErrorBoundary>
    </Stack>
  );
};

export { TodoPage };
