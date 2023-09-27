<<<<<<< HEAD
import React from 'react';
import './TextInput.scss';

const TextInput = ({ label, getVal, setVal, placeholder, require = false }) => {
    const isRequired = require;

    return (
        <label data-testid="txtInput">
            <div className='label-input'>{label}
                {isRequired && <span className='obligatorio'>*obligatorio</span>}
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
=======
import React from 'react';
import './TextInput.scss';

const TextInput = ({ label, getVal, setVal, placeholder, require = false }) => {
    const isRequired = require;

    return (
        <label data-testid='txtInput'>
            <div className='label-input'>
                {label}
                {isRequired && <span className='obligatorio'>*obligatorio</span>}
            </div>
            <div className='input-eye'>
                <input
                    className='box-input'
                    type='text'
                    placeholder={placeholder}
                    value={getVal}
                    required={isRequired}
                    onChange={(e) => setVal(e.target.value)}
                />
            </div>
        </label>
    );
};

export default TextInput;
>>>>>>> user/cesarjimenezvilleda02/req41-adminsignup
