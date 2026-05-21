import { Stack } from "@mui/material";
import type { Todo } from "../../types/Todo";
import { TodoCard } from "./TodoCard";
import { TodoListSkeleton } from "../skeletons/TodoListSkeleton";

interface TodoListProps {
  todos: Todo[];
  onDelete: (id: string) => void;
  onEdit: (todo: Todo) => void;
  isLoading?: boolean;
  onToggleCompleted: (todo: Todo) => void;
}

const TodoList = ({
  todos,
  onDelete,
  onEdit,
  isLoading,
  onToggleCompleted,
}: TodoListProps) => {
  if (todos.length < 0) {
    throw new Error("boundery test: the list crushed successfully");
  }

  if (isLoading) return <TodoListSkeleton />;

  return (
    <Stack>
      {todos.map((todo) => (
        <TodoCard
          todo={todo}
          key={todo._id}
          onDelete={onDelete}
          onEdit={onEdit}
          onToggleCompleted={onToggleCompleted}
        />
      ))}
    </Stack>
  );
};

export { TodoList };
