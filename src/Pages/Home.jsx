import React from "react";
import Navbar from "../Layout/Header/Navbar";
import { Box } from "@mui/material";
import ClientHome from "../Components/Client/ClientHome";

function Home() {
  return (
    <div>
      <Box position="fixed" width="100%">
        <Box>
        <Navbar value={"home"} />
        </Box>
        <Box sx={{m:4}}>
        <ClientHome/>
        </Box>
      </Box>
    </div>
  );
}

export default Home;
