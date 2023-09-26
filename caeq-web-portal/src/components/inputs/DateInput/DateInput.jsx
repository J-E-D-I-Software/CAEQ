import React from 'react';
import './DateInput.scss';

const DateInput = ({ label, getVal, setVal, require = false }) => {
    const isRequired = require;

    return (
        <label>
           <div className='label-input'>{label}
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