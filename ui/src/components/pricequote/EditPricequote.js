import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router-dom";
import CanvasDraw from "react-canvas-draw";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button'
import Slide from '@material-ui/core/Slide';
import { Checkmark } from 'react-checkmark'
import Modal from 'react-bootstrap/Modal'

const Editpricequote = ({ setAlert }) => {
  const [pricequote, setPricequote] = useState({
    _id: "",
    customer: "",
    description: "",
    date: "",
    datenow: "",
    picpath: "",
    price: "",
    saleitem: "",
    fullname: "",
    hours: "",
    item1: "",
    item1_l: "",
    item1_w: "",
    item2: "",
    item2_l: "",
    item2_w: "",
  });
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setPriceprice('₪2150')
  }
  const handleShow = () => setShow(true);

  const { _id, customer, description, picturepath, date, price, hours, item1, item1_l, item1_w, item2, item2_l, item2_w } = pricequote;
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  const send = event => {
    window.scrollTo(0, 0)
    console.log("send");
    const data = new FormData();
    axios.patch(`http://localhost:3001/pricequote/${id}`, pricequote)
      .then(function (res) {
        var info = "בוצע עדכון מוצלח להצעת המחיר "
        setAlert({ severity: "success", message: info, status: 1 })
        setTimeout(() => {
          setAlert({ status: 0 })
          history.push("/pricequote");
        }, 2000);
      })
      .catch(err => console.log(err));

  };

  const onInputChange = e => {
    setPricequote({ ...pricequote, [e.target.name]: e.target.value });
  };

  const [priceprice, setPriceprice] = useState();
  const [status, setStatus] = useState();
  // const [saleitem, setSaleitem] = useState();
  const [file, setFile] = useState();
  // const [description, setDescription] = useState();
  // const [date, setDate] = useState();
  const childRef = useRef();
  const childRef1 = useRef();
  const history = useHistory();
  const options = ['יוטה', 'רשת צל', 'סגירת מרפסת'];
  const { id } = useParams();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const onchangepriceprice = () => {
    console.log("sfsdfsdfsdf")
    setPriceprice('₪ 2150')
    console.log(priceprice)
    setOpen(false);
  };
  // const handleClose = () => {
  //   setOpen(false);
  // };
  useEffect(() => {
    loadpricequote();
  }, []);
  const loadpricequote = async () => {
    const res = await axios.get(`http://localhost:3001/pricequote/${id}`);
    console.log(res);
    if (res.data != null) {
      var x = res.data.date
      res.data.picturepath = 'http://localhost:3001' + res.data.picturepath
      console.log("res.data")
      console.log(res.data)
      setPricequote(res.data);
      localStorage.test = res.data.canvas
      childRef.current.loadSaveData(localStorage.test)
    }
  };
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
          <h2 className="text-center mb-4"> עריכת הצעת המחיר </h2>
          <h2 className="text-center mb-4">  {pricequote.id} </h2>
          <div className="App">
            <header className="App-header">
              <form action="#">
                <br />
                <div>
                  <TextField
                    id="standard-read-only-input"
                    label="מספר הצעה"
                    value={pricequote._id}
                    style={{ width: 300, marginLeft: 5, marginRight: 40 }}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <TextField
                    onChange={e => onInputChange(e)}
                    value={price}
                    id="standard-read-only-input"
                    name="price"
                    label="מחיר"
                    inputRef={childRef1}
                    style={{ width: 300, marginLeft: 45 }}
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
                    style={{ width: 300, marginLeft: 5, marginRight: 40 }}
                    InputProps={{
                      readOnly: false,
                    }}
                  />
                  <TextField
                    id="datetime-local"
                    type="datetime-local"
                    className={classes.textField}
                    label="תאריך אספקה"
                    value={pricequote.date}
                    // fullWidth="true"
                    style={{ width: 300, marginLeft: 45 }}
                    InputProps={{
                      readOnly: false,
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
                    style={{ width: 300, marginLeft: 5, marginRight: 40 }}
                    InputProps={{
                      readOnly: false,
                    }}
                  />
                  <TextField
                    id="standard-read-only-input"
                    label="שם מלא"
                    value={pricequote.fullname}
                    // fullWidth="true"
                    style={{ width: 300, marginLeft: 45 }}
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
                    style={{ width: 300, marginLeft: 5, marginRight: 40 }}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <TextField
                    id="standard-read-only-input"
                    label="עתידי"
                    value={"עתידי"}
                    // fullWidth="true"
                    style={{ width: 300, marginLeft: 45 }}
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
                <br />
                <p style={{ textAlign: "right", fontWeight: "bold", textDecoration: "underline" }} > בחירת חומרי גלם ושעות עבודה</p>
                <TextField
                  inputProps={{ style: { textAlign: 'center' } }}
                  onChange={e => onInputChange(e)}
                  value={pricequote.hours}
                  // id="standard-read-only-input"
                  name="hours"
                  label="שעות עבודה"
                  style={{ width: 100, marginRight: 30 }}
                />
                <div>
                </div>
                <div>
                  <div className="d-flex">
                    <Autocomplete
                      inputProps={{ style: { textAlign: 'center' } }}
                      className="mb-4"
                      // inputValue={pricequote.item1}
                      onInputChange={e => onInputChange(e)}
                      id="controllable-states-demo"
                      options={options}
                      style={{ width: 200 }}
                      renderInput={(params) => <TextField
                        {...params} label="פריט מכירה" />}
                    />
                    <TextField
                      inputProps={{ style: { textAlign: 'center' } }}

                      onChange={e => onInputChange(e)}
                      value={pricequote.item1_l}
                      // id="standard-read-only-input"
                      name="item1_l"
                      label="אורך-1"
                      style={{ width: 100, marginLeft: 30, marginRight: 30 }}
                    />
                    <TextField
                      inputProps={{ style: { textAlign: 'center' } }}
                      onChange={e => onInputChange(e)}
                      value={pricequote.item1_w}
                      // id="standard-read-only-input"
                      name="item1_w"
                      label="רוחב-1"
                      style={{ width: 100, marginLeft: 30, marginRight: 30 }}
                    />
                    <br />
                    <br />
                  </div>
                </div>
                <div>
                  <div className="d-flex">
                    <Autocomplete
                      className="mb-4"
                      // inputValue={pricequote.item2}
                      onInputChange={e => onInputChange(e)}
                      id="controllable-states-demo"
                      options={options}
                      style={{ width: 200 }}
                      renderInput={(params) => <TextField {...params} label="פריט מכירה" />}
                    />
                    <TextField
                      onChange={e => onInputChange(e)}
                      inputProps={{ style: { textAlign: 'center' } }}
                      value={pricequote.item2_l}
                      // id="standard-read-only-input"
                      name="item2_l"
                      label="אורך-2"
                      inputStyle={{ textAlign: 'center' }}
                      hintStyle={{ width: '600px', textAlign: 'center' }}
                      style={{ width: 100, marginLeft: 30, marginRight: 30, textAlign: "center" }}
                    />
                    <TextField
                      inputProps={{ style: { textAlign: 'center' } }}
                      onChange={e => onInputChange(e)}
                      value={pricequote.item2_w}
                      // id="standard-read-only-input"
                      name="item2_w"
                      label="רוחב-2"
                      style={{ width: 100, marginLeft: 30, marginRight: 30 }}
                    />
                    <br />
                    <br />
                  </div>
                </div>
                <hr></hr>
                <div>
                  <div className="d-flex">
                    <TextField
                      inputProps={{ style: { textAlign: 'center' } }}

                      onChange={onchangepriceprice}
                      value={priceprice}
                      // id="standard-read-only-input"
                      name="price"
                      // label="מחיר"
                      style={{ width: 100, marginRight: 80 }}
                    />
                    <div>
                      <Button variant="contained" color="primary" onClick={handleShow}>
                        חישוב מחיר מומלץ
                      </Button>
                      <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                          <Modal.Title><p style={{ textAlign: "right", fontWeight: "bold", position: "absolute", right: "50px" }} > המחיר הינו 2150 ש"ח כולל מע"מ</p></Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{ textAlign: "right" }}>
                          <div className="d-flex">   <p style={{ direction: "rtl", fontWeight: "bold", textDecoration: "underline", position: "absolute", right: "8px" }} > המחיר חושב תוך התייחסות למגוון פרמטרים : </p>  </div>
                          <br></br>
                          <div className="d-flex" style={{ position: "absolute", right: "8px" }} > <Checkmark size='20px' />    <p style={{ textAlign: "right", fontWeight: "bold" }} > זמינות מלאי</p>   </div>
                          <br />
                          <div className="d-flex" style={{ position: "absolute", right: "8px" }} > <Checkmark size='20px' />    <p style={{ textAlign: "right", fontWeight: "bold" }} > תאריך אספקה</p>   </div>
                          <br />
                          <div className="d-flex" style={{ position: "absolute", right: "8px" }} > <Checkmark size='20px' />    <p style={{ textAlign: "right", fontWeight: "bold" }} > שעות עבודה</p>   </div>
                          <br />
                          <div className="d-flex" style={{ position: "absolute", right: "8px" }} > <Checkmark size='20px' />    <p style={{ textAlign: "right", fontWeight: "bold" }} > מחיר חומרי גלם</p>   </div>
                          <br />
                          <br />
                          <div className="d-flex">   <p style={{ textAlign: "right", fontWeight: "bold", textDecoration: "underline", position: "absolute", right: "8px" }} > אחוזי הרווח הינם :  </p>  </div>
                          <br></br>
                          <div className="d-flex" style={{ position: "absolute", right: "8px" }} > <Checkmark size='20px' />    <p style={{ textAlign: "right", fontWeight: "bold" }} > 30% </p>   </div>
                          <br />
                        </Modal.Body>
                        <Modal.Footer>
                          <Button variant="secondary" onClick={handleClose}>
                            ביטול
          </Button>
                          <Button variant="primary" onClick={handleClose}>
                            אישור
          </Button>
                        </Modal.Footer>
                      </Modal>
                      
                    </div>
                    <br />
                    <br />
                  </div>
                </div>
                <hr></hr>
                <p style={{ textAlign: "right", fontWeight: "bold", textDecoration: "underline" }} > שרטוט </p>
                <br />
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
                  disabled={false}
                />
                <br />
                <div className="d-flex justify-content-between">
                  <Button variant="contained" color="primary" component="span" onClick={() => childRef.current.undo()}>undo</Button>
                  <Button variant="contained" color="secondary" component="span" onClick={() => childRef.current.clear()}>clear</Button>
                  <Button variant="contained" color="primary" component="span" onClick={() => localStorage.test = childRef.current.getSaveData()}>save</Button>
                  <Button variant="contained" color="primary" component="span" onClick={() => childRef.current.loadSaveData(localStorage.test)}>load</Button>
                </div >
                <br />
                <p style={{ textAlign: "right", fontWeight: "bold", textDecoration: "underline" }} > קבצים מצורפים</p>
                <img src={pricequote.picturepath}></img>
                <br />
              </form>
              <form className={classes.container} noValidate>
              </form>
              <br></br>
              <button className="btn btn-primary btn-block" onClick={send}>עדכן הצעת מחיר</button>
            </header>
          </div>
        </div>
      </div>
  );
    </div>
  );
};

export default Editpricequote;
