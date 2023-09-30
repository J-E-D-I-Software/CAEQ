import React from 'react';
import './DateInput.scss';

/**
 * DateInput component for selecting dates.
 * @component
 *
 * @param {Object} props - The component's properties.
 * @param {string} props.label - The label for the date input field.
 * @param {string} props.getVal - The current selected date value.
 * @param {function} props.setVal - A function to set the selected date value.
 * @param {boolean} [props.require=false] - Whether the date input is required (default is false).
 * @returns {JSX.Element} JSX element representing the DateInput.
 *
 * @example
 * // Example usage of DateInput:
 * <DateInput
 *   label="Select a date"
 *   getVal={getSelectedDate}
 *   setVal={setSelectedDate}
 *   require={true}
 * />
 */
const DateInput = ({ label, getVal, setVal, require = false }) => {
    const isRequired = require;

    return (
        <label>
            <div className='label-input'>
                {label}
                {isRequired && <span className='obligatorio'>*obligatorio</span>}
            </div>
            <input
                className='date-input'
                value={getVal}
                type='date'
                required={isRequired}
                onChange={(e) => setVal(e.target.value)}
            />
        </label>
    );
};

export default DateInput;
