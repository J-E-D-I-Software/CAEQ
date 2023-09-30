import React, { useState } from 'react';
import './TextInput.scss';
import hiddenIcon from '../../icons/hiddenIcon.png';
import visibleIcon from '../../icons/visibleIcon.png';

/**
 * HiddenTextInput component for password input with a toggle to show/hide the password.
 * @component
 *
 * @param {Object} props - The component's properties.
 * @param {string} props.label - The label for the input field.
 * @param {function} props.getVal - A function to get the current input value.
 * @param {function} props.setVal - A function to set the input value.
 * @param {string} props.placeholder - The placeholder text for the input field.
 * @param {boolean} [props.require=false] - Whether the input is required (default is false).
 * @param {...any} props - Any other valid HTML input properties can be passed as well.
 * @returns {JSX.Element} JSX element representing the HiddenTextInput.
 *
 * @example
 * // Example usage of HiddenTextInput:
 * <HiddenTextInput
 *   label="Password"
 *   getVal={getPassword}
 *   setVal={setPassword}
 *   placeholder="Enter your password"
 *   require={true}
 *   id="password-input"
 *   autoFocus
 * />
 */
const HiddenTextInput = ({
    label,
    getVal,
    setVal,
    placeholder,
    require = false,
    ...props
}) => {
    const isRequired = require;
    const [isToggled, setIsToggled] = useState(false);
    const [iconIndex, setIconIndex] = useState(0);
    const [inputValue, setInputValue] = useState(getVal);

    const iconUrls = [hiddenIcon, visibleIcon];

    const iconChange = () => {
        setIsToggled(!isToggled);
        setIconIndex((iconIndex + 1) % iconUrls.length);
    };

    const inputChange = (e) => {
        setInputValue(e.target.value);
        setVal(e.target.value);
    };

    return (
        <label>
            <div className='label-input'>
                {label}
                {isRequired && <span className='obligatorio'>*obligatorio</span>}
            </div>
            <div className='input-eye'>
                <input
                    className='fused-box-input'
                    type={isToggled ? 'text' : 'password'}
                    placeholder={placeholder}
                    {...props}
                    value={inputValue}
                    required={isRequired}
                    onChange={inputChange}
                />
                <img
                    className='button-eye'
                    onClick={iconChange}
                    type='button'
                    src={iconUrls[iconIndex]}
                    alt='mostrar'
                />
            </div>
        </label>
    );
};

export default HiddenTextInput;
