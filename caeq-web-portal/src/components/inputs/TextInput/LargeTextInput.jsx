import React from 'react';
import './TextInput.scss';

/**
 * LargeTextInput component for a multi-line text input.
 * @component
 *
 * @param {Object} props - The component's properties.
 * @param {string} props.label - The label for the input field.
 * @param {function} props.getVal - A function to get the current input value.
 * @param {function} props.setVal - A function to set the input value.
 * @param {string} props.placeholder - The placeholder text for the input field.
 * @param {boolean} [props.require=false] - Whether the input is required (default is false).
 * @returns {JSX.Element} JSX element representing the LargeTextInput.
 *
 * @example
 * // Example usage of LargeTextInput:
 * <LargeTextInput
 *   label="Comments"
 *   getVal={getComments}
 *   setVal={setComments}
 *   placeholder="Enter your comments here"
 *   require={true}
 * />
 */
const LargeTextInput = ({ label, getVal, setVal, placeholder, require = false }) => {
    const isRequired = require;

    return (
        <label>
            <div className='label-input' data-testid='largeTxtInput'>
                {label}
                {isRequired && <span className='obligatorio'>*obligatorio</span>}
            </div>
            <textarea
                className='large-box-input'
                rows='5'
                cols='60'
                type='text'
                placeholder={placeholder}
                value={getVal}
                required={isRequired}
                onChange={(e) => setVal(e.target.value)}
            />
        </label>
    );
};

export default LargeTextInput;
