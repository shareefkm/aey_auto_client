import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import HowToRegIcon from '@mui/icons-material/HowToReg';
import Banner from "../Common/Banner";
import Cards from "../Common/Cards";
import './style.css'

function ClientHome() {
  return (
    <>
      <Box>
        <Banner />
      </Box>
      <Box>
        <Typography variant="h4" component="div" color = 'primary.main' fontWeight="bold">
          Auto Nearest You
        </Typography>
      </Box>
      <Box display="flex" pt={2} className="card-container">
      <Cards btnIcon={<HowToRegIcon />}/>
      <Cards btnIcon={<HowToRegIcon/>}/>
      <Cards btnIcon={<HowToRegIcon/>}/>
      <Cards btnIcon={<HowToRegIcon/>}/>
    </Box>
    </>
  );
}

export default ClientHome;
