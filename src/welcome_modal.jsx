// WelcomeModal.jsx
import React from 'react';
import Button from '@mui/material/Button';
import { styled, useTheme } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import InfoOutlineIcon from '@mui/icons-material/InfoOutline';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import CheckIcon from '@mui/icons-material/Check';
import Link from '@mui/material/Link';

import { useEffect, useState } from 'react';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function WelcomeModal({ open, onClose, serverawake }) {
  const theme = useTheme();

const [isShown, setIsShown] = useState(() => {
  return sessionStorage.getItem('welcomeShown') === 'true';
});



const handleClose = () => {
  sessionStorage.setItem('welcomeShown', 'true');
  setIsShown(true); 
    onClose();
};


  return (
    isShown ? null :
    <BootstrapDialog
      aria-labelledby="customized-dialog-title"
      open={open}
      sx={{ backdropFilter: 'blur(20px)' }}
    >
      <DialogTitle sx={{ m: 0, p: 2, alignItems: 'center', display: 'flex', gap: '10px' }}>
        <InfoOutlineIcon /> Notice
      </DialogTitle>

      <DialogContent
        sx={{
          maxHeight: '400px',
          background: theme.palette.background.paper,
          color: theme.palette.text.primary,
        }}
        dividers
      >
        <Typography>
          This website is a <strong>demo task management platform</strong> built to showcase my full-stack development skills using the <strong>MERN Stack</strong> (MongoDB, Express, React, Node.js).
        </Typography>

        <Typography variant="h6">Frontend (React)</Typography>
        <ul>
          <li>React.js (SPA architecture)</li>
          <li>Material UI (component-based design)</li>
          <li>React Hooks: useState, useEffect, useContext</li>
          <li>Axios for API calls</li>
          <li>JWT stored in localStorage</li>
        </ul>

        <Typography variant="h6">Backend (Node.js + Express)</Typography>
        <ul>
          <li>Express.js framework</li>
          <li>MongoDB with Mongoose</li>
          <li>JWT authentication system</li>
          <li>RESTful API (login, register, add/complete/delete tasks)</li>
        </ul>

        <Typography variant="h6">Hosting</Typography>
        <ul>
          <li>Frontend: Vercel (GitHub repository)</li>
          <li>Backend: Render (free tier, cold start delay)</li>
          <li>Database: MongoDB Atlas</li>
        </ul>

        <Typography variant="h6">Features</Typography>
        <ul>
          <li>Task CRUD operations</li>
          <li>Completed vs Incomplete task filtering</li>
          <li>Modal-based Login/Register</li>
          <li>Context-based refresh mechanism</li>
        </ul>

        <Typography variant="h6">Author</Typography>
        <Typography gutterBottom>
          Created by <strong>mopok dh</strong>, MERN Stack Developer. This is a portfolio project.
        </Typography>

        <Typography variant="h6">Future Improvements</Typography>
        <ul>
          <li>Add deadlines and priorities</li>
          <li>Integrate Redux or Zustand</li>
          <li>Real-time sync with Socket.IO</li>
          <li>User profile features</li>
        </ul>

        <Typography sx={{ fontSize: '0.9rem', color: 'gray' }}>
          * Source Code:&nbsp;
          <Link href="https://github.com/sdrabdalfattah/tasks-front-end-react-edition-" target="_blank" rel="noopener noreferrer" underline="hover">
            GitHub Repository
          </Link>
          <br />
          * You can view more of my projects on my&nbsp;
          <Link href="https://www.linkedin.com/in/mopok-dh-75415a34a/" target="_blank" rel="noopener noreferrer" underline="hover">
            LinkedIn Profile
          </Link>
        </Typography>
      </DialogContent>

      <DialogActions  sx={{alignItems:"center",justifyContent:'center',display:"flex"}}>
        <Box
          component="section"
          sx={{
            height: {xs:'auto',sm: '40px',},
            bgcolor: theme.palette.background.default,
            p: 2,
            gap: '10px',
            borderRadius: '5px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'left',
            width: '100%',
            color: theme.palette.text.primary,
          }}
        >
          {serverawake ? (
            <>
              <CheckIcon sx={{ color: 'rgba(0, 255, 13, 0.8)' }} />
              <span>Server is ready</span>
            </>
          ) : (
            <>
              <CircularProgress size="20px" />
              <Typography>Starting server... this may take a few seconds</Typography>
            </>
          )}
        </Box>

        <Button disabled={!serverawake} onClick={handleClose} variant="contained">
          OK
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
}
