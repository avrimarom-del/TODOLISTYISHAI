import {
  Typography,
  Card,
  CardContent,
  Button,
  Stack,
  Checkbox,
} from "@mui/material";
import type { Todo } from "../../types/Todo";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

interface TodoCardProps {
  todo: Todo;
  onDelete: (id: string) => void;
  onEdit: (id: string, todoData: Todo) => void;
}

const TodoCard = ({ todo, onDelete, onEdit }: TodoCardProps) => {
  const handleToggleStatus = () => {
    const updatedData: Todo = {
      ...todo,
      completed: !todo.completed,
    };
    onEdit(todo._id, updatedData);
  };
  // const getPriorityColor = (priority: string) => {
  //   switch (priority) {
  //     case "high":
  //       return "error";
  //     case "medium":
  //       return "warning";
  //     case "low":
  //       return "success";
  //     default:
  //       return "default";
  //   }
  // };

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {todo.title}
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
          {todo.description}
        </Typography>
        <Typography variant="caption" sx={{ mb: 2 }}>
          {todo.completed ? "Finished" : "Working on it"}
        </Typography>

        <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            color="error"
            size="small"
            startIcon={<DeleteIcon />}
            onClick={() => onDelete(todo._id)}
          >
            Delete
          </Button>
          <Button
            variant="contained"
            size="small"
            startIcon={<EditIcon />}
            onClick={() => onEdit(todo._id, todo)}
          >
            Edit
          </Button>
          <Checkbox checked={todo.completed} onChange={handleToggleStatus} />
        </Stack>
      </CardContent>
    </Card>
  );
};

export { TodoCard };
