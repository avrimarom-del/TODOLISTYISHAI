import { BrowserRouter } from "react-router-dom";
import { Router } from "./router/Router";
import { CssBaseline } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <CssBaseline />
        <Router />
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export { App };
