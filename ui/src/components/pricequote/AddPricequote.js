import React, { useState, useRef,useEffect } from "react";
import axios from 'axios'
import { useHistory } from "react-router-dom";
import FileUploader from "../files/FileUploader";
import CanvasDraw from "react-canvas-draw";
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box';
import Input from '@material-ui/core/Input';


function Addpricequote({ setAlert }) {

  const [saleitem, setSaleitem] = useState();
  const [file, setFile] = useState();
  const [description, setDescription] = useState();
  const [date, setDate] = useState();
  const [fullname, setFullname] = useState();


  const childRef = useRef();
  const descRef = useRef();
  const history = useHistory();
  const options = ['יוטה', 'רשת צל', 'סגירת מרפסת'];

  useEffect(() => {
      axios.get("http://localhost:3001/customer/email/" + localStorage.getItem('mail'))
       .then(res=>{
          setFullname(res.data.firstname + " " + res.data.lastname)
       });

  });

  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 720,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));
  const classes = useStyles();
  const send = event => {
    window.scrollTo(0, 0)
    console.log("send");
    var dt = new Date()
    var fulldate = dt.getDate() + "" + (dt.getMonth() + 1) + "" + (dt.getFullYear() - 2000);
    var fulltime = dt.getHours() + "" + dt.getMinutes() + "" + dt.getSeconds();
    var datenow = `${dt.getFullYear().toString().padStart(4, '0')}-${(dt.getMonth() + 1).toString().padStart(2, '0')}-${dt.getDate().toString().padStart(2, '0')}T${dt.getHours().toString().padStart(2, '0')}:${dt.getMinutes().toString().padStart(2, '0')}`
    var fulldatetime = "1" + "" + fulldate + "" + fulltime
    const data = new FormData();
    data.append("file", file);
    data.append("description", description);
    data.append("saleitem", saleitem);
    data.append("date", date);
    data.append("canvas", childRef.current.getSaveData());
    data.append("customer", localStorage.getItem('mail'))
    data.append("id", fulldatetime)
    data.append("datenow", datenow)
    data.append("fullname", fullname)
    axios.post("http://localhost:3001/pricequote", data)
      .then(function (res) {
        fulldatetime = fulldatetime + " הצעת המחיר שלך הועלתה בהצלחה! מספר ההצעה הוא "
        setAlert({ severity: "success", message: fulldatetime, status: 1 })
        setTimeout(() => {
          setAlert({ status: 0 })
          history.push("/pricequote");
        }, 2000);
      })
      .catch(err => console.log(err));

  };
  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4"> הזן את הנתונים עבור הצעת המחיר</h2>
        <div className="App">
          <header className="App-header">
            <form action="#">
              <div>
                <TextField
                  id="datetime-local"
                  onChange={(event) => {
                    setDate(event.target.value);
                  }}
                  label="מועד אספקה רצוי"
                  type="datetime-local"
                  defaultValue="2020-07-24T10:30"
                  className={classes.textField}
                  fullWidth="true"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <br />
                <br />
                <Autocomplete
                  className="mb-4"
                  inputValue={saleitem}
                  onInputChange={(event, newInputValue) => {
                    setSaleitem(newInputValue);
                  }}
                  id="controllable-states-demo"
                  options={options}
                  style={{ fullWidth: "true" }}
                  renderInput={(params) => <TextField {...params} label="פריט מכירה" variant="outlined" />}
                />
              </div>
              <TextField
                onChange={(event) => {
                  setDescription(event.target.value);
                }}
                className="mb-4"
                id="outlined-multiline-static"
                label="תיאור מילולי"
                multiline
                rows={10}
                defaultValue="אנא תאר את הפריט שברצונך להזמין , ככל שהתיאור יהיה מפורט יותר כך נוכל לעזור לך בצורה מיטבית ואיכותית"
                variant="outlined"
                fullWidth="true"
              />
              <p style={{ textAlign: "right" }} > ברשותך מערכת שתוכל לשרטט את הדרישה שלך</p>
              <CanvasDraw ref={childRef}
                className="mb-4"
                style={{
                  boxShadow:
                    "0 13px 27px -5px rgba(50, 50, 93, 0.25),    0 8px 16px -8px rgba(0, 0, 0, 0.3)"
                }}
                canvasWidth={740}
                canvasHeight={500}
                brushRadius={2}
              />
            </form>
            <div className="d-flex justify-content-between">
              <Button variant="contained" color="primary" component="span" onClick={() => childRef.current.undo()}>undo</Button>
              <Button variant="contained" color="secondary" component="span" onClick={() => childRef.current.clear()}>clear</Button>
              <Button variant="contained" color="primary" component="span" onClick={() => localStorage.test = childRef.current.getSaveData()}>save</Button>
              <Button variant="contained" color="primary" component="span" onClick={() => childRef.current.loadSaveData(localStorage.test)}>load</Button>
            </div >
            <p className="d-flex justify-content-between mr-4 mt-4" style={{ textAlign: "right" }}>
              <Input
                style={{ display: "none" }}
                id="contained-button-file"
                type="file"
                onChange={event => {
                  const file = event.target.files[0];
                  setFile(file);
                }}
              />
              <label htmlFor="contained-button-file">
                <Button variant="contained" color="primary" component="span">
                  Upload files
                  </Button>
              </label>
            במידה וברצונך לצרף קבצים - חשוב לשים לב שגודל הקובץ מוגבל ל-5 מגה
            </p>
            <form className={classes.container} noValidate>
            </form>
            <button className="btn btn-primary btn-block" onClick={send}>Add pricequote</button>
          </header>
        </div>
      </div>
    </div>
  );
}

export default Addpricequote;