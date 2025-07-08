import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { useTaskContext } from './TaskContext';

import axios from 'axios';
import { useState } from 'react';

export default function AddTaskModal({ handleClose,open }) {

const [taskName, setTaskName] = useState('');

    const { triggerReloadTasks, triggerReloadCompleted } = useTaskContext();

  const [loading, setLoading] = useState(false);

const handelAddTask = () => {
  setLoading(true);



  const storedToken = localStorage.getItem('JWTtoken');
  const storedUserData = JSON.parse(localStorage.getItem('userData'));
  const userId = storedUserData.id;


  const data = {
     userId: userId,
        task: taskName
  }

    console.log(storedUserData)

    axios.post('https://back-end-4-xz27.onrender.com/new-todo',data, {
        headers: {
            'Authorization': `Bearer ${storedToken}` 
        }
    })
    .then(function (response) {
       setLoading(false);
         triggerReloadTasks()
    console.log('Task added successfully!', response);
    handleClose()
    })
    .catch(function (error) {
       setLoading(false);
        console.error('There was an error adding the task!', error);
    });
    
}


const handleSubmit = (event) => {
  event.preventDefault()
}

  return (
    <>
      <Dialog
      
        maxWidth="sm"
      open={open} onClose={handleClose}>
        <DialogTitle>add task</DialogTitle>
        <DialogContent sx={{ paddingBottom: 0 }}>
           <DialogContentText>
          you can add a task here, just enter the task name and click add.
          </DialogContentText>
          <form onSubmit={handleSubmit}>
            <TextField
              autoFocus
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              margin="dense"
              id="name"
              name="taskName"
              label="task here"
              type="text"
              fullWidth
              variant="standard"
            />
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button variant='contained' loading={loading} onClick={handelAddTask} type="submit">add</Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}