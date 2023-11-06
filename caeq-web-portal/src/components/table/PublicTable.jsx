//

import React, { useState } from 'react';
import './Table.scss';

/**
 * Public table component for displaying static data
 * @param {Object[]} data - Data to fill table
 * @returns {JSX.Element} - JSX element that represents the public table
 */
const PublicTable = ({ data }) => {
    // Gets the columns that must be shown on the table.
    const columnsToShow = data?.length > 0 ? Object.keys(data[0]) : [];

    // State that mantains the visibility of the columns.
    const [columnVisibility, setColumnVisibility] = useState(() => {
        return columnsToShow.reduce((visibility, column) => {
            visibility[column] = true;
            return visibility;
        }, {});
    });

    const headerMappings = {
        fullName: 'Nombre completo',
        DRONumber: 'Número de DRO',
        specialty: 'Especialidad',
        cellphone: 'Número de celular',
        linkCV: 'Link de CV',
        email: 'Correo electrónico',
    };

    /**
     * Format function that shows boolean values as "Sí" o "No".
     * @param {boolean} value - Boolean value to format.
     * @returns {string} - "Sí" is the true value, "No" if it is false.
     */
    const formatBooleanValue = (value) => (value ? 'Sí' : 'No');

    /**
     * Render the table header
     * @returns {JSX.Element} - JSX element that represents the table header.
     */

    const renderTableHeader = () => (
        <tr>
            {columnsToShow.map((column) =>
                columnVisibility[column] && column !== '_id' && column !== '_id' ? (
                    <th key={column} className='sticky-column'>
                        <div className='header-content'>
                            <span className='header-text'>{headerMappings[column]}</span>
                        </div>
                    </th>
                ) : null
            )}
        </tr>
    );

    /**
     * Render the table body
     * @returns {JSX.Element} - JSX element that represents the table body
     */
    const renderTableBody = () => {
        if (!data || data.length === 0) {
            return (
                <tr>
                    <td colSpan={columnsToShow.length}>No hay colegiados disponibles.</td>
                </tr>
            );
        }

        return data.map((row, rowIndex) => (
            <tr key={rowIndex} className='fila-sombrada'>
                {columnsToShow.map((column) =>
                    columnVisibility[column] && column !== '_id' ? (
                        <td key={column} className='sticky-column'>
                            {/* Aplicar el formato solo a las celdas con valores booleanos o fechas */}
                            {typeof row[column] === 'boolean' ? (
                                formatBooleanValue(row[column])
                            ) : column === 'linkCV' && row[column] ? (
                                <a
                                    href={row[column]}
                                    target='_blank'
                                    rel='noopener noreferrer'>
                                    Descargar
                                </a>
                            ) : column === 'dateOfBirth' && row[column] ? (
                                formatDate(row[column])
                            ) : column === 'dateOfAdmission' && row[column] ? (
                                formatDate(row[column])
                            ) : (
                                row[column]
                            )}
                        </td>
                    ) : null
                )}
            </tr>
        ));
    };

    /**
     * Format the date "DD/MM/AAAA" using toLocaleDateString.
     * @param {string} date - The date in string format (for example "AAAA-MM-DD").
     * @returns {string} - The formated date in "DD/MM/AAAA".
     */
    const formatDate = (date) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(date).toLocaleDateString(undefined, options);
    };

    return (
        <div className='tabla-container'>
            <table className='tabla'>
                <thead>{renderTableHeader()}</thead>
                <tbody>{renderTableBody()}</tbody>
            </table>
        </div>
    );
};

export default PublicTable;
