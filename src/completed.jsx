import CompletedTask from './completed_task';

import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { useTheme } from '@mui/material/styles';
import { useTaskContext } from './TaskContext';

import { useState, useEffect } from 'react';
import axios from 'axios';

export default function CompletedComponent() {
  const theme = useTheme();
  const { reloadCompleted } = useTaskContext();

  const [completedTasks, setCompletedTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    fetchCompletedTasks(); // دالة جلب المهام المكتملة
  }, [reloadCompleted]);

  const fetchCompletedTasks = () => {
    const userDataRaw = localStorage.getItem('userData');
    const token = localStorage.getItem('JWTtoken');

    if (!userDataRaw || !token) {
      setIsLoggedIn(false);
      return;
    }

    const userData = JSON.parse(userDataRaw);
    if (!userData || !userData.id) {
      setIsLoggedIn(false);
      return;
    }

    const userId = userData.id;

    setIsLoading(true);
    axios.get('https://back-end-4-xz27.onrender.com/completed-todos', {
      headers: { Authorization: `Bearer ${token}` },
      params: { userId }
    })
      .then((response) => {
        setCompletedTasks(response.data.completedTodos || []);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("⚠️ خطأ في جلب المهام المكتملة:", error);
        setIsLoading(false);
      });
  };

  return (
    <Box
      sx={{
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        borderRadius: '7px',
        marginTop: '10px',
        padding: '0px 15px',
        paddingBottom: '20px',
        transition: 'max-height 0.5s ease',
        maxHeight: completedTasks.length === 0 ? '100px' : `${completedTasks.length * 80 + 100}px`,
        boxShadow: theme.palette.mode === 'dark'
          ? '0px 0px 10px rgba(255, 255, 255, 0)'
          : '0px 0px 10px rgba(0, 0, 0, 0.1)'
      }}
    >
      {isLoading && (
        <LinearProgress sx={{ width: '100%', background: 'transparent' }} />
      )}

      <Typography
        sx={{
          textAlign: 'left',
          fontSize: '18px',
           marginBlock: '10px',
          width: '100%',
          color: theme.palette.text.primary
        }}
      >
       Completed tasks: {completedTasks.length}
   
      </Typography>

      <Divider sx={{ background: theme.palette.divider, width: '100%' }} />

      <CompletedTask tasks={completedTasks} />
    </Box>
  );
}
