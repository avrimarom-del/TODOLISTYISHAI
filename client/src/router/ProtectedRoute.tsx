import type { ReactNode } from "react";
import { useAuth } from "../context/AuthContext";
import { Box, CircularProgress } from "@mui/material";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, isLoading } = useAuth();

  if (isLoading){
    return(
        <Box sx={{display: "flex", justifyContent: "center", alignContent: "center", minHeight: "100vh" }}>
            <CircularProgress />
        </Box>    
    )
  }

  if(!user) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
};

export {ProtectedRoute}