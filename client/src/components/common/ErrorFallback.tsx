import { Typography, Button, Paper } from "@mui/material";
import { ErrorOutlined as ErrorOutlineIcon } from "@mui/icons-material";
import type { FallbackProps } from "react-error-boundary";

const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
  return (
    <Paper
      elevation={3}
      sx={{
        p: 4,
        textAlign: "center",
        mt: 4,
        borderRadius: 2,
        border: "1px solid",
        borderColor: "error.light",
      }}
    >
      <ErrorOutlineIcon color="error" sx={{ fontSize: 60, mb: 2 }} />
      <Typography
        variant="h5"
        color="error"
        gutterBottom
        sx={{ fontWeight: "bold" }}
      >
        Something went wrong
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mb: 3, fontStyle: "italic" }}
      >
        {errorMessage}
      </Typography>
      <Button variant="contained" color="primary" onClick={resetErrorBoundary}>
        Try Again
      </Button>
    </Paper>
  );
};

export { ErrorFallback };