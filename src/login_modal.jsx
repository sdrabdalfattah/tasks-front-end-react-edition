import {
  Button,
  TextField,
} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Link from '@mui/material/Link';

import { useState } from 'react'

import axios from 'axios';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';




export default function registerModal({ open, handleClose,onSwitch,setTrueUser }) {

const [newUser,setNewUser] = useState({
  email:"",
  password:""
});

  const [loading, setLoading] = useState(false);

  
const [dataShown , setDataShown] = useState({
  Msg:"register to this website to add tasks.",
  errState:false
});



const getUser = ()=> {
console.log(newUser)

setLoading(true);
 setDataShown({
  Msg:"register to this website to add tasks.",
  errState:false
});

axios.post('https://back-end-4-xz27.onrender.com/login', newUser)
  .then(function (response) {
  setLoading(false);
  const userData = response.data.user;
const JWTtoken = response.data.token;
console.log(userData, JWTtoken);
    localStorage.setItem('userData', JSON.stringify(userData));
    localStorage.setItem('JWTtoken', JWTtoken);
    handleClose();
       setTrueUser(true);
  })
  .catch(function (error) {
  setLoading(false);
    setLoading(false);
    console.log(error);
 setDataShown({
  Msg: error.response.data.error,
  errState: true
});
  })


}

  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };


const handleSubmit = (event) => {
  event.preventDefault()
}



    return (
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>login</DialogTitle>
        <DialogContent sx={{ paddingBottom: 0 }}>
              <DialogContentText sx={{color: dataShown.errState ? 'rgb(255, 84, 84)': 'grey'}}>
            {dataShown.Msg}
          </DialogContentText>
          <form onSubmit={handleSubmit}>
                  <TextField
  label="Your Email"
  value={newUser.email}
  onChange={(e) =>
    setNewUser({ ...newUser, email: e.target.value })
  }
  sx={{ marginTop: '20px' }}
  fullWidth
  variant="outlined"
/>
<TextField
  label="Your Password"
  value={newUser.password}
  onChange={(e) =>
    setNewUser({ ...newUser, password: e.target.value })
  }
  variant="outlined"
  type={showPassword ? 'text' : 'password'}
  fullWidth
  margin="normal"
  InputProps={{
    endAdornment: (
      <InputAdornment position="end">
        <IconButton onClick={togglePassword} edge="end">
          {showPassword ? <VisibilityOff /> : <Visibility />}
        </IconButton>
      </InputAdornment>
    ),
  }}
/>
    <p>if you dont have an account <Link
  component="button"
  variant="body2"
  onClick={() => {
       handleClose()
  onSwitch()
  }}
>
  click here
</Link> </p>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
            <Button loading={loading} type="submit" onClick={getUser} variant="contained">Login</Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>)
      
    }