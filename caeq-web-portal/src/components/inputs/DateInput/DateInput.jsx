import React from 'react';
import './DateInput.scss';

const DateInput = ({ label, getVal, setVal }) => {
    return (
        <label>
           <div className='label-input'>{label}</div> 
           <input
            className='date-input'
            value={getVal}
            type='date'
            onChange={(e) => setVal(e.target.value)}
           />
        </label>
    );
};

export default DateInput;