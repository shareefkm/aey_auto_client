import React from 'react'
import { Box } from "@mui/material";
import Banner from '../Common/Banner'
import Cards from '../Common/Cards'

function ClientHome() {
  return (
    <div>
        <div>
      <Banner/>
        </div>
        <Box  display='flex' justifyContent='space-between' pt={2}>
      <Cards/>
      <Cards/>
      <Cards/>
      <Cards/>
        </Box>
    </div>
  )
}

export default ClientHome
