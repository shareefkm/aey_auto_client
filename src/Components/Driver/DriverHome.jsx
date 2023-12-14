import React from "react";
import { Box, Typography } from "@mui/material";
import SideBar from "../../Layout/Driver/SideBar";
import DashCard from "../Common/DashCard";

function DriverHome() {
  return (
    <Box display={{ xs: "block", sm: "flex" }}>
      <Box sx={{ width: { xs: "0", sm: "240px" } }}>
        <SideBar />
      </Box>
      <Box
        sx={{
          backgroundColor: "black",
          width: "100%",
          height: "100vh",
          color: "white",
          p:3
        }}
      >
        <Box sx={{pb:2}}>
          <Box>
          <Typography variant="h5" component="h2" sx={{fontWeight:'800', fontFamily: 'monospace', letterSpacing: '-1px' }}>
            Hi Heading
          </Typography>
          <Typography variant="h5" component="h2" sx={{fontWeight:'800', fontFamily: 'monospace', letterSpacing: '-1px' }}>
            Hi Heading
          </Typography>
          </Box>
          <Box>
            
          </Box>
        </Box>
        <DashCard />
      </Box>
    </Box>
  );
}

export default DriverHome;
