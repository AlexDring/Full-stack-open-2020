import React from "react";

const Filter = ({ changeHandler }) => {
  return (
    <div>
      filter shown with <input onChange={changeHandler} />
    </div>
  );
};

export default Filter;
