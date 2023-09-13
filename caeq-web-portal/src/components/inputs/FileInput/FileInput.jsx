import React from 'react';
import './FileInput.scss';

const FileInput = ({ label, getVal, setVal }) => {
    return (
        <label>
            <div className='label-input'>{label}</div>
            <input
                className='file-input'
                type='file'
                value={getVal}
                onChange={(e) => setVal(e.target.value)}
            />
        </label>
    );
};

export default FileInput;