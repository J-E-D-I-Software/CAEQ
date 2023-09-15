import React, { useState } from "react";
import "./BaseButton";
import HomeIcon from "../icons/home.png"; // Asegúrate de que la ruta sea correcta

const NavbarButton = ({ label, type, action }) => {
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
          <img src={HomeIcon} alt="Home Icon" />
          {/* Utiliza el archivo como fuente */}
        </div>
        <div className="label">{label}</div>
      </div>
    </button>
  );
};

export default NavbarButton;
