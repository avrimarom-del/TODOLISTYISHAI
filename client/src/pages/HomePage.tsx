import { Box, Typography } from "@mui/material";
import { useAuth } from "../context/AuthContext";
const HomePage = () => {
  const { user } = useAuth();
  return (
    <Box>
      <Typography>
        Logged in as: <b>{user?.username}</b>
      </Typography>
      <Typography variant="h1">Home page</Typography>
    </Box>
  );
};

export { HomePage };
