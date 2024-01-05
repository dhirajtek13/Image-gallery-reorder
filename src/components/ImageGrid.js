// ImageGrid.js
import React from 'react';
import Image from './Image';

const ImageGrid = ({ images, moveImage }) => {
  return (
    <div className="image-grid">
      {images.map((image, index) => (
        <Image key={image.id} image={image} index={index} moveImage={moveImage} />
      ))}
    </div>
  );
};

export default ImageGrid;
