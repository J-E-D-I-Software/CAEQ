import React, { useState } from 'react';
import './InscriptionTable.scss';
import BaseButton from '../buttons/BaseButton';
import { Navigate } from 'react-router-dom';
import AcceptIcon from '../icons/AcceptIcon.png';
import RejectIcon from '../icons/RejectIcon.png';

const CourseAttendee = ({ data, userId }) => {
    const attendedSessions = data.sort((a,b) => new Date(a.date) - new Date(b.date)).map((session) => {
        return [new Date(session.date).toLocaleDateString(), session.attendees.includes(userId)]
    }) 
    console.log(attendedSessions)
    const renderTableHeader = () => (
        <tr>
            {attendedSessions.map((sessionTouple) => (
                <th key={sessionTouple[0]} className='sticky-column'>
                    <div className='header-content'>
                        <span className='header-text'>{sessionTouple[0]}</span>
                    </div>
                </th>
            ))}
        </tr>
    );

    const renderTableBody = () => (
        <tbody>
            <tr key={userId}>
                {attendedSessions.map((sessionTouple) => (
                    <td key={sessionTouple[0]}>
                        {sessionTouple[1] ? <img src={AcceptIcon} /> : <img src={RejectIcon} />}
                    </td>
                ))}
            </tr>
        </tbody>
    );

    return (
        <div className='inscription-table'>
            <div className='inscription-row'>
                <h1>Asistencias</h1>
            </div>
            <div className='tabla-container'>
            <div className='table-wrapper'>
                <table className='tabla'>
                    <thead>{renderTableHeader()}</thead>
                    {renderTableBody()}
                </table>
            </div>
        </div>
        </div>
        
    );
};

export default CourseAttendee;