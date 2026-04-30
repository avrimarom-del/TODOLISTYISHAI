import { Typography, Card, CardContent, Button } from "@mui/material";
import type { Todo } from "../../types/Todo";

interface TodoCardProps {
  todo: Todo;
  onDelete: (id: string) => void;
  onEdit: (id: string, todoData: Todo) => void;
}

const TodoCard = ({ todo, onDelete, onEdit }: TodoCardProps) => {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {todo.title}
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
          {todo.description}
        </Typography>
        <Typography variant="caption" display="block" sx={{ mb: 2 }}>
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
        </Stack>
      </CardContent>
    </Card>
  );
};

export { TodoCard };
