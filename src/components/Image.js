// Image.js
import React from 'react';
import { useDrag, useDrop } from 'react-dnd';

const Image = ({ image, index, moveImage }) => {
    const [, ref] = useDrag({
        type: 'IMAGE',
        item: { index },
      });
    
      const [, drop] = useDrop({
        accept: 'IMAGE',
        hover: (draggedItem) => {
          if (draggedItem.index !== index) {
            moveImage(draggedItem.index, index);
            draggedItem.index = index;
          }
        },
      });
      
  return (
    <div ref={(node) => ref(drop(node))} className="image-container">
      <img src={image.src} alt={image.alt} />
      <div className="tags">
        {image.tags && image.tags.map((tag, index) => (
          <span key={index} className="tag">{tag}</span>
        ))}
      </div>
    </div>
  );
};

export default Image;
