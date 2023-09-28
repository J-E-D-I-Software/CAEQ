import React, {useState} from 'react';
import './DropdownInput.scss';

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
                <div className='label-input'>{label}
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