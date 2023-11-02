import React from 'react';
import './NumberInput.scss';

/**
 * NumberInput component for a single-line number input.
 * @component
 *
 * @param {Object} props - The component's properties.
 * @param {string} props.label - The label for the input field.
 * @param {function} props.getVal - A function to get the current input value.
 * @param {function} props.setVal - A function to set the input value.
 * @param {string} props.placeholder - The placeholder text for the input field.
 * @param {number} props.maxDigits - The value of the maximum number of digits the input can have.
 * @param {boolean} [props.require=false] - Whether the input is required (default is false).
 * @returns {JSX.Element} JSX element representing the TextInput.
 *
 * @example
 * // Example usage of NumberInput:
 * <NumberInput
 *   label="Year"
 *   getVal={getYear}
 *   setVal={setYear}
 *   placeholder="Enter year"
 *   maxDigits={4}
 *   require={true}
 * />
 */
const NumberInput = ({
    label,
    getVal,
    setVal,
    placeholder,
    maxDigits = 4,
    require = false,
    allowDecimals = true
}) => {
    const isRequired = require;
    const maxAllowedValue = 10 ** maxDigits - 1;

    // Handle keypress to prevent negative values
    const handleKeyPress = (e) => {
        if (e.key === '-' || e.key === 'e') {
            e.preventDefault(); // Prevent '-' and 'e' key from being entered
        }
    };

    // Handle input change and update the value if it's a valid number
    const inputChange = (e) => {
        e.preventDefault();
        
        let inputValue = parseFloat(e.target.value);
        if (!allowDecimals)
            inputValue = parseInt(inputValue);

        // Check if the input value is a valid number 
        if (!isNaN(inputValue) && inputValue >= 0) {
            // If maxDigits is specified, check if it exceeds the maximum allowed value
            if (maxDigits && inputValue < maxAllowedValue) {
                setVal(inputValue);
            }
        }
    };


    return (
        <label>
            <div className='label-input'>
                {label}
                {isRequired && (
                    <span className='obligatorio'>*obligatorio</span>
                )}
            </div>
            <input
                className='box-input'
                type='number'
                placeholder={placeholder}
                value={getVal}
                required={isRequired}
                onKeyDown={handleKeyPress}
                onChange={inputChange}
                
            />
        </label>
    );
};

export default NumberInput;
