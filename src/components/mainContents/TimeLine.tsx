import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Pagination, Tab } from '@mui/material';
import { styled } from '@mui/system';
import React, { useState } from 'react';
import NewsPost from './newslist/NewsPostList';

const TimeLineBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});
const TabItem = styled(Tab)({
  flex: '1',
});
interface tabNameProps {
  tabName: string;
  tabNameChange: (event: React.SyntheticEvent, newTabNameValue: string) => void;
}

const TimeLine: React.FC<tabNameProps> = ({ tabName, tabNameChange }) => {
  const [page, setPage] = useState(1);
  return (
    <>
      <TimeLineBox flex={4} p={2}>
        <Pagination count={10} color="primary" onChange={(e, page) => setPage(page)} page={page} />
        <TabContext value={tabName}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: 'divider',
              width: '100%',
              display: { xs: 'block', sm: 'none' },
            }}
          >
            <TabList onChange={tabNameChange}>
              <TabItem label="New" value="new" />
              <TabItem label="Top" value="top" />
              <TabItem label="Best" value="best" />
            </TabList>
          </Box>
          <TabPanel value={tabName} sx={{ width: '100%' }}>
            <NewsPost tabName={tabName} page={page} setPage={setPage} />
          </TabPanel>
        </TabContext>
        <Pagination count={10} color="primary" onChange={(e, page) => setPage(page)} page={page} />
      </TimeLineBox>
    </>
  );
};

export default TimeLine;
