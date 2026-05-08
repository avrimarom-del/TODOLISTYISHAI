import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Stack,
} from "@mui/material";
import type { Todo, TodoFormData } from "../../types/Todo";

interface TodoDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: TodoFormData) => Promise<void>;
  initialData: Todo | null;
}

const TodoDialog = ({
  open,
  onClose,
  onSave,
  initialData,
}: TodoDialogProps) => {
  // 1. LOCAL "DRAFT" STATE
  const [formData, setFormData] = useState<TodoFormData>({
    title: "",
    description: "",
    priority: "medium",
  });

  useEffect(() => {
    if (open) {
      if (initialData) {
        // Load existing data for Editing
        setFormData({
          title: initialData.title,
          description: initialData.description || "",
          priority: initialData.priority as "low" | "medium" | "high",
        });
      } else {
        // Reset for Creating
        setFormData({ title: "", description: "", priority: "medium" });
      }
    }
  }, [open, initialData]);

  // 3. EVENT HANDLERS
  const handleSave = () => {
    if (formData.title.trim()) {
      onSave(formData);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {initialData ? "Update Mission" : "Assign New Mission"}
      </DialogTitle>

      <DialogContent>
        <Stack spacing={3} sx={{ mt: 1 }}>
          {/* TITLE INPUT */}
          <TextField
            label="Title"
            fullWidth
            required
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />

          {/* DESCRIPTION INPUT */}
          <TextField
            label="Description"
            fullWidth
            multiline
            rows={3}
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />

          {/* PRIORITY SELECT */}
          <TextField
            select
            label="Priority"
            value={formData.priority}
            onChange={(e) =>
              setFormData({ ...formData, priority: e.target.value as any })
            }
          >
            <MenuItem value="low">Low</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="high">High</MenuItem>
          </TextField>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ p: 3 }}>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          disabled={!formData.title.trim()}
        >
          {initialData ? "Update" : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export { TodoDialog };
