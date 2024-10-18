import React from 'react';
import Chat from './components/Chat';
import Header from './components/Header';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
  palette: {
    mode: 'light', // You can change this to 'dark' for dark mode
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* Header component */}
      <Header />
      
      {/* Chat interface */}
      <Chat />
    </ThemeProvider>
  );
}

export default App;