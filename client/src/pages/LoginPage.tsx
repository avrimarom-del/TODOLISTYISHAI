import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import type { User } from "../types/User";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (userData: User) => {
    await login(userData);
    navigate("/");
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "grey.100",
      }}
    >
      <Card sx={{ maxWidth: 400, width: "100%", p: 2, boxShadow: 3 }}>
        <CardContent>
          <Stack spacing={3} sx={{ textAlign: "center" }}>
            <Typography
              variant="h5"
              component="h1"
              sx={{ fontWeight: "bold" }}
              color="primary"
            >
              Mission Control Login
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Select a simulation role to enter the dashboard
            </Typography>

            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => handleLogin({username: "Avri (Commander)", role: "admin"})}
            >
              Login as Admin
            </Button>

            <Button
              variant="outlined"
              color="primary"
              size="large"
              onClick={() => handleLogin({username: "Developer Soldier", role: "client"})}
            >
              Login as Client
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export { LoginPage };
