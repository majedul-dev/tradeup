import React from "react";
import "./style.css";

const Button = ({ children, onClick, className, type, disabled }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
