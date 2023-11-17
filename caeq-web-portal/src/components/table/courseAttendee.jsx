import React, { useState } from "react";
// import './InscriptionTable.scss';
import "./courseAttendee.scss";
import BaseButton from "../buttons/BaseButton";
import { Navigate } from "react-router-dom";
import AcceptIcon from "../icons/AcceptIcon.png";
import RejectIcon from "../icons/RejectIcon.png";

/**
 * Renders a table displaying the attendance of a course attendee.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Array} props.data - The data containing the sessions attended by the user.
 * @param {string} props.userId - The ID of the user.
 * @param {string} props.course - The name of the course.
 * @param {number} props.hours - The total number of hours for the course.
 * @returns {JSX.Element} The rendered CourseAttendee component.
 */
const CourseAttendee = ({ data, userId, course, hours }) => {
  const attendedSessions = data
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .map((session) => {
      return [
        new Date(session.date).toLocaleDateString(),
        session.attendees.includes(userId),
      ];
    });

  const totalSessions = attendedSessions.length;
  const attendedCount = attendedSessions.filter(
    ([_, attended]) => attended
  ).length;

  const renderTableHeader = () => (
    <tr>
      {attendedSessions.map((sessionTouple) => (
        <th key={sessionTouple[0]} className="sticky-column">
          <div className="header-content">
            <span className="header-text">{sessionTouple[0]}</span>
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
            {sessionTouple[1] ? (
              <img src={AcceptIcon} />
            ) : (
              <img src={RejectIcon} />
            )}
          </td>
        ))}
      </tr>
    </tbody>
  );

  return (
    <div className="course-attendee-container tabla-container">
      <h1>Nombre del curso: {course}</h1>

      <div className="table-wrapper">
        <table className="tabla">
          <thead>{renderTableHeader()}</thead>
          {renderTableBody()}
        </table>
      </div>

      <div className="course-attendee-container-footer">
        <h2>Asistencias Totales: {attendedCount} de {totalSessions}</h2>
        <h2>Horas Acreditadas: {hours}</h2>
      </div>
    </div>
  );
};

export default CourseAttendee;
