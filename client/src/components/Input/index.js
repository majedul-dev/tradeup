import React from "react";
import "./style.css";

const Input = ({ type, value, placeholder, width, onChange, name }) => {
  return (
    <input
      className="inputfield"
      style={{ width: width }}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      name={name}
    />
  );
};

export default Input;
