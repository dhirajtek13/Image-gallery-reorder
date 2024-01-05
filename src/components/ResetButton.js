// ResetButton.js
import React from 'react';

const ResetButton = ({ onClick }) => {
  return (
    <button className="reset"  onClick={onClick}>Reset</button>
    // <button className="reset" onClick={resetOrder}>Reset</button>
  );
};

export default ResetButton;
