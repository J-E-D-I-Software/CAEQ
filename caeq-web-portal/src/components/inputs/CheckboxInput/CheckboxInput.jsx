import React from 'react';
import './CheckboxInput.scss';

const DateInput = ({ label, getVal, setVal, require = false }) => {
    const isRequired = require;

    return (
        <label className='label-checkbox'>
            
            <div className='label-input'>
                {label}
                {isRequired && <span className='obligatorio'>*obligatorio</span>}
            </div>
            <input
                className='checkbox-input'
                value={getVal}
                type='checkbox'
                required={isRequired}
                onChange={(e) => setVal(e.target.value)}
            />
            <span className='round'></span>
        </label>
        
    );
};

export default DateInput;
