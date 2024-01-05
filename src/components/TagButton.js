// TagButton.js
import React from "react";

const TagButton = ({ tag, isActive, onClick }) => {
  return (
    <button className={isActive ? "active" : ""} onClick={() => onClick(tag)}>
      {tag}
    </button>
  );
};

export default TagButton;
