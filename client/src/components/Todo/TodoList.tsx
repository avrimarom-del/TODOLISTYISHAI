import { Box } from "@mui/material";
import type { Todo } from "../../types/Todo";
import { TodoCard } from "./TodoCard";

interface TodoListProps {
  todos: Todo[];
  onDelete: (id: string) => void;
  onEdit: (id: string, todoData: Todo) => void
}

const TodoList = ({ todos, onDelete, onEdit }: TodoListProps) => (
  <Box sx={{ p: 2 }}>
    {todos.map((todo) => (
      <TodoCard
        todo={todo}
        key={todo._id}
        onDelete={onDelete}
        onEdit={onEdit}
      />
    ))}
  </Box>
);

export { TodoList };
