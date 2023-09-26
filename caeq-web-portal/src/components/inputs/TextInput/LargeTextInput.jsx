import React from 'react';
import './TextInput.scss';

const LargeTextInput = ({ label, getVal, setVal, placeholder, require = false }) => {
    const isRequired = require;

    return (
        <label>
            <div className='label-input' data-testid='largeTxtInput'>{label}
                {isRequired && <span className='obligatorio'>*obligatorio</span>}
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