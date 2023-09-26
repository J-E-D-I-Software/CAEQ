import React from 'react';
import './FileInput.scss';

const FileInput = ({ label, getVal, setVal, require = false }) => {
    const isRequired = require;
    const onSelectFile = (e) => {
        if (!e.target.files || e.target.files.length === 0) {
            setVal(undefined);
            return;
        }
        setVal(e.target.files[0]);
    };

    return (
        <label>
            <div className='label-input'>{label}
                {isRequired && <span className='obligatorio'>*obligatorio</span>}
            </div>
            <input
                className='file-input'
                type='file'
                value={getVal}
                required={isRequired}
                onChange={onSelectFile}
            />
        </label>
    );
};

export default FileInput;