import React, { useState } from 'react';
import './DropdownInput.scss';

/**
 * DropdownInput component for selecting options from a dropdown list.
 * @component
 *
 * @param {Object} props - The component's properties.
 * @param {string} props.label - The label for the dropdown input.
 * @param {string[]} props.options - An array of options to populate the dropdown.
 * @param {function} props.onChange - A function to be called when the selected option changes.
 * @param {boolean} [props.require=false] - Whether the dropdown input is required (default is false).
 * @returns {JSX.Element} JSX element representing the DropdownInput.
 *
 * @example
 * // Example usage of DropdownInput:
 * <DropdownInput
 *   label="Select an option"
 *   options={['Option 1', 'Option 2', 'Option 3']}
 *   onChange={handleOptionChange}
 *   require={true}
 * />
 */
const DropdownInput = ({ label, getVal, setVal, options, onChange, placeholder = 'Elige una opción', require = false}) => {
    const isRequired = require;

    const [selectedOption, setSelected] = useState(getVal);

    const changeOption = (event) => {
        const newOption = event.target.value;
        setSelected(newOption);

        if (setVal) {
            setVal(newOption);
        }

        if (onChange) {
            onChange(newOption);
        }
    };

    return (
        <div className='dropdown-'>
            <label>
                <div className='label-input'>
                    {label}
                    {isRequired && <span className='obligatorio'>*obligatorio</span>}
                </div>
                <select 
                className='dropdown-input'
                value={selectedOption} 
                onChange={changeOption}
                required={isRequired}>
                <option value="">{placeholder}</option>
                    {options.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </label>
        </div>
    );
};

export default DropdownInput;
