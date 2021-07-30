import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from "axios";
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { useHistory } from "react-router-dom";


export default function AlertDialog(path) {
  const history = useHistory();

  const GreenCheckbox = withStyles({
    root: {
      color: green[400],
      '&$checked': {
        color: green[600],
      },
    },
    checked: {},
  })((props) => <Checkbox color="default" {...props} />);
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
    checkedF: true,
    checkedG: true,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseOk = async () => {
    console.log("path")
    console.log(path.path)
    const data =  {
      status: "בוצעה הזמנה"
    }
    // data.append("status", "בלה בלה");
    console.log(data)
    axios.patch(`http://localhost:3001/pricequote/${path.path}`, data)
      .then(function (res) {
        console.log("Done")
      })
      .catch(err => console.log(err));

    // window.location.reload();
    history.push("/orders");
    setOpen(false);
  };
  const handleCloseCancel = () => {
    setOpen(false);
  };
  return (
    <div>
      <Button class="btn btn-success" onClick={handleClickOpen}>
        order
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{
          <p style={{ textAlign: "right", fontWeight: "bold", textDecoration: "underline" }} > יצירת הזמנה </p>
        }</DialogTitle>
        <DialogContent>
          <DialogContentText style={{ textAlign: "right", textDecoration: "underline" }} id="alert-dialog-description">
            <p style={{ textAlign: "right", textDecoration: "underline" }} > בחירת עובדים לטיפול בהזמנה</p>
            <FormControlLabel
              control={<GreenCheckbox checked={state.checkedG1} onChange={handleChange} name="checkedG1" />}
              label="שלומי לוי"
            />
            <FormControlLabel
              control={<GreenCheckbox checked={state.checkedG2} onChange={handleChange} name="checkedG2" />}
              label="נתי כהן"
            />
            <FormControlLabel
              control={<GreenCheckbox checked={state.checkedG3} onChange={handleChange} name="checkedG3" />}
              label="משה יקר"
            />

            <FormControlLabel
              control={<GreenCheckbox checked={state.checkedG4} onChange={handleChange} name="checkedG4" />}
              label="אבי אליהו"
            />
            <FormControlLabel
              control={<GreenCheckbox checked={state.checkedG5} onChange={handleChange} name="checkedG5" />}
              label="חגית ישראלי"
            />
            <FormControlLabel
              control={<GreenCheckbox checked={state.checkedG6} onChange={handleChange} name="checkedG6" />}
              label="שושנה קטן"
            />
            <FormControlLabel
              control={<GreenCheckbox checked={state.checkedG7} onChange={handleChange} name="checkedG7" />}
              label="אירית שמיע"
            />


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
