import { Box } from '@mui/material';

import Header from './components/header/Header';
import MainContents from './components/mainContents/MainContents';

function App() {
  return (
    <>
      <Box bgcolor={'background.default'} color={'text.primary'}>
        <Header />
        <MainContents />
      </Box>
    </>
  );
}

export default App;
