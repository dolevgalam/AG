import React, { useState, useEffect, } from "react";
import { DndContext } from '@dnd-kit/core';
import { Draggable } from '../cutting/Draggable';
import { Droppable } from '../cutting/Droppable';


const Cutting = () => {

  const containers = ['A', 'B','C','D'];
  const [parent, setParent] = useState(null);
  const draggableMarkup = (
    <Draggable id="draggable">Drag me</Draggable>
  );

  return (
    <DndContext onDragEnd={handleDragEnd}>
      {parent === null ? draggableMarkup : null}

      {containers.map((id) => (
        // We updated the Droppable component so it would accept an `id`
        // prop and pass it to `useDroppable`
        <Droppable key={id} id={id}>
          {parent === id ? draggableMarkup : 'Drop here'}
        </Droppable>
      ))}
    </DndContext>
  );

  function handleDragEnd(event) {
    const { over } = event;

    // If the item is dropped over a container, set it as the parent
    // otherwise reset the parent to `null`
    setParent(over ? over.id : null);
  }
};
//   return (
//     <div>
//       <h1>Drag and Drop + Algorithm Page</h1>

//       <DndContext>
//         <Draggable />
//         <Droppable />
//       </DndContext>
//     </div>
//   )
// };

export default Cutting;

