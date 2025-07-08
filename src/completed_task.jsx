import Divider from '@mui/material/Divider';
import Fab from '@mui/material/Fab';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
import axios from 'axios';

import dayjs from 'dayjs';
import { useTaskContext } from './TaskContext';

export default function CompletedTask({ tasks }) {
  const theme = useTheme();
  const storedToken = localStorage.getItem('JWTtoken');
  const [loadingTaskId, setLoadingTaskId] = useState(null);
  const { triggerReloadCompleted } = useTaskContext();

  const handeldelete = (todoId) => {
    setLoadingTaskId(todoId);
    axios
      .delete('https://back-end-4-xz27.onrender.com/delete-todo', {
        headers: { Authorization: `Bearer ${storedToken}` },
        data: { todoId }
      })
      .then((res) => {
        console.log('تم الحذف ✅', res.data);
        setLoadingTaskId(null);
        triggerReloadCompleted();
      })
      .catch((err) => {
        console.error('❌ خطأ في الحذف:', err);
        setLoadingTaskId(null);
      });
  };

  return (
    <>
      {tasks.map((task) => {
        const formatted = dayjs(task.createdAt).format('DD/MM/YYYY - HH:mm');

        return (
          <Tooltip title={formatted} key={task._id}>
            <Box
              sx={{
                backgroundColor: theme.palette.mode === 'dark'
                  ? theme.palette.grey[800]
                  : theme.palette.grey[100],
                color: theme.palette.text.primary,
                marginTop: "10px",
                width: '98.5%',
                borderRadius: '7px',
                display: 'flex',
                alignItems: "center",
                justifyContent: "space-between",
                padding: '8px 12px',
                transition: 'all 0.3s ease'
              }}
            >
              <Typography
                sx={{
                  textAlign: 'left',
                  flex: 1,
                  fontSize: '16px',
                  color: theme.palette.text.primary
                }}
              >
                {task.task}
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Tooltip title="completed">
                  <CheckIcon sx={{ color: 'lightgreen' }} />
                </Tooltip>

                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{
                    backgroundColor: theme.palette.divider,
                    marginInline: '10px'
                  }}
                />

                <Tooltip title="delete">
                  <Fab
                    onClick={() => handeldelete(task._id)}
                    sx={{
                      backgroundColor: 'rgb(223, 40, 40)',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: 'rgb(180, 30, 30)'
                      },
                      zIndex: 10
                    }}
                    size="small"
                    aria-label="delete"
                  >
                    {loadingTaskId === task._id ? (
                      <CircularProgress size={20} sx={{ color: 'white' }} />
                    ) : (
                      <DeleteIcon />
                    )}
                  </Fab>
                </Tooltip>
              </Box>
            </Box>
          </Tooltip>
        );
      })}
    </>
  );
}
