import React from "react";
import Navbar from "../Layout/Header/Navbar";
import Cards from "../Components/Common/Cards";
import { Box } from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';

function Roll() {
    const passangerImage = '/images/rikshaPass.jpg';
    const altText = 'passangerImage';
    const driverImage = '/images/driver.jpg';
    const altTextDrv = 'passangerImage';
  return (
    <div>
      <Box position="fixed" width="100%">
        <Navbar value={"roll"} />
      </Box>
      <Box
        display={{ xs: "block", md: "flex" }}
        justifyContent="center"
        alignItems="center"
        height="100vh"
        gap={6}
      >
        <Cards image={passangerImage} altText={altText} roll={'Passanger'} content={'For Auto seekers'} path={'/login'} btnIcon={<LoginIcon/>}/>
        <Cards image={driverImage} altText={altTextDrv} roll={'Driver'} content={'For Auto Drivers'} path={'/driver/login'} btnIcon={<LoginIcon/>}/>
      </Box>
    </div>
  );
}

export default Roll;
