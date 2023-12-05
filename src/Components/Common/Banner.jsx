import React from 'react';
import { Paper, Typography } from '@mui/material';


const Banner = () => {
 
  return (
    <Paper sx={{p:10, backgroundColor: 'secondary.main',transition: 'background-color 0.3s',
    '&:hover': {
      backgroundColor: 'primary.main',
      color: 'secondary.main'
    }}}>
      <Typography variant="h4" component="div" color = 'white'>
        Welcome to our website!
      </Typography>
      <Typography variant="subtitle1" component="div" color = 'white'>
        Explore and discover amazing content.
      </Typography>
    </Paper>
  );
};

export default Banner;

