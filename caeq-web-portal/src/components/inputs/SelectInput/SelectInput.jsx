import React from 'react';
import Select from 'react-select';


/**
 * SelectInputComponent - Component for selecting options from a dropdown list.
 *
 * @component
 *
 * @param {Object} props - The component's properties.
 * @param {string} props.label - The label for the dropdown input.
 * @param {Array} props.options - An array of options to populate the dropdown.
 * @param {function} props.onChange - A function to be called when the selected option changes.
 * @param {string} [props.placeholder] - The placeholder text for the input.
 * @param {Array} [props.value] - The selected value(s) of the input.
 *
 * @returns {JSX.Element} JSX element representing the SelectInputComponent.
 *
 * @example
 * // Example usage of SelectInputComponent:
 * <SelectInputComponent
 *   label="Select an option"
 *   options={['Option 1', 'Option 2', 'Option 3']}
 *   onChange={handleOptionChange}
 *   placeholder="Select an option"
 *   value={selectedValue}
 * />
 */

const colourStyles = {
    control: (baseStyles, state) => ({
        ...baseStyles,
        borderRadius: '20px',
        fontSize: '18px',
        fontfamily: 'Montserrat',
        padding: '0.5rem 1.5rem',
        letterSpacing: '1px',
        with: '100%',
        boxShadow: '4px 7px 15px 0px rgba(0, 0, 0, 0.35)',
        border: 'none',
        '&:hover': {
        cursor: 'pointer',
        transform: 'translateY(-3px)',
      },
        
    }),
};

function SelectInputComponent(props) {
    return (
        <div className="Select-">
            <label className="label-input">{props.label}</label>
            <br />
            <br />
            <Select
                styles={colourStyles}
                isMulti
                options={props.options}
                value={props.value}
                onChange={props.onChange}
                placeholder={props.placeholder}
            />
            <br />
        </div>
    );
}

export default SelectInputComponent;
