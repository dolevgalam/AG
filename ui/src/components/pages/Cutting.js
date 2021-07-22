import React, { useState, useEffect, useRef } from "react";
import '../cutting/Cutting.css';
import randomColor from "randomcolor";
// import { DndContext } from '@dnd-kit/core';
// import { Draggable } from '../cutting/Draggable';
// import { Droppable } from '../cutting/Droppable';



const color1 = randomColor()
const color2 = randomColor()
const Cutting = () => {


  // const [hex, setHex] = useState('');

  // const randomizeHex = () =>{
  //   const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);

  //   setHex(randomColor);
  // }

  const canvas = useRef();
  let ctx = null;
  const boxes = [
    { x: 200, y: 220, w: 100, h: 50 },
    { x: 100, y: 120, w: 100, h: 50 }
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
      <h3> Drag & Drop </h3>
      <canvas
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseOut={handleMouseOut}
        ref={canvas}></canvas>
    </div>
  );
}

export default Cutting;

