import React, { useState } from 'react';
import './Table.scss';
import CloseIcon from '../icons/Close.png';
import AcceptIcon from '../icons/AcceptIcon.png';
import BaseButton from '../buttons/BaseButton';
//import headerDates from './HeaderDates';
import { Navigate } from 'react-router-dom';

/**
 * An interactive table component that allows showing or hiding columns.
 * @param {Object[]} data - The data to populate the table.
 * @returns {JSX.Element} - A JSX element representing the interactive table.
 */
const CourseAttendee = ({ data }) => {
    console.log(data);
    // Obtén todas las fechas únicas de las sesiones
    const allDates = [...new Set(data.map(item => new Date(item.date).toISOString().split('T')[0]))];

    // Estado para mantener la visibilidad de las columnas
    const [columnVisibility, setColumnVisibility] = useState(() => {
        const initialVisibility = {};
        allDates.forEach((date) => {
            initialVisibility[date] = true;
        });
        return initialVisibility;
    });

    const renderTableHeader = () => (
        <tr>
            {allDates.map((date) =>
                columnVisibility[date] ? (
                    <th key={date} className='sticky-column'>
                        <div className='header-content'>
                            <span className='header-text'>{date}</span>
                        </div>
                    </th>
                ) : null
            )}
        </tr>
    );

    //const renderTableBody = () => {
        /* for n in sessions:
            key={column}
            classname={
                column=== 'date'
                ? 'sticky-column'
                : 'sticky-column'
            } 
            if {architects._id} in {attendees}:
                <td>
                    <img src={AcceptIcon} />
                </td>
            else:
                <td>
                    <img src={CloseIcon} />
                </td>
            */
    //}

    const renderTableBody = () => {
        // Implementa el cuerpo de la tabla según sea necesario
    }

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