import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function LogoutModal({ open, handleClose, setTrueUser }) {
  const handleLogout = () => {
    localStorage.removeItem('userData');
    localStorage.removeItem('JWTtoken');
    setTrueUser(false);
    handleClose(); // ✅ إغلاق المودال بعد الخروج
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="logout-dialog-title"
      aria-describedby="logout-dialog-description"
    >
      <DialogTitle id="logout-dialog-title">logout</DialogTitle>
      <DialogContent>
        <DialogContentText id="logout-dialog-description">
          are you sure you want to log out? 
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleLogout} variant="contained" color="error">
          logout
        </Button>
      </DialogActions>
    </Dialog>
  );
}
