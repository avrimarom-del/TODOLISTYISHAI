import { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import type { Todo } from "../../types/Todo";

interface TodoFormProps {
  onAdd: (todo: Todo) => void;
}

const TodoForm = ({ onAdd }: TodoFormProps) => {
  const [text, setText] = useState("");

  const handleClick = () => {
    if (!text.trim()) return;

    const newTodo: Todo = {
      _id: Date.now().toString(),
      title: text,
      description: "",
      completed: false,
      userId: "user_4",
      priority: 1,
    };

    onAdd(newTodo);
    setText("");
  };

  return (
    <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
      <TextField
        label="New Task"
        variant="outlined"
        size="small"
        fullWidth
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Button variant="contained" onClick={handleClick}>
        Add
      </Button>
    </Box>
  );
};

export { TodoForm };
