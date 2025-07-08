import LoginModal from './login_modal';
import RegisterModal from './register_modal';
import AddTaskModal from './add_task_modal';
import IncompleteComponent from './incomplete';
import CompletedComponent from './completed';
import LogoutModal from './logout_modal';
import WelcomeModal from './welcome_modal';


import axios from 'axios';

import PersonIcon from '@mui/icons-material/Person';
import Brightness3Icon from '@mui/icons-material/Brightness3';
import LightModeIcon from '@mui/icons-material/LightMode';
import IconButton from '@mui/material/IconButton';
import { Button, Box, Typography } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import AddIcon from '@mui/icons-material/Add';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import LoginIcon from '@mui/icons-material/Login';
import { useState, useEffect } from 'react';
import Divider from '@mui/material/Divider';
import { useTheme } from '@mui/material/styles';

export default function LargeComponent({ toggleMode, mode }) {
  const theme = useTheme();

  const [trueUser, setTrueUser] = useState(false);
  const [displayUsername, setDisplayUsername] = useState('');

  useEffect(() => {
    const userDataRaw = localStorage.getItem('userData');
    const userData = userDataRaw ? JSON.parse(userDataRaw) : null;
    const JWTtoken = localStorage.getItem('JWTtoken');
    setDisplayUsername(userData ? userData.username : 'your username here');
    setTrueUser(userData && JWTtoken);
  }, []);




  const [openlogout, setopenlogout] = useState(false);
  const [openlog, setopenlog] = useState(false);
  const [openddtask, setOpenaddtask] = useState(false);
  const [openreg, setopenreg] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);

  const [serverawake, setServerawake] = useState(false);
useEffect(() => {
    axios.delete('https://back-end-4-xz27.onrender.com/delete-todo')
      .finally(() => {
        setServerawake(true);
      });
}, []);



  return (
    <>
      <Box
        sx={{
           flexDirection: {
      xs: 'column',
      sm: 'row',    
    },
          width: {  xs: '93%', md: '70%' },
          padding: '15px 10px',
          backgroundColor: theme.palette.background.paper,
          display: 'flex',
          justifyContent: 'space-between',
          position: 'fixed',
          top: '40px',
          borderRadius: "7px",
          alignItems: "center",
          zIndex: 1000,
          color: theme.palette.text.primary,
          boxShadow: theme.palette.mode === 'dark'
            ? '0 0 5px rgba(255,255,255,0.1)'
            : '0 0 5px rgba(0,0,0,0.1)',
          
        }}
      >
        <Typography sx={{display:"flex",width:{  xs: '100%', md: '' },alignItems:"center" ,gap:"10px",fontSize: '18px', margin: 0,marginBottom:{
      xs: '10px',
      sm: '0px',    
    }, }}>
        < PersonIcon sx={{marginLeft:"20px"}}/>   {trueUser ? displayUsername : "your username here"}
        </Typography>

        <Divider variant="middle" sx={{width:"100%",marginBottom:"10px", display:{  xs: 'flex', md: 'none' }}}/>

        <Box sx={{ display: 'flex', gap: '10px',lignItems: 'center' }}>
          <IconButton sx={{background:"rgba(97, 97, 97, 0.5)"}} aria-label="toggle-theme" onClick={toggleMode}>
            {mode === 'dark' ? <LightModeIcon /> : <Brightness3Icon />}
          </IconButton>

          {trueUser ? (
            <>
              <Button
                onClick={() => setOpenaddtask(true)}
                startIcon={<AddIcon />}
                variant="contained"
              >
                Add Task
              </Button>
              <Button
                onClick={() => setopenlogout(true)}
                startIcon={<LogoutIcon />}
                variant="contained"
                sx={{ backgroundColor: theme.palette.mode === 'dark'
            ? 'rgb(238, 99, 99)'
            : 'rgb(223, 40, 40)', }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button onClick={() => setopenlog(true)} startIcon={<LoginIcon />} variant="contained">
                Login
              </Button>
              <Button onClick={() => setopenreg(true)} startIcon={<HowToRegIcon />} variant="contained">
                Register
              </Button>
            </>
          )}
        </Box>
      </Box>

      <AddTaskModal open={openddtask} handleClose={() => setOpenaddtask(false)} />

      {openlog && (
        <LoginModal
          open={true}
          handleClose={() => setopenlog(false)}
          setTrueUser={setTrueUser}
          onSwitch={() => {
            setopenlog(false);
            setopenreg(true);
          }}
        />
      )}

      {openreg && (
        <RegisterModal
          open={true}
          handleClose={() => setopenreg(false)}
          setTrueUser={setTrueUser}
          onSwitch={() => {
            setopenreg(false);
            setopenlog(true);
          }}
        />
      )}

      {trueUser ? (
        <Box
          sx={{
             width: {  xs: '93%', md: '70%' },
            display: 'flex',
            alignItems: "top",
            justifyContent: "center",
            height: "50vh",
            marginTop: '200px',
            flexDirection: 'column',
            color: theme.palette.text.primary
          }}
        >
          <IncompleteComponent />
          <CompletedComponent />
        </Box>
      ) : (
        <Typography
          sx={{
            fontSize: "30px",
            color: theme.palette.text.secondary,
            fontWeight: "700",
            marginTop: '300px'
          }}
        >
          Login or Register to add tasks
        </Typography>
      )}
      <WelcomeModal open={showWelcome} serverawake={serverawake} onClose={() => setShowWelcome(false)} />
      <LogoutModal open={openlogout} handleClose={() => setopenlogout(false)} setTrueUser={setTrueUser} />
    </>
  );
}
