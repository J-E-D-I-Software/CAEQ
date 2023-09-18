import React, {useState} from 'react';
import './DropdownInput.scss';

const DropdownInput = ({ label, options, onChange }) => {
    const [selectedOption, setSelected] = useState('');

    const changeOption = (event) => {
        const newOption = event.target.value;
        setSelected(newOption);

        if (onChange) {
            onChange(newOption);
        }
    };

    return (
        <div>
            <label>
                <div className='label-input'>{label}</div>
                <select 
                className='dropdown-input'
                value={selectedOption} 
                onChange={changeOption}>
                <option value="">Elige una opción</option>
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