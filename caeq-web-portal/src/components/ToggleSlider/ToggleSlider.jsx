import React, { useState } from "react";
import "./ToggleSlider.scss";

const ToggleSlider = () => {
  const [checked, setChecked] = useState(false);

  const handleToggle = () => {
    setChecked(!checked);
  };

  return (
    <div className="toggle-slider">
      <input
        type="checkbox"
        id="toggle"
        checked={checked}
        onChange={handleToggle}
      />
      <label htmlFor="toggle" className="slider" />
    </div>
  );
};

export default ToggleSlider;
