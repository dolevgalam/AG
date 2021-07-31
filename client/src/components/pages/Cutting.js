import React, { useState, useEffect, useRef } from "react";
import '../cutting/Cutting.css';
import randomColor from "randomcolor";
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import Pdf from "react-to-pdf";
import ReactDOM from "react-dom";
import '../../index.css'
import Rotate90DegreesCcwTwoToneIcon from '@material-ui/icons/Rotate90DegreesCcwTwoTone';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import ViewQuiltIcon from '@material-ui/icons/ViewQuilt';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';

// import { DndContext } from '@dnd-kit/core';
// import { Draggable } from '../cutting/Draggable';
// import { Droppable } from '../cutting/Droppable';

const ref = React.createRef();
const options = ['רשת צל כחולה', 'שמשונית ירוקה', 'יוטה שחורה','שמשונית לבנה',];
const color1 = randomColor()
const color2 = randomColor()
const optionspdf = {
  orientation: 'landscape',
  unit: 'in',
  format: [15, 10]
};

const Cutting = () => {
  var i = 0
  const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }));
  const [saleitem, setSaleitem] = useState();
  const [rotate, setRotate] = useState();


  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  const canvas = useRef();
  let ctx = null;

  var boxes = [
    { x: 33, y: 14, w: 50, h: 50 },
    { x: 9, y: 143, w: 100, h: 200 },
    { x: 221, y: 14, w: 60, h: 70 },
    { x: 23, y: 612, w: 200, h: 85 },
    { x: 383, y: 21, w: 80, h: 80 },
    { x: 230, y: 200, w: 100, h: 120 },
    { x: 349, y: 454, w: 100, h: 70 }
  ]

    // var boxes = [
  //   { x: 50, y: 100, w: 50, h: 50 },
  //   { x: 150, y: 200, w: 100, h: 200 },
  //   { x: 250, y: 270, w: 60, h: 70 },
  //   { x: 350, y: 320, w: 200, h: 85 },
  //   { x: 450, y: 400, w: 80, h: 80 },
  //   { x: 550, y: 400, w: 100, h: 120 },
  //   { x: 650, y: 400, w: 100, h: 70 }
  // ]

  const boxes1 = [
    { x: 896, y: 320, w: 50, h: 50 },
    { x: 608, y: 598, w: 200, h: 100 },
    { x: 773, y: 281, w: 60, h: 70 },
    { x: 608, y: 424, w: 200, h: 85 },
    { x: 609, y: 260, w: 80, h: 80 },
    { x: 1012, y: 558, w: 100, h: 120 },
    { x: 1012, y: 415, w: 100, h: 70 }
  ]
  let isDown = false;
  let dragTarget = null;
  let startX = null;
  let startY = null;

  // initialize the canvas context
  useEffect(() => {
    // dynamically assign the width and height to canvas
    const canvasEle = canvas.current;
    canvasEle.width = canvasEle.clientWidth;
    canvasEle.height = canvasEle.clientHeight;


    // get context of the canvas
    ctx = canvasEle.getContext("2d");
  }, []);



  useEffect(() => {

    // draw();

  }, []);

  // draw a line
  const drawLine = (info, style = {}) => {
    const { x1, y1, x2, y2 } = info;
    const { color = 'gray', width = 1 } = style;

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = color;
    ctx.lineWidth = 10;
    ctx.stroke();
  }

  const onInputChange = e => {
    setRotate(e.target.value)
  };
  // draw rectangle
  const draw = () => {
    
    ctx.clearRect(0, 0, canvas.current.clientWidth, canvas.current.clientHeight);
    drawLine({ x1: 600, y1: 800, x2: 600, y2: 0 });
    boxes.map(info => drawRect(info));
  }

  const draw2 = () => {
    ctx.clearRect(0, 0, canvas.current.clientWidth, canvas.current.clientHeight);
    // drawLine({ x1: canvas.current.clientHeight, y1: canvas.current.clientWidth / 2, x2: canvas.current.clientHeight, y2: 0 });
    boxes1.map(info => drawRect(info));

  }

  // draw rectangle with size
  const colors = ["green", "red", "yellow", "brown", "purple", "orange", "blue"]
  const drawRect = (info, style = {}) => {
    const { x, y, w, h } = info;
    ctx.beginPath();
    ctx.fillStyle = colors[i]
    ctx.fillRect(x, y, w * 2, h * 2);
    ctx.lineWidth = 4;
    ctx.strokeStyle = "black"
    ctx.strokeRect(x, y, w * 2, h * 2)
    ctx.strokeStyle = "black"
    ctx.font = "bold 25px Georgia";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "black";
    ctx.fillText(i + 1, x + 15, y + 15);
    ctx.fillText(w + "X" + h, x + (w), y + (h));
    ctx.stroke();
    i += 1
    if (i == colors.length) i = 0
  }

  // identify the click event in the rectangle
  const hitBox = (x, y) => {
    let isTarget = null;
    console.log(boxes)
    for (let i = 0; i < boxes.length; i++) {
      const box = boxes[i];
      if (x >= box.x && x <= box.x + box.w && y >= box.y && y <= box.y + box.h) {
        dragTarget = box;
        isTarget = true;
        break;
      }
    }
    return isTarget;
  }
  const dorotate = () => {
    var x = document.getElementById("test")
    console.log(boxes[x.value - 1])
    var temp = boxes[x.value - 1].w
    boxes[x.value - 1].w = boxes[x.value - 1].h
    boxes[x.value - 1].h = temp
    console.log(boxes[x.value - 1])
    draw()
  }
  const handleMouseDown = e => {
    startX = parseInt(e.nativeEvent.offsetX - canvas.current.clientLeft);
    startY = parseInt(e.nativeEvent.offsetY - canvas.current.clientTop);
    isDown = hitBox(startX, startY);
  }
  const handleMouseMove = e => {
    if (!isDown) return;
    const mouseX = parseInt(e.nativeEvent.offsetX - canvas.current.clientLeft);
    const mouseY = parseInt(e.nativeEvent.offsetY - canvas.current.clientTop);
    const dx = mouseX - startX;
    const dy = mouseY - startY;
    startX = mouseX;
    startY = mouseY;
    dragTarget.x += dx;
    dragTarget.y += dy;
    draw();
  }
  function handleChange(event) {
    this.setState({ value: event.target.value });
  }
  function algo() {
    boxes = boxes1
    setOpen(true)
    setTimeout(() => {
      draw()
      setOpen(false)
    }, 3000);
  }
  function dopercent(){
    var x = document.getElementById("percent")
    x.style.visibility = "visible"

  }
  const handleMouseUp = e => {
    dragTarget = null;
    isDown = false;
  }
  const handleMouseOut = e => {
    handleMouseUp(e);
  }


  return (
    <div class="container-fluid">
            <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <div class="row">
        <div class="col-md-4">
          {/* <input
            type="text"
            id="test"
            className="form-control form-control-lg"
            placeholder="Enter Your date"
            name="date"
          />
          <br></br> */}
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <ol style={{ fontFamily: "calibri", textAlign: "center", fontWeight: "bold", textDecoration: "underline", fontSize: "40px", direction: "rtl" }}> חיתוך יעיל : </ol>
          {/* <li style={{ fontFamily: "calibri", textAlign: "right", fontWeight: "bold", fontSize: "20px", direction: "rtl" }}>נא לבחור סוג בד לחיתוך.</li>
          <li style={{ fontFamily: "calibri", textAlign: "right", fontWeight: "bold", fontSize: "20px", direction: "rtl" }}>ניתן לסדר באופן ידני או לבחור בכפתור אלגוריתם לסידור אוטומטי.</li>
          <li style={{ fontFamily: "calibri", textAlign: "right", fontWeight: "bold", fontSize: "20px", direction: "rtl" }}>בכל עת ניתן לבחור מספר בד ולסובב אותו לצד הרצוי.</li>
          <li style={{ fontFamily: "calibri", textAlign: "right", fontWeight: "bold", fontSize: "20px", direction: "rtl" }}>לאחר הפעלת האלגוריתם ניתן לתקן באופן ידני ע"י גרירה.</li>
          <li style={{ fontFamily: "calibri", textAlign: "right", fontWeight: "bold", fontSize: "20px", direction: "rtl" }}> על מנת להציג אחוז ניצול - לחץ על כפתור ניצול בד.</li>
          <li style={{ fontFamily: "calibri", textAlign: "right", fontWeight: "bold", fontSize: "20px", direction: "rtl" }}>בסיום העבודה ניתן לייצא לקובץ pdf.</li> */}
          <hr style={{ borderTop: '1px solid gray' }}></hr>
          <div style={{ display: "flex" }}>
            <Autocomplete
              size="small"
              className="ml-3"
              options={options}
              style={{ width: "180px", textAlign: "center" }}
              renderInput={(params) => <TextField  {...params} style={{ textAlign: "center" }} label="בחירת סוג בד" variant="outlined" />}
            />
            <Button className="ml-3" style={{ width: "60px", height: "40px", marginLeft: "40px" }} variant="contained" color="primary" onClick={() => draw()}>
              <PlayCircleFilledIcon></PlayCircleFilledIcon> הצג     </Button>
            <p style={{ marginLeft: "90px", fontFamily: "calibri", textAlign: "right", fontWeight: "bold", fontSize: "20px", direction: "rtl" }}>נא לבחור סוג בד לחיתוך</p>

          </div>
          <hr style={{ borderTop: '1px solid gray' }}></hr>
          <div style={{ display: "flex" }}>
            <TextField
              id="test"
              size="small"
              className="ml-3"
              style={{ width: "180px" }}
              label="מספר בד"
              // defaultValue="מספר ריבוע"
              variant="outlined"
            />
            <Button className="ml-3"
              style={{ fontWeight: "bold", marginLeft: "40px", marginRight: "5px", width: "60px", height: "40px" }} variant="contained" color="primary" onClick={() => dorotate()}>
              <Rotate90DegreesCcwTwoToneIcon fontSize="medium"></Rotate90DegreesCcwTwoToneIcon>
        סובב
      </Button>

            <p style={{ marginLeft: "174px", fontFamily: "calibri", textAlign: "right", fontWeight: "bold", fontSize: "20px", direction: "rtl" }}>ביצוע סיבוב</p>
          </div>
          <hr style={{ borderTop: '1px solid gray' }}></hr>
          <div style={{ display: "flex" }}>
            <Button className="ml-3" style={{ fontWeight: "bold", marginLeft: "5px", marginRight: "5px", width: "110px", height: "40px" }} variant="contained" color="default" onClick={() => algo()}>
              <ViewQuiltIcon fontSize="large"></ViewQuiltIcon> אלגוריתם
      </Button>
            <p style={{ marginLeft: "200px", fontFamily: "calibri", textAlign: "right", fontWeight: "bold", fontSize: "20px", direction: "rtl" }}>הפעלת אלגוריתם חיתוך יעיל</p>

          </div>
          <p style={{ marginRight: "80px", fontFamily: "calibri",textDecoration: "underline", textAlign: "right", fontWeight: "bold", fontSize: "15px", direction: "rtl" }}>לאחר מכן יש אפשרות לסדר ידנית</p>

          <hr style={{ borderTop: '1px solid gray' }}></hr>
          <div style={{ display: "flex" }}>
          <Button class="btn btn-success ml-3" style={{ fontWeight: "bold", marginLeft: "5px", marginRight: "5px", width: "110px", height: "40px" }} variant="contained" onClick={() => dopercent()}>
            <p> ניצול בד %</p>
          </Button>
            <p style={{ marginLeft: "300px", fontFamily: "calibri", textAlign: "right", fontWeight: "bold", fontSize: "20px", direction: "rtl" }}>חישוב ניצול בד</p>
          </div>


          <hr style={{ borderTop: '1px solid gray' }}></hr>
          <div style={{ display: "flex" }}>
 
       <Pdf targetRef={ref} filename="הנחיות גזירה.pdf" options={optionspdf}>
        {({ toPdf }) =>           <Button className="ml-3" style={{ marginLeft: "5px", marginRight: "5px", width: "110px", height: "40px" }} variant="contained" color="secondary" onClick={toPdf}>
            <PictureAsPdfIcon fontSize="large"></PictureAsPdfIcon>
          </Button> }
      </Pdf>






            <p style={{ marginLeft: "323px", fontFamily: "calibri", textAlign: "right", fontWeight: "bold", fontSize: "20px", direction: "rtl" }}>ייצא ל-
            PDF</p>
          </div>
          <hr style={{ borderTop: '1px solid gray' }}></hr>
          <p id="percent" style={{visibility:"hidden" ,color:"green" ,fontFamily: "calibri", textAlign: "center", fontWeight: "bold", fontSize: "20px", direction: "rtl" }}>אחוזי הניצול הינם : 89%</p>
          <hr style={{ borderTop: '1px solid gray' }}></hr>



          <br></br>
          <br></br>
          <br></br>
        </div>

        <div ref={ref} class="col-md-8">
        <div style={{ display: "flex" }}>
        <p style={{  textDecoration: "underline" ,marginRight:"500px",marginLeft:"200px",fontFamily: "calibri", textAlign: "right", fontWeight: "bold", fontSize: "20px" }}>מועמדים לגזירה</p>
        <p style={{  color:"red", textDecoration: "underline" ,fontFamily: "calibri", textAlign: "right", fontWeight: "bold", fontSize: "20px" }}> משטח גזירה - קנה מידה 3 מטר</p>
        </div>
          <canvas id="c" style={{
            display: "block",
            marginLeft: "auto",
            marginRight: "100px",
            width: "1232px",
            height: "820px",
            border: "10px solid gray",
            borderradius: "4px"
          }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseOut={handleMouseOut}
            ref={canvas}></canvas>
        </div>
      </div>
    </div>
  );
}

export default Cutting;

