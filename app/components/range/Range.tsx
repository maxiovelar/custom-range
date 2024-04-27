import React from "react";

export const Range = () => {
  return (
    <div>
      <label htmlFor="range">Range:</label>
      <input type="range" id="range" name="range" min="0" max="100" />
    </div>
  );
};
