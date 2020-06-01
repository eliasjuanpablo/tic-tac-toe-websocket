import React from 'react';

const BoardCell = ({ value, handleClick }) => {
  return (
    <div className="cell" onClick={handleClick}>
      {value}
    </div>
  );
};

export default BoardCell;
