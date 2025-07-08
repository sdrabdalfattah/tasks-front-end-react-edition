// App.jsx
import LargeComponent from './large_component';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { TaskProvider } from './TaskContext';
import './App.css';
import { useState, useMemo } from 'react';

function App() {


const getCustomTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      ...(mode === 'dark'
        ? {
            background: {
              default: '#1e1e1e',
              paper: '#2c2c2c',
            },
            text: {
              primary: '#ffffff',
              secondary: '#aaaaaa',
            },
          }
        : {
            background: {
              default: '#f5f5f5',
              paper: '#ffffff',
            },
            text: {
              primary: '#000000',
              secondary: '#333333',
            },
          }),
    },
  });

const [mode, setMode] = useState(() => {
  return localStorage.getItem('themeMode') || 'dark';
});
const theme = useMemo(() => getCustomTheme(mode), [mode]);

const toggleMode = () => {
  setMode((prev) => {
    const newMode = prev === 'dark' ? 'light' : 'dark';
    localStorage.setItem('themeMode', newMode); 
    return newMode;
  });
};

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div
        style={{
          margin: 0,
          padding:0,
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <TaskProvider>
          <LargeComponent toggleMode={toggleMode} mode={mode} />
        </TaskProvider>
      </div>
    </ThemeProvider>
  );
}

export default App;
