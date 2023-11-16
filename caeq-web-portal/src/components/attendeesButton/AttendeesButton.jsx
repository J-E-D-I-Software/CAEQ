import React, { useState } from 'react';
import BaseButton from '../buttons/BaseButton';
import './AttendeesButton.scss';

function AttendancesComponent({ attendances }) {
    const [selectedYear, setSelectedYear] = useState(null);

    const handleYearClick = (year) => {
        if (selectedYear === year) {
            setSelectedYear(null);
        } else {
            setSelectedYear(year);
        }
    };

    const uniqueYears = Array.from(
        new Set(attendances.map((asistencia) => asistencia.idGathering.year))
    ).sort((a, b) => a - b);

    return (
        <div>
            <h1>Asistencias a Asambleas</h1>
            <div className="Attendees-row">
                {uniqueYears.length > 0 ? (
                    uniqueYears.map((year) => (
                        <div key={year}>
                            <BaseButton
                                className="year-button"
                                type="primary"
                                onClick={() => handleYearClick(year)}
                            >
                                {year}
                            </BaseButton>
                            {selectedYear === year && (
                                <div className="list-data">
                                    {attendances
                                        .filter(
                                            (asistencia) =>
                                                asistencia.idGathering.year === year &&
                                                asistencia.attended
                                        )
                                        .map((asistencia) => {
                                            const date = new Date(
                                                asistencia.idGathering.date
                                            );

                                            date.setDate(date.getDate() + 1);

                                            return (
                                                <p key={asistencia._id}>
                                                    {date.toLocaleDateString('en-GB')} -
                                                    Modalidad:{' '}
                                                    {asistencia.modality === 'Remoto'
                                                        ? 'En línea'
                                                        : asistencia.modality}
                                                </p>
                                            );
                                        })}
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <h2>No hay asistencias registradas</h2>
                )}
            </div>
        </div>
    );
}

export default AttendancesComponent;
