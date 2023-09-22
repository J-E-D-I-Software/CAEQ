import React, { useState } from "react";
import "./TextInput.scss";
import hiddenIcon from "../../icons/hiddenIcon.png";
import visibleIcon from "../../icons/visibleIcon.png";

const HiddenTextInput = ({ label, getVal, setVal, placeholder, require = false, ...props }) => {
  const isRequired = require;
  const [isToggled, setIsToggled] = useState(false);
  const [iconIndex, setIconIndex] = useState(0);

  const iconUrls = [hiddenIcon, visibleIcon];

  const iconChange = () => {
    setIsToggled(!isToggled);
    setIconIndex((iconIndex + 1) % iconUrls.length);
  }

  return (
    <label>
      <div className="label-input">{label}
        {isRequired && <span className='obligatorio'>*obligatorio</span>}
      </div>
      <input
        className="fused-box-input"
        type={isToggled ? "text" : "password"}
        placeholder={placeholder}
        {...props}
        value={getVal}
        required={isRequired}
      />
      <img
        className="button-eye"
        onClick={iconChange}
        type="button"
        src={iconUrls[iconIndex]}
        alt="mostrar"
      />
    </label>
  );
};

export default HiddenTextInput;
