import React from 'react';
import Board from '../Board/Board';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#663985',
    },
    secondary: {
      main: '#f7f6dc',
    },
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Board />
    </ThemeProvider>
  );
};

export default App;
