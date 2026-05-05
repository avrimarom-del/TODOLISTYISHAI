import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  CircularProgress,
  FormControlLabel,
  Checkbox,
  MenuItem,
} from "@mui/material";
import type { Todo } from "../../types/Todo";
import { apiCreateTodo } from "../../api/todos";

interface TodoDialogProps {
  onAdd: (todo: Todo) => void;
}

const TodoDialog = ({ onAdd }: TodoDialogProps) => {
  const [textTitle, setTextTitle] = useState("");
  const [textDescription, setTextDescription] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [priority, setPriority] = useState("medium");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClick = async () => {
    if (!textTitle.trim() || isSubmitting) return;

    setIsSubmitting(true);

    try {
      console.log("Dialog state - isCompleted:", isCompleted);
      const newTodo = await apiCreateTodo({
        title: textTitle,
        description: textDescription,
        completed: isCompleted,
        userId: "69ed222338f3d85b4f5bdb39",
        priority: priority,
      });

      onAdd(newTodo);
      setTextTitle("");
      setTextDescription("");
      setIsCompleted(false);
      setPriority("medium");
    } catch (err) {
      console.error("Failed to add:", err);
      // Mission: Later we can set an error state here for an MUI Alert
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box sx={{ display: "grid", gap: 1, mb: 3 }}>
      <TextField
        label="New Task"
        variant="outlined"
        size="small"
        fullWidth
        value={textTitle}
        disabled={isSubmitting}
        onChange={(e) => setTextTitle(e.target.value)}
      />
      <TextField
        label="description (Optional)"
        variant="outlined"
        size="small"
        fullWidth
        value={textDescription}
        disabled={isSubmitting}
        onChange={(e) => setTextDescription(e.target.value)}
      />
      <TextField
        select
        label="Priority"
        value={priority}
        size="small"
        fullWidth
        disabled={isSubmitting}
        onChange={(e) => setPriority(e.target.value)}
      >
        <MenuItem value="low">Low</MenuItem>
        <MenuItem value="medium">Medium</MenuItem>
        <MenuItem value="high">High</MenuItem>
      </TextField>
      <FormControlLabel
        control={
          <Checkbox
            checked={isCompleted}
            onChange={(e) => setIsCompleted(e.target.checked)}
            disabled={isSubmitting}
          />
        }
        label="completed"
      />
      <Button
        variant="contained"
        onClick={handleClick}
        disabled={isSubmitting || !textTitle.trim()}
      >
        {isSubmitting ? <CircularProgress size={24} color="inherit" /> : "Add"}
      </Button>
    </Box>
  );
};

export { TodoDialog };
