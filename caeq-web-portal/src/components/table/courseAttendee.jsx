import React, { useState } from 'react';
import './Table.scss';
import CloseIcon from '../icons/Close.png';
import AcceptIcon from '../icons/AcceptIcon.png';
import BaseButton from '../buttons/BaseButton';
import headerMappings from './HeaderMappings';
import { Navigate } from 'react-router-dom';

/**
 * An interactive table component that allows showing or hiding columns.
 * @param {Object[]} data - The data to populate the table.
 * @returns {JSX.Element} - A JSX element representing the interactive table.
 */
const CourseAttendee = ({ data, onRowClick }) => {
    // Get the columns to be displayed in the table.
    const allColumns = Object.keys(headerMappings);

    /**
     * An interactive table component that allows showing or hiding columns.
     * @returns {JSX.Element} - A JSX element representing the interactive table.
     */

    // State to maintain the visibility of columns.
    const [columnVisibility, setColumnVisibility] = useState(() => {
        const initialVisibility = {};
        allColumns.forEach((column) => {
            initialVisibility[column] = true;
        });
        return initialVisibility;
    });

    const renderTableHeader = () => (
        <tr>
            {Object.keys(headerMappings).map((column) =>
                columnVisibility[column] && column !== '_id' ? (
                    <th key={column} className='sticky-column'>
                        <div className='header-content'>
                            <span className='header-text'>{headerMappings[column]}</span>
                        </div>
                    </th>
                ) : null
            )}
        </tr>
    );

    return (
        <div className='tabla-container'>
            <BaseButton
                type='primary'
                className='restablecer-button'
            >
                Resetear tabla
            </BaseButton>

            <div className='table-wrapper'>
                <table className='tabla'>
                    <thead>{renderTableHeader()}</thead>
                </table>
            </div>
        </div>
    );

};

export default CourseAttendee;