import Divider from '@mui/material/Divider';
import Fab from '@mui/material/Fab';
import CheckIcon from '@mui/icons-material/Check'; 
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { alpha } from '@mui/material/styles';
import dayjs from 'dayjs';

import axios from 'axios';
import { useState } from 'react';
import { useTheme } from '@mui/material/styles';

import { useTaskContext } from './TaskContext';

export default function IncompleteTaskComponent({ tasks }) {
  const theme = useTheme();
  const storedToken = localStorage.getItem('JWTtoken');
  const [loadingTaskId, setLoadingTaskId] = useState(null);
  const [deletingTaskId, setDeletingTaskId] = useState(null);

  const { triggerReloadTasks, triggerReloadCompleted } = useTaskContext();

  const handeldelete = (todoId) => {
    setDeletingTaskId(todoId);
    axios.delete('https://back-end-4-xz27.onrender.com/delete-todo', {
      headers: { Authorization: `Bearer ${storedToken}` },
      data: { todoId }
    })
      .then((response) => {
        triggerReloadTasks();
        setDeletingTaskId(null);
        setLoadingTaskId(null);
        console.log("todo deleted", response.data);
      })
      .catch((error) => {
        console.log("⚠ خطأ:", error);
        setDeletingTaskId(null);
        setLoadingTaskId(null);
      });
  };

  const handelsetcomplete = (todoId) => {
    setLoadingTaskId(todoId);
    axios.put(
      'https://back-end-4-xz27.onrender.com/complete_todo',
      { todoId },
      { headers: { Authorization: `Bearer ${storedToken}` } }
    )
      .then((response) => {
        triggerReloadCompleted();
        triggerReloadTasks();
        setLoadingTaskId(null);
        console.log("✅ المهمة مكتملة:", response.data);
      })
      .catch((error) => {
        console.log("⚠ خطأ:", error);
        setLoadingTaskId(null);
      });
  };

  if (!Array.isArray(tasks)) {
    console.error("❌ tasks ليست مصفوفة:", tasks);
    return <Typography sx={{ color: 'error.main' }}>حدث خطأ في عرض المهام</Typography>;
  }

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
            textAlign: "left",
            flex: 1,
            fontSize: "16px",
            color: theme.palette.text.primary
          }}
        >
          {task.task}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Divider
            orientation="vertical"
            flexItem
            sx={{ background: theme.palette.divider, marginRight: "10px" }}
          />

          <Tooltip title="delete">
            <Fab
              onClick={() => handeldelete(task._id)}
              size="small"
              aria-label="delete"
              sx={{
                backgroundColor: 'rgb(223, 40, 40)',
                color: "white",
                zIndex: 10,
                '&:hover': { backgroundColor: 'rgb(180, 30, 30)' }
              }}
            >
              {deletingTaskId === task._id ? (
                <CircularProgress size={20} sx={{ color: "white" }} />
              ) : (
                <DeleteIcon />
              )}
            </Fab>
          </Tooltip>

          <Tooltip title="complete">
            <Fab
              size="small"
              onClick={() => handelsetcomplete(task._id)}
              aria-label="complete"
              sx={{
                backgroundColor: 'rgb(0, 119, 255)',
                color: "white",
                marginLeft: "10px",
                zIndex: 10,
                '&:hover': { backgroundColor: 'rgb(0, 90, 200)' }
              }}
            >
              {loadingTaskId === task._id ? (
                <CircularProgress size={20} sx={{ color: "white" }} />
              ) : (
                <CheckIcon />
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
