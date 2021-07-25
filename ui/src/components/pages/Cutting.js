import React, { useState, useEffect, useRef } from "react";
import '../cutting/Cutting.css';
import randomColor from "randomcolor";
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

// import { DndContext } from '@dnd-kit/core';
// import { Draggable } from '../cutting/Draggable';
// import { Droppable } from '../cutting/Droppable';


const options = ['יוטה', 'רשת צל', 'סגירת מרפסת'];
const color1 = randomColor()
const color2 = randomColor()
const Cutting = () => {
  const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }));
const [saleitem, setSaleitem] = useState();
const classes = useStyles();
const [open, setOpen] = React.useState(false);
const handleClose = () => {
  setOpen(false);
};
const handleToggle = () => {
  setOpen(!open);
};


  // const [hex, setHex] = useState('');

  // const randomizeHex = () =>{
  //   const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);

  //   setHex(randomColor);
  // }

  const canvas = useRef();
  let ctx = null;
  const boxes = [
    { x: 50, y: 100, w: 80, h: 40 },
    { x: 100, y: 200, w: 40, h: 120 },
    { x: 200, y: 270, w: 60, h: 90 },
    { x: 350, y: 320, w: 30, h: 50 },
    { x: 380, y: 400, w: 100, h: 70 }
  ]

  const boxes1 = [
    { x: 550, y: 100, w: 80, h: 40 },
    { x: 600, y: 200, w: 40, h: 120 },
    { x: 700, y: 270, w: 60, h: 90 },
    { x: 1050, y: 320, w: 30, h: 50 },
    { x: 1080, y: 400, w: 100, h: 70 }
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
    
    draw();

  }, []);

  // draw a line
  const drawLine = (info, style = {}) => {
    const { x1, y1, x2, y2 } = info;
    const { color = 'black', width = 1 } = style;

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = color;
    ctx.lineWidth = 10;
    ctx.stroke();
  }
  // draw rectangle
  const draw = () => {
    ctx.clearRect(0, 0, canvas.current.clientWidth, canvas.current.clientHeight);
    drawLine({ x1: canvas.current.clientHeight, y1: canvas.current.clientWidth/2, x2: canvas.current.clientHeight, y2: 0 });
    boxes.map(info => drawRect(info));
    
  }

  const draw2 = () => {
    ctx.clearRect(0, 0, canvas.current.clientWidth, canvas.current.clientHeight);
    drawLine({ x1: canvas.current.clientHeight, y1: canvas.current.clientWidth/2, x2: canvas.current.clientHeight, y2: 0 });
    boxes1.map(info => drawRect(info));
    
  }

  // draw rectangle with size

  const drawRect = (info, style = {}) => {
    const { x, y, w, h } = info;
    const { borderColor = color1, borderWidth = 2 } = style;
    
    let size = w + "*" + h;
    ctx.beginPath();
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = borderWidth;
    ctx.rect(x, y, w, h);
    ctx.font="20px Georgia";
    ctx.textAlign="center"; 
    ctx.textBaseline = "middle";
    ctx.fillStyle = color2;
    ctx.fillText(size,x+(w/2),y+(h/2));
    ctx.stroke();

    //ctx.beginPath();
    //ctx.fillStyle = backgroundColor;
    //ctx.fillRect(x, y, w, h);
  }

  // identify the click event in the rectangle
  const hitBox = (x, y) => {
    let isTarget = null;
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
  const handleMouseUp = e => {
    dragTarget = null;
    isDown = false;
  }
  const handleMouseOut = e => {
    handleMouseUp(e);
  }

  return (
    <div className="App">
      <br/>
      <Autocomplete
                  className="mb-4"
                  inputValue={saleitem}
                  onInputChange={(event, newInputValue) => {
                    setSaleitem(newInputValue);
                  }}
                  id="controllable-states-demo"
                  options={options}
                  style={{ width: "250px" }}
                  renderInput={(params) => <TextField {...params} label="פריט מכירה" variant="outlined" />}
                />
      <br></br>
      <br></br>
      <Button variant="outlined" color="primary" onClick={handleToggle}>
  Show backdrop
</Button>
<Backdrop className={classes.backdrop} open={open} onClick={() => draw2()}>
  <CircularProgress color="inherit" />
</Backdrop>
      <div className="d-flex justify-content-between">
                  <Button variant="contained" color="primary" component="span" onClick={() => draw2()}>undo</Button>
                  <Button variant="contained" color="secondary" component="span" onClick={() =>setSaleitem() }>clear</Button>
                  <Button variant="contained" color="primary" component="span" onClick={() => setSaleitem()}>save</Button>
                  <Button variant="contained" color="primary" component="span" onClick={() => setSaleitem()}>load</Button>
                </div >
      <canvas style={{    
        display: "block",
        marginLeft: "auto",
        marginRight: "auto",
        width: "1000px",
        height: "500px",
        backgroundcolor: "black",
        border: "1px solid #ccc",
        borderradius: "4px"}}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseOut={handleMouseOut}
        ref={canvas}></canvas>
    </div>
  );
}

export default Cutting;

