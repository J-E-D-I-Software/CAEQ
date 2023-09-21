import React from 'react';
import './DateInput.scss';

const DateInput = ({ label, getVal, setVal, require }) => {
    const isRequired = require;

    return (
        <label>
           <div className='label-input'>{label}
            <span className='obligatorio'>
                {isRequired && <span className='obligatorio'>*obligatorio</span>}
            </span>
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