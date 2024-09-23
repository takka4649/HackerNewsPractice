import { Stack } from '@mui/material';
import React from 'react';
import LeftSidebar from './LeftSidebar';
import TimeLine from './TimeLine';

const MainContents: React.FC = () => {
  const [tabName, setTabName] = React.useState('new');

  const tabNameChange = (event: React.SyntheticEvent, newTabNameValue: string) => {
    setTabName(newTabNameValue);
  };
  return (
    <>
      <Stack direction="row" spacing={2}>
        <LeftSidebar tabName={tabName} tabNameChange={tabNameChange} />
        <TimeLine tabName={tabName} tabNameChange={tabNameChange} />
      </Stack>
    </>
  );
};

export default MainContents;
