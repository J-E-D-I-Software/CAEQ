import React from 'react';
import './TextInput.scss';

const TextInput = ({ label, getVal, setVal, placeholder, require }) => {
    const isRequired = require;

    return (
        <label data-testid="txtInput">
            <div className='label-input'>{label}
                <span className='obligatorio'>
                        {isRequired && <span className='obligatorio'>*obligatorio</span>}
                </span>
            </div>
            <input
                className='box-input'
                type='text'
                placeholder={placeholder}
                value={getVal}
                required={isRequired}
                onChange={(e) => setVal(e.target.value)}
            />
        </label>
    );
};

export default TextInput;
