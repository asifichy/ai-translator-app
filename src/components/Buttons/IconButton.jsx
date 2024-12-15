import React from "react";

const IconButton = ({ icon, onClick }) => (
  <button
    className="cursor-pointer flex items-center space-x-2"
    onClick={onClick}
    onKeyDown={(e) => {
      if (e.key === "Enter" || e.key === " ") {
        onClick();
      }
    }}
  >
    <Icon size={22} />
  </button>
);

export default IconButton;
