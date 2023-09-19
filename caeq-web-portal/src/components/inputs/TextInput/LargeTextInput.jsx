import React from 'react';
import './TextInput.scss';

const LargeTextInput = ({ label, getVal, setVal, placeholder }) => {
    return (
        <label>
            <div className='label-input'>{label}</div>
            <textarea
                className='large-box-input'
                rows = "5" 
                cols = "60"
                type='text'
                placeholder={placeholder}
                value={getVal}
                onChange={(e) => setVal(e.target.value)}
            />
        </label>
    );
};

export default LargeTextInput;