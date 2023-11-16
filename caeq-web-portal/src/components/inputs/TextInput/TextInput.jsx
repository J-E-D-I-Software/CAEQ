import React from 'react';
import './TextInput.scss';

/**
 * TextInput component for a single-line text input.
 * @component
 *
 * @param {Object} props - The component's properties.
 * @param {string} props.label - The label for the input field.
 * @param {function} props.getVal - A function to get the current input value.
 * @param {function} props.setVal - A function to set the input value.
 * @param {string} props.placeholder - The placeholder text for the input field.
 * @param {boolean} [props.require=false] - Whether the input is required (default is false).
 * @returns {JSX.Element} JSX element representing the TextInput.
 *
 * @example
 * // Example usage of TextInput:
 * <TextInput
 *   label="Name"
 *   getVal={getName}
 *   setVal={setName}
 *   placeholder="Enter your name"
 *   require={true}
 * />
 */
const TextInput = ({ label, getVal, setVal, placeholder,require = false, maxLength}) => {
    const isRequired = require;

    return (
        <label data-testid='txtInput'>
            <div className='label-input'>
                {label}
                {isRequired && (
                    <span className='obligatorio'>*obligatorio</span>
                )}
            </div>
            <div className='input-eye'>
                <input
                    className='box-input'
                    type='text'
                    placeholder={placeholder}
                    value={getVal}
                    required={isRequired}
                    onChange={(e) => setVal(e.target.value)}
                    maxLength={maxLength}
                />
            </div>
        </label>
    );
};

export default TextInput;
