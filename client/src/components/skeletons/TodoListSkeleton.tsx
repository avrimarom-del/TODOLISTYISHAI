import { TodoCardSkeleton } from "./TodoCardSkeleton";
import { Stack } from "@mui/material";

const TodoListSkeleton = () => (
  <Stack
    spacing={2}
    sx={{ width: "100%", maxWidth: "500px", margin: "0 auto" }}
  >
    <TodoCardSkeleton />
    <TodoCardSkeleton />
    <TodoCardSkeleton />
  </Stack>
);

export { TodoListSkeleton };
