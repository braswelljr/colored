import React from "react";

const Topper = ({ topperText }) => {
  return (
    <div className="px-3 py-2 italic text-white bg-green-500 bg-transparent-50">
      <div className="text-xs font-semibold">
        <p className="text-center">{topperText}</p>
      </div>
    </div>
  );
};

export default Topper;
