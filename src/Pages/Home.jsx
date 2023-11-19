import React from "react";
import Navbar from "../Layout/Header/Navbar";
import { Box } from "@mui/material";

function Home() {
  return (
    <div>
      <Box position="fixed" width="100%">
        <Navbar value={"home"} />
      </Box>
    </div>
  );
}

export default Home;
