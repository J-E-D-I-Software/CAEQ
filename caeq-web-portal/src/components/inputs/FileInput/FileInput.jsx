import React from 'react';
import './FileInput.scss';

const FileInput = ({ label, setVal, require = false }) => {
    const isRequired = require;
    const onSelectFile = (e) => {
        if (!e.target.files || e.target.files.length === 0) {
            setVal(undefined);
        } else {
            setVal(e.target.files[0]);
        }
    };

    return (
        <label>
            <div className='label-input'>
                {label}
                {isRequired && <span className='obligatorio'>*obligatorio</span>}
            </div>
            <input
                className='file-input'
                type='file'
                accept=".pdf"
                required={isRequired}
                onChange={onSelectFile}
            />
        </label>
    );
};

export default FileInput;