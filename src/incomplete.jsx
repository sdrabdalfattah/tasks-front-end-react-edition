import IncompleteTaskComponent from './incomplete_task';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { useTaskContext } from './TaskContext';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function IncompleteComponent({ onCompleteTask }) {
  const { reloadTasks } = useTaskContext();
  const [incompleteTasks, setIncompleteTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    const userDataRaw = localStorage.getItem('userData');
    const token = localStorage.getItem('JWTtoken');

    if (!userDataRaw || !token) {
      console.warn("🚪 المستخدم غير مسجل الدخول");
      setIsLoggedIn(false);
      return;
    }

    const userData = JSON.parse(userDataRaw);
    if (!userData || !userData.id) {
      console.warn("🚪 بيانات المستخدم ناقصة");
      setIsLoggedIn(false);
      return;
    }

    const userId = userData.id;
    setIsLoading(true);

    axios.get('https://back-end-4-xz27.onrender.com/incomplete-todos', {
      headers: { Authorization: `Bearer ${token}` },
      params: { userId }
    })
      .then((res) => {
        setIncompleteTasks(res.data.incompleteTodos || []);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("❌ خطأ في جلب المهام:", err);
        setIsLoading(false);
      });
  }, [reloadTasks]);

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
        transition: 'all 0.5s ease',
        maxHeight: incompleteTasks.length === 0 ? '100px' : `${incompleteTasks.length * 80 + 100}px`,
        boxShadow: theme.palette.mode === 'dark'
          ? '0px 0px 10px rgba(255, 255, 255, 0)'
          : '0px 0px 10px rgba(0,0,0,0.1)'
      }}
    >
      {isLoading && (
        <LinearProgress
          sx={{
            width: '100%',
            backgroundColor: 'transparent',
            '& .MuiLinearProgress-bar': {
              backgroundColor: theme.palette.primary.main
            }
          }}
        />
      )}

      <Typography
        sx={{
          marginBlock: '10px',
          textAlign: 'left',
          fontSize: '18px',
          width: '100%',
          color: theme.palette.text.primary,
        }}
      >
       Incomplete tasks: {incompleteTasks.length}

      </Typography>

      <Divider sx={{ backgroundColor: theme.palette.divider, width: '100%' }} />

      {isLoggedIn && (
        <IncompleteTaskComponent
          tasks={incompleteTasks}
          onTaskComplete={onCompleteTask}
        />
      )}
    </Box>
  );
}
