import React, { useState } from "react";
// import './InscriptionTable.scss';
import "./courseAttendee.scss";
import BaseButton from "../buttons/BaseButton";
import { Navigate } from "react-router-dom";
import AcceptIcon from "../icons/AcceptIcon.png";
import RejectIcon from "../icons/RejectIcon.png";

const CourseAttendee = ({ data, userId, course, hours }) => {
  const attendedSessions = data
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .map((session) => {
      return [
        new Date(session.date).toLocaleDateString(),
        session.attendees.includes(userId),
      ];
    });
  const space =
    "\u00A0" +
    "\u00A0" +
    "\u00A0" +
    "\u00A0" +
    "\u00A0" +
    "\u00A0" +
    "\u00A0" +
    "\u00A0" +
    "\u00A0" +
    "\u00A0" +
    "\u00A0" +
    "\u00A0" +
    "\u00A0" +
    "\u00A0" +
    "\u00A0" +
    "\u00A0" +
    "\u00A0" +
    "\u00A0" +
    "\u00A0" +
    "\u00A0";
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
    <div className="tabla-container">
      <h1>Nombre del curso: {course}</h1>

      <div className="table-wrapper">
        <table className="tabla">
          <thead>{renderTableHeader()}</thead>
          {renderTableBody()}
        </table>
      </div>

      <h2>
        Horas totales acreditadas: {hours} {space} Mis asistencias a este curso:{" "}
        {attendedCount} de {totalSessions}
      </h2>
    </div>
  );
};

export default CourseAttendee;
