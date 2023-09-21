import React from "react";
import "./InfoBox.scss"; // Archivo CSS para el estilo de la caja

function InfoBox(props) {
  return (
    <div className="info-box">
      <div className="column">
        <p>Anualidades pagadas:</p>
        <p>Asistencias a asambleas:</p>
        <p>Horas acreditadas por año:</p>
      </div>
      <div className="column">
        <p>Fecha de ingreso:</p>
        <p>Numero de dro:</p>
        <p>Numero de colegiado:</p>
        <p>Tipo de miembro:</p>
        <p>Clasificación:</p>
      </div>
    </div>
  );
}

export default InfoBox;
