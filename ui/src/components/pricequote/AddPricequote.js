import React, { useState, useRef } from "react";
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


function Addpricequote() {

  const [saleitem, setSaleitem] = useState();
  const [file, setFile] = useState();
  const [description, setDescription] = useState();
  const childRef = useRef();
  const [checked, setChecked] = React.useState(false);
  const history = useHistory();

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
  const handleChange = (event) => {
    console.log(event.target.checked)
    setChecked(event.target.checked);
  };
  const send = event => {
    console.log("send");
    const data = new FormData();
    // data.append("name", name);
    data.append("file", file);
    data.append("description", description);
    // console.log(name);
    console.log(file);
    console.log(description);

    axios.post("http://localhost:3001/pricequote", data)
      .then(res => alert("success"))
    history.push("/pricequote");

    // .catch(err => console.log(err));
  };

  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Add A pricequote</h2>
        <div className="App">
          <header className="App-header">
            <form action="#">
              <FormControl className={classes.formControl}>
                <InputLabel shrink htmlFor="age-native-label-placeholder">
                  אנא בחר פריט מכירה
        </InputLabel>
                <NativeSelect
                  value={saleitem}
                  onChange={event => {
                    const { value } = event.target;
                    setSaleitem(value);
                  }}
                  inputProps={{
                    name: 'age',
                    id: 'age-native-label-placeholder',
                  }}
                >
                  <option value="">None</option>
                  <option value={10}>כיסא</option>
                  <option value={20}>ספה</option>
                  <option value={30}>רשת צל</option>
                </NativeSelect>
              </FormControl>
              {/* <div className="form-control form-control-lg form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  onChange={event => {
                    const { value } = event.target;
                    setName(value);
                  }}
                />
              </div> */}
              <div className="form-control form-control-lg">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  id="description"
                  onChange={event => {
                    const { value } = event.target;
                    setDescription(value);
                  }}
                />
              </div>
              <div className="form-control form-control-lg">
                <label htmlFor="file">File</label>
                <input
                  type="file"
                  id="file"
                  accept=".jpg"
                  onChange={event => {
                    const file = event.target.files[0];
                    setFile(file);
                  }}
                />
              </div>
              <CanvasDraw ref={childRef}
                style={{
                  boxShadow:
                    "0 13px 27px -5px rgba(50, 50, 93, 0.25),    0 8px 16px -8px rgba(0, 0, 0, 0.3)"
                }}
                canvasWidth={700}
                canvasHeight={800}
                brushRadius={2}
              />
              <Checkbox
                onChange={handleChange}
                color="primary"
                inputProps={{ 'aria-label': 'secondary checkbox' }} />
            </form>
            <button className="btn btn-primary btn-block" onClick={() => childRef.current.undo()}>undo</button>
            <button className="btn btn-primary btn-block" onClick={() => childRef.current.clear()}>clear</button>
            <button className="btn btn-primary btn-block" onClick={() => localStorage.test = childRef.current.getSaveData()}>save</button>
            <button className="btn btn-primary btn-block" onClick={() => childRef.current.loadSaveData(localStorage.test)}>load</button>
            <button className="btn btn-primary btn-block" onClick={send}>Add pricequote</button>
          </header>
        </div>
      </div>
    </div>
  );
}

export default Addpricequote;