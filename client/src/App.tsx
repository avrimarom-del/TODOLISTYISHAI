import { Router } from "./router/Router";
import { BrowserRouter } from "react-router-dom";
import { Box, CssBaseline } from "@mui/material";
import { Sidebar } from "./components/Layout/SideBar"; // We will create this next

const App = () => {
  return (
    <BrowserRouter>
      <CssBaseline />

      <Box sx={{ display: "flex" }}>
        <Sidebar />

        {/* 2. THE MAIN CONTENT: This area changes when you click links */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            bgcolor: "background.default",
            p: 3,
            minHeight: "100vh",
          }}
        >
          <Router />
        </Box>
      </Box>
    </BrowserRouter>
  );
};

export { App };
