import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from "axios";
export default function AlertDialog(path) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseOk = async () => {
    console.log(path)
    await axios.delete(path.path);
    window.location.reload();
    setOpen(false);
  };
  const handleCloseCancel = () => {
    setOpen(false);
  };
  return (
    <div>
      <Button class="btn btn-danger" onClick={handleClickOpen}>
        Delete
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"?האם אתה בטוח רוצה למחוק"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">

          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCancel} color="primary">
            ביטול
          </Button>
          <Button onClick={handleCloseOk} color="primary" autoFocus>
            אישור
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
