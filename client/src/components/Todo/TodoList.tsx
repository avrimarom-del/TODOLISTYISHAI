import { Stack } from "@mui/material";
import type { Todo } from "../../types/Todo";
import { TodoCard } from "./TodoCard";
import { TodoListSkeleton } from "../skeletons/TodoListSkeleton";

interface TodoListProps {
  todos: Todo[];
  onDelete: (id: string) => void;
  onEdit: (id: string, todoData: Todo) => void;
  isLoading: boolean;
}

const TodoList = ({ todos, onDelete, onEdit, isLoading }: TodoListProps) =>
  isLoading ? (
    <TodoListSkeleton />
  ) : (
    <Stack
      spacing={2}
      sx={{ width: "100%", maxWidth: "500px", margin: "0 auto" }}
    >
      {todos.map((todo) => (
        <TodoCard
          todo={todo}
          key={todo._id}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </Stack>
  );

export { TodoList };
