import { Box, Toolbar } from "@mui/material";
import { Sidebar } from "./SideBar";
import { Outlet } from "react-router-dom"; // Import the placeholder

const MainLayout = () => {
  return ( 
    <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box component="main" sx={{flexGrow: 1, p:3}}>
          <Outlet />     
        </Box>
    </Box>
  )
};


export { MainLayout };