import React, { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
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

const Viewpricequote = () => {
  const [pricequote, setpricequote] = useState({
    _id: "",
    customer: "",
    description: "",
    date: "",
    datenow: "",
    picpath: "",
    price: "",
    status: "",
    saleitem: "",
    fullname: ""
  });
  // const [saleitem, setSaleitem] = useState();
  const [file, setFile] = useState();
  const [description, setDescription] = useState();
  const [date, setDate] = useState();
  const childRef = useRef();
  const descRef = useRef();
  const history = useHistory();
  const options = ['יוטה', 'רשת צל', 'סגירת מרפסת'];
  const { id } = useParams();
  useEffect(() => {
    loadpricequote();
  }, []);
  const loadpricequote = async () => {
    const res = await axios.get(`http://localhost:3001/pricequote/${id}`);
    console.log(res);
    if (res.data != null) {
      var x = res.data.date
      console.log(x)
      x = x.geTime
      console.log("x")
      console.log(x)
      console.log(res);
      res.data.picturepath = 'http://localhost:3001' + res.data.picturepath
      console.log("res.data")
      console.log(res.data)
      setpricequote(res.data);
      localStorage.test = res.data.canvas
      childRef.current.loadSaveData(localStorage.test)
    }
  };
  function convertFromStringToDate(responseDate) {
    let dateComponents = responseDate.split('T');
    let datePieces = dateComponents[0].split("-");
    let timePieces = dateComponents[1].split(":");
    return (new Date(datePieces[2], (datePieces[1] - 1), datePieces[0],
      timePieces[0], timePieces[1], timePieces[2]))
  }
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
  return (
    <div className="container py-4">
      <div className="container">
        <div className="w-75 mx-auto shadow p-5">
          <h2 className="text-center mb-4"> הצגת הצעת המחיר </h2>
          <h2 className="text-center mb-4">  {pricequote.id} </h2>

          <div className="App">
            <header className="App-header">
              <form action="#">
                <br/>
                <div>
                  <TextField
                    id="standard-read-only-input"
                    label="מספר הצעה"
                    value={pricequote._id}
                    // fullWidth="true"
                    style = {{width: 300,marginLeft:5,marginRight:40}}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <TextField
                    id="standard-read-only-input"
                    label="מחיר"
                    value={pricequote.price}
                    // fullWidth="true"
                    style = {{width: 300,marginLeft:45}}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <br />
                  <br />
                </div>
                <div>
                  <TextField
                    id="standard-read-only-input"
                    label="תאריך הזמנה"
                    value={pricequote.datenow}
                    // fullWidth="true"
                    style = {{width: 300,marginLeft:5,marginRight:40}}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <TextField
                    id="standard-read-only-input"
                    label="תאריך אספקה"
                    value={pricequote.date}
                    // fullWidth="true"
                    style = {{width: 300,marginLeft:45}}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <br />
                  <br />
                </div>
                <div>
                  <TextField
                    id="standard-read-only-input"
                    label="מזהה לקוח"
                    value={pricequote.customer}
                    // fullWidth="true"
                    style = {{width: 300,marginLeft:5,marginRight:40}}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <TextField
                    id="standard-read-only-input"
                    label="שם מלא"
                    value={pricequote.fullname}
                    // fullWidth="true"
                    style = {{width: 300,marginLeft:45}}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <br />
                  <br />
                </div>
                <div>
                  <TextField
                    id="standard-read-only-input"
                    label="פריט מכירה"
                    value={pricequote.saleitem}
                    // fullWidth="true"
                    style = {{width: 300,marginLeft:5,marginRight:40}}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <TextField
                    id="standard-read-only-input"
                    label="עתידי"
                    value={"להשלים"}
                    // fullWidth="true"
                    style = {{width: 300,marginLeft:45}}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <br />
                  <br />
                </div>
                <TextField
                  id="standard-read-only-input"
                  label="תיאור מילולי"
                  value={pricequote.description}
                  multiline
                  rows={2}
                  fullWidth="true"
                  style={{ textAlign: "right" }}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <br/>
                <p style={{ textAlign: "right" }} > שרטוט</p>
                <br/>
                <CanvasDraw ref={childRef}
                  className="mb-4"
                  style={{
                    boxShadow:
                      "0 13px 27px -5px rgba(120, 50, 93, 0.25),    0 8px 16px -8px rgba(0, 0, 0, 0.3)"
                  }}
                  canvasWidth={740}
                  canvasHeight={500}
                  brushRadius={2}
                  brushColor={"red"}
                  disabled={true}
                />
                  <br/>
                <p style={{ textAlign: "right" }} >קבצים מצורפים</p>
                <img src={pricequote.picturepath}></img>
                <br/>
              </form>
              <form className={classes.container} noValidate>
              </form>
            </header>
          </div>
        </div>
      </div>
  );
    </div>
  );
};

export default Viewpricequote;
