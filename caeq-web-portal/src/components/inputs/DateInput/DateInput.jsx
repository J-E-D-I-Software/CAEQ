import React from 'react';
import './DateInput.scss';

const DateInput = ({ label, getVal, setVal, require }) => {
    const isRequired = require;

    return (
        <label>
           <div className='label-input'>{label}
            <line className='obligatorio'>
                {isRequired && <span className='obligatorio'>*obligatorio</span>}
            </line>
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