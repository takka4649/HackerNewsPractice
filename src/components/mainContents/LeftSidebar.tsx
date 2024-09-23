import { Box, Tab, Tabs } from '@mui/material';
import React from 'react';

interface tabNameProps {
  tabName: string;
  tabNameChange: (event: React.SyntheticEvent, newTabNameValue: string) => void;
}

const LeftSidebar: React.FC<tabNameProps> = ({ tabName, tabNameChange }) => {
  return (
    <Box flex={1} p={2} sx={{ display: { xs: 'none', sm: 'block' } }}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={tabName}
        onChange={tabNameChange}
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        <Tab label="New" value="new" />
        <Tab label="Top" value="top" />
        <Tab label="Best" value="best" />
      </Tabs>
    </Box>
  );
};

export default LeftSidebar;
