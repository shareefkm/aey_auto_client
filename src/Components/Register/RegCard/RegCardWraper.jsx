import React from 'react';
import PropTypes from 'prop-types';

// material-ui
import { Box } from '@mui/material';
import MainCard from '../../Common/MainCard';

// project import

// ==============================|| AUTHENTICATION CARD WRAPPER ||============================== //

function RegCardWraper({ children, ...other }) {
    return (
      <MainCard
        sx={{
          maxWidth: { xs: 400, lg: 475 },
          margin: { xs: 2.5, md: 3 },
          '& > *': {
            flexGrow: 1,
            flexBasis: '50%',
          },
        }}
        content={false}
        {...other}
      >
        <Box sx={{ p: { xs: 2, sm: 3, xl: 5 } }}>{children}</Box>
      </MainCard>
    );
  }
  
  RegCardWraper.propTypes = {
    children: PropTypes.node,
  };

export default RegCardWraper;

