import { useState } from "react";
import { Box, TextField, Button, CircularProgress } from "@mui/material";
import type { Todo } from "../../types/Todo";
import { createTodo } from "../../api/todos";

interface TodoFormProps {
  onAdd: (todo: Todo) => void;
}

const TodoForm = ({ onAdd }: TodoFormProps) => {
  const [text, setText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 1. Added 'async' here
  const handleClick = async () => {
    if (!text.trim() || isSubmitting) return;

    setIsSubmitting(true);

    try {
      // 2. Removed manual _id (Server handles this)
      const newTodo = await createTodo({
        title: text,
        description: "",
        completed: false,
        userId: "69ed222338f3d85b4f5bdb39",
        priority: "low",
      });

      onAdd(newTodo);
      setText("");
    } catch (err) {
      console.error("Failed to add:", err);
      // Mission: Later we can set an error state here for an MUI Alert
    } finally {
      setIsSubmitting(false);
    }
  }; // 3. Corrected bracket placement

  return (
    <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
      <TextField
        label="New Task"
        variant="outlined"
        size="small"
        fullWidth
        value={text}
        disabled={isSubmitting} // 4. Field locks while sending
        onChange={(e) => setText(e.target.value)}
      />
      <Button
        variant="contained"
        onClick={handleClick}
        disabled={isSubmitting || !text.trim()} // 5. Button locks while sending
      >
        {isSubmitting ? <CircularProgress size={24} color="inherit" /> : "Add"}
      </Button>
    </Box>
  );
};

export { TodoForm };
