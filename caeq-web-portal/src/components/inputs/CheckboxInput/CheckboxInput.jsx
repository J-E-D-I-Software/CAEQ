import React from 'react';
import './CheckboxInput.scss';

const CheckboxInput = ({ label, getVal, setVal, require = false }) => {
    const isRequired = require;

    return (
        <label className='label-checkbox'>
            
            <div className='label-input'>
                {label}
                {isRequired && <span className='obligatorio'>*obligatorio</span>}
            </div>
            <input
                className='checkbox-input'
                type='checkbox'
                required={isRequired}
                value={getVal}
                onChange={(e) => setVal(e.target.value)}
                hidden
            />
            <span className='round'></span>
        </label>
        
    );
};

export default CheckboxInput;
