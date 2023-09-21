import React from 'react';
import './TextInput.scss';

const TextInput = ({ label, getVal, setVal, placeholder, require }) => {
    const isRequired = require;

    return (
        <label>
            <div className='label-input'>{label}
                <line className='obligatorio'>
                        {isRequired && <span className='obligatorio'>*obligatorio</span>}
                </line>
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
