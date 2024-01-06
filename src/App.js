import React, { useState, useEffect } from "react";
import "./App.css";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import imageData from "./imagesData.json";
import Header from "./components/Header";
import Breadcrumb from "./components/Breadcrumb";
import TagButton from "./components/TagButton";
import ImageGrid from "./components/ImageGrid";
import ResetButton from "./components/ResetButton";

const App = () => {
  const [images, setImages] = useState([]);
  const [tags, setTags] = useState([]);
  const [activeTag, setActiveTag] = useState("all");

  useEffect(() => {
    const storedImages =
      JSON.parse(localStorage.getItem("images")) || imageData;
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
    if (selectedTag === "all") {
      setImages(imageData);
    } else {
      const filteredImages = images.filter(
        (image) => image.tags && image.tags.includes(selectedTag)
      );
      setImages(filteredImages);
    }
  };

  const moveImage = (fromIndex, toIndex) => {
    const reorderedImages = [...images];
    const [movedImage] = reorderedImages.splice(fromIndex, 1);
    reorderedImages.splice(toIndex, 0, movedImage);

    setImages(reorderedImages);
    localStorage.setItem("images", JSON.stringify(reorderedImages));
  };

  const resetOrder = () => {
    setImages(imageData);
    localStorage.setItem("images", JSON.stringify(imageData));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <Header />
        <Breadcrumb />
        <h1>Photo Gallery</h1>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. </p>

        <div className="tag-buttons">
          <ResetButton onClick={resetOrder} />
          <TagButton
            tag="all"
            isActive={activeTag === "all" && "active"}
            onClick={() => filterImages("all")}
          />
          {tags.map((tag, i) => (
            <TagButton
              tag={tag}
              key={i}
              isActive={activeTag === tag && "active"}
              onClick={() => filterImages(tag)}
            />
          ))}
        </div>

        <ImageGrid images={images} moveImage={moveImage} />
      </div>
    </DndProvider>
  );
};

export default App;
