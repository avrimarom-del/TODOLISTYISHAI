import { BrowserRouter } from "react-router-dom";
import { Router } from "./router/Router";
import { CssBaseline } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./context/AuthContext";

const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <CssBaseline />
          <Router />
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export { App };
