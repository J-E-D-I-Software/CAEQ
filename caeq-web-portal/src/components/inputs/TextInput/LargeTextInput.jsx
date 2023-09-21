import React from 'react';
import './TextInput.scss';

const LargeTextInput = ({ label, getVal, setVal, placeholder, require }) => {
    const isRequired = require;

    return (
        <label>
            <div className='label-input'>{label}
                <line className='obligatorio'>
                    {isRequired && <span className='obligatorio'>*obligatorio</span>}
                </line>
            </div>
            <textarea
                className='large-box-input'
                rows = "5" 
                cols = "60"
                type='text'
                placeholder={placeholder}
                value={getVal}
                required={isRequired}
                onChange={(e) => setVal(e.target.value)}
            />
        </label>
    );
};

export default LargeTextInput;