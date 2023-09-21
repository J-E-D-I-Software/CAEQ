import React, { useState } from "react";
import "./BaseButton";

const NavbarButton = ({ label, type, action, icon }) => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    action(e);
    setIsActive(!isActive); // Toggle the active state
  };

  const buttonClassName = `button button-${type} ${isActive ? "active" : ""}`;

  return (
    <button onClick={handleClick} className={buttonClassName}>
      <div className="button-content">
        <div className="icon">
          <img src={icon} alt={`${label} Icon`} /> {/* Utiliza el icono proporcionado como prop */}
        </div>
        <div className="label">{label}</div>
      </div>
    </button>
  );
};

export default NavbarButton;
