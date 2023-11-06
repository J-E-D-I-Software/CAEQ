import React from 'react';
import './FileInput.scss';

/**
 * FileInput component for selecting and uploading files.
 * @component
 *
 * @param {Object} props - The component's properties.
 * @param {string} props.label - The label for the file input field.
 * @param {function} props.getVal - A function to get the current selected file value.
 * @param {function} props.setVal - A function to set the selected file.
 * @param {boolean} [props.require=false] - Whether the file input is required (default is false).
 * @returns {JSX.Element} JSX element representing the FileInput.
 *
 * @example
 * // Example usage of FileInput:
 * <FileInput
 *   label="Upload a file"
 *   getVal={getSelectedFile}
 *   setVal={setSelectedFile}
 *   require={true}
 * />
 */
const FileInput = ({ label, setVal, accept = '.pdf', require = false }) => {
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
                accept={accept}
                required={isRequired}
                onChange={onSelectFile}
            />
        </label>
    );
};

export default FileInput;
