import React, { useState, useEffect } from 'react';
import './App.css';
import imageData from './imagesData.json';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';


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


const App = () => {
  const [images, setImages] = useState([]);
  const [tags, setTags] = useState([]);
  const [activeTag, setActiveTag] = useState('all');
  

  useEffect(() => {
    const storedImages = JSON.parse(localStorage.getItem('images')) || imageData;
    const allTags = storedImages.reduce((all, image) => {
      if (image.tags) {
        return [...all, ...image.tags];
      }
      return all;
    }, []);

    setImages(storedImages);
    setTags([...new Set(allTags)]); // Deduplicate tags
  }, []);

  const filterImages = (selectedTag) => {
    setActiveTag(selectedTag);
    if (selectedTag === 'all') {
      setImages(imageData);
    } else {
      const filteredImages = imageData.filter((image) =>
        image.tags && image.tags.includes(selectedTag)
      );
      setImages(filteredImages);
    }
  };

  const moveImage = (fromIndex, toIndex) => {
    const reorderedImages = [...images];
    const [movedImage] = reorderedImages.splice(fromIndex, 1);
    reorderedImages.splice(toIndex, 0, movedImage);

    setImages(reorderedImages);
    localStorage.setItem('images', JSON.stringify(reorderedImages));
  };

  const resetOrder = () => {
    setImages(imageData);
    localStorage.setItem('images', JSON.stringify(imageData));
  };


  return (
    <DndProvider backend={HTML5Backend}>
    <div className="App">
      <header>
        <h1>Gallery</h1>
      </header>
      <div className="breadcrumb">
        <p>Pages -  Gallery</p>
      </div>
      <h1>Photo Gallery</h1>
      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. </p>
      <div className="tag-buttons">
        <button className="reset" onClick={resetOrder}>Reset</button>
        <button className={activeTag === 'all' ? 'active' : ''} onClick={() => filterImages('all')}>All</button>
        {tags.map((tag) => (
          <button className={activeTag === tag ? 'active tagname' : 'tagname'}  key={tag} onClick={() => filterImages(tag)}>
            {tag}
          </button>
        ))}

      </div>
      <div className="image-grid">
        {images.map((image, index) => (
          <Image key={image.id} image={image} index={index} moveImage={moveImage} />
        ))}
      </div>
    </div>
    </DndProvider>
  );
};

export default App;
