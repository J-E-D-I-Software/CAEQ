import React, { useState } from "react";
import "./BaseButton.scss";

const BaseButton = ({ label, type, action }) => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    action(e);
    setIsActive(!isActive); // Toggle the active state
  };

  const buttonClassName = `button button-${type} ${isActive ? "active" : ""}`;
  return (
    <button onClick={handleClick} className={buttonClassName}>
      {label}
    </button>
  );
};

export default BaseButton;
