import React, { useState } from 'react';
import './Table.scss';
import BaseButton from '../buttons/BaseButton';
import { FireError, FireSucess, FireLoading } from '../../utils/alertHandler';
import DropdownInput from '../inputs/DropdownInput/DropdownInput';

/**
 * Public table component for displaying static data
 * @param {Object[]} data - Data to fill table
 * @returns {JSX.Element} - JSX element that represents the public table
 */
const AttendeesRegistrationTable = ({
    data,
    action,
    attendees,
    actionMessage,
    actionType,
    handlePatchAttendee,
}) => {
    // Gets the columns that must be shown on the table.
    const columnsToShow = data?.length > 0 ? Object.keys(data[0]) : [];

    // State that mantains the visibility of the columns.
    const [columnVisibility, setColumnVisibility] = useState(() => {
        return columnsToShow.reduce((visibility, column) => {
            if (column === 'specialties') return visibility;
            visibility[column] = true;
            return visibility;
        }, {});
    });

    const headerMappings = {
        modality: 'Modalidad',
        actions: 'Acciones',
        collegiateNumber: 'Número de colegiado',
        fullName: 'Nombre completo',
    };

    /**
     * Render the table header
     * @returns {JSX.Element} - JSX element that represents the table header.
     */
    const renderTableHeader = () => (
        <tr>
            {Object.keys(headerMappings).map((key) => (
                <th key={key} className='sticky-column'>
                    <div className='header-content'>
                        <span className='header-text'>{headerMappings[key]}</span>
                    </div>
                </th>
            ))}
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

        /**
         * Render a button component based on the provided row data and action message.
         *
         * @param {Object} row - The row data to be used for rendering the button.
         * @returns {JSX.Element} - A JSX element representing the rendered button.
         */
        const renderButton = (row) => {
            if (actionMessage == 'Agregar asistencia' && attendees.includes(row._id)) {
                return (
                    <BaseButton
                        type='disabled'
                        onClick={() =>
                            FireError(
                                'Ya se registró la asistencia del arquitecto a la asamblea'
                            )
                        }>
                        {actionMessage}
                    </BaseButton>
                );
            } else {
                return (
                    <BaseButton type={actionType} onClick={() => action(row)}>
                        {actionMessage}
                    </BaseButton>
                );
            }
        };

        return data.map((row, rowIndex) => (
            <tr key={rowIndex} className='fila-sombrada'>
                <td key={'action' + rowIndex} className='sticky-column'>
                    {row.modality && actionMessage === 'Eliminar' ? (
                        <div>
                            <div className='dropdown-'>
                                <label>
                                    <select
                                        className='dropdown-input'
                                        value={row.modality}
                                        onChange={(e) => {
                                            row.modality = e.target.value;
                                            handlePatchAttendee(row);
                                        }}>
                                        {['Presencial', 'Remoto'].map((option) => (
                                            <option key={option} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                </label>
                            </div>
                        </div>
                    ) : actionMessage == 'Agregar asistencia' &&
                      attendees.includes(row._id) ? (
                        <p>Asistencia {row.modality} existente</p>
                    ) : (
                        <DropdownInput
                            options={['Presencial', 'Remoto']}
                            getVal={row.modality}
                            setVal={function (val) {
                                row.modality = val;
                            }}
                            hasPlaceholder={false}
                        />
                    )}
                </td>
                <td key={'button' + rowIndex} className='sticky-column' type='primary'>
                    {renderButton(row)}
                </td>
                {Object.keys(headerMappings).map((column) =>
                    columnVisibility[column] &&
                    column !== '_id' &&
                    column !== 'modality' ? (
                        <td id={row[column]} className='sticky-column'>
                            {/* Aplicar el formato solo a las celdas con valores booleanos o fechas */}
                            {row[column]}
                        </td>
                    ) : null
                )}
            </tr>
        ));
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

export default AttendeesRegistrationTable;
