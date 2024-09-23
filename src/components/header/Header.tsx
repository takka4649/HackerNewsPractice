import { Newspaper } from '@mui/icons-material';
import { AppBar, Toolbar, Typography } from '@mui/material';
import React from 'react';

const Header: React.FC = () => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Newspaper />
        <Typography ml={2} variant="h5" component="h1">
          NewsSite
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
