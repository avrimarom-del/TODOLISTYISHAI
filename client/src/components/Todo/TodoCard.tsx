import {
  Typography,
  Card,
  CardContent,
  Button,
  Stack,
  Checkbox,
  Chip,
} from "@mui/material";
import type { Todo } from "../../types/Todo";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useAuth } from "../../context/AuthContext";

interface TodoCardProps {
  todo: Todo;
  onDelete: (id: string) => void;
  onEdit: (todoData: Todo) => void;
  onToggleCompleted: (todoData: Todo) => void;
}

const TodoCard = ({
  todo,
  onDelete,
  onEdit,
  onToggleCompleted,
}: TodoCardProps) => {
  const { user } = useAuth();

  const getPrioritycolor = (priority: string) => {
    switch (priority) {
      case "high":
        return "error";
      case "medium":
        return "warning";
      case "low":
        return "default";
      default:
        return "default";
    }
  };

  const isAdmin = user?.role === "admin";

  return (
    <Card sx={{ mb: 2, opacity: todo.completed ? 0.7 : 1 }}>
      <CardContent>
        <Stack
          direction="row"
          spacing={2}
          sx={{
            mb: 1,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              flexGrow: 1,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {todo.title}
          </Typography>
          <Chip
            label={todo.priority}
            size="small"
            color={getPrioritycolor(todo.priority) as any}
            variant="outlined"
            sx={{ textTransform: "capitalize", minWidth: "80px" }}
          />
        </Stack>

        {todo.description ? (
          <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
            {todo.description}
          </Typography>
        ) : (
          isAdmin && (
            <Typography
              variant="caption"
              sx={{
                fontStyle: "italic",
                color: "gray",
                cursor: "pointer",
                display: "block",
                mb: 2,
              }}
              onClick={() => onEdit(todo)}
            >
              + add a description to this todo
            </Typography>
          )
        )}

        <Stack
          direction="row"
          sx={{ justifyContent: "space-between", alignItems: "center" }}
        >
          <Stack direction="row" spacing={1}>
            {isAdmin && (
              <>
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
                  onClick={() => onEdit(todo)}
                >
                  Edit
                </Button>
              </>
            )}
          </Stack>

          <Stack direction="row" sx={{ alignItems: "center" }}>
            <Typography variant="caption" color="textSecondary">
              Done
            </Typography>
            <Checkbox
              checked={todo.completed}
              onChange={(event) => {
                event.stopPropagation();
                onToggleCompleted(todo);
              }}
            />
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export { TodoCard };
