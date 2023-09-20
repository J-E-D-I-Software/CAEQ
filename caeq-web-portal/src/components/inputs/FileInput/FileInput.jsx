import React from 'react';
import './FileInput.scss';

const FileInput = ({ label, getVal, setVal }) => {
    const onSelectFile = (e) => {
        if (!e.target.files || e.target.files.length === 0) {
            setVal(undefined);
            return;
        }
        setVal(e.target.files[0]);
    };

    return (
        <label>
            <div className='label-input'>{label}</div>
            <input
                className='file-input'
                type='file'
                value={getVal}
                onChange={onSelectFile}
            />
        </label>
    );
};

export default FileInput;