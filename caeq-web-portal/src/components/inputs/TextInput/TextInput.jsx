import React from 'react';
import './TextInput.scss';

const TextInput = ({ label, getVal, setVal, placeholder }) => {
    return (
        <label>
            <div className='label-input'>{label}</div>
            <input
                className='box-input'
                type='text'
                placeholder={placeholder}
                value={getVal}
                onChange={(e) => setVal(e.target.value)}
            />
        </label>
    );
};

export default TextInput;
