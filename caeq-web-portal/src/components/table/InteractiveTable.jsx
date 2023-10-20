//

import React, { useState } from "react";
import "./Table.scss";
import CloseIcon from "../icons/Close.png";
import BaseButton from "../buttons/BaseButton";

/**
 * Un componente de tabla interactivo que permite mostrar u ocultar columnas.
 * @param {Object[]} data - Los datos para llenar la tabla.
 * @returns {JSX.Element} - Un elemento JSX que representa la tabla interactiva.
 */
const InteractiveTable = ({ data, onRowClick}) => {
  // Obtiene las columnas que deben mostrarse en la tabla.
  const columnsToShow = data?.length > 0 ? Object.keys(data[0]) : [];

  // Estado para mantener la visibilidad de las columnas.
  const [columnVisibility, setColumnVisibility] = useState(() => {
    return columnsToShow.reduce((visibility, column) => {
      visibility[column] = true;
      return visibility;
    }, {});
  });

  /**
   * Alternar la visibilidad de una columna.
   * @param {string} columnKey - La clave de la columna a alternar.
   */
  const toggleColumnVisibility = (columnKey) => {
    setColumnVisibility((prevVisibility) => ({
      ...prevVisibility,
      [columnKey]: !prevVisibility[columnKey],
    }));
  };

  /**
   * Restablecer la visibilidad de todas las columnas.
   */
  const resetColumnVisibility = () => {
    setColumnVisibility((prevVisibility) => {
      const resetVisibility = {};
      columnsToShow.forEach((column) => {
        resetVisibility[column] = true;
      });
      return resetVisibility;
    });
  };

  const headerMappings = {
    fullName: "Nombre completo",
    collegiateNumber: "Número de colegiado",
    memberType: "Tipo de miembro",
    classification: "Clasificación",
    DRONumber: "Número de DRO",
    authorizationToShareInfo: "Autorización para compartir información",
    lifeInsurance: "Seguro de vida",
    lifeInsureID: "Poliza de seguro de vida",
    age: "Edad",
    gender: "Género",
    cellphone: "Número de celular",
    homePhone: "Número de casa",
    officePhone: "Número de oficina",
    emergencyContactName: "Nombre de contacto de emergencia",
    emergencyContact: "Número de contacto de emergencia",
    mainProfessionalActivity: "Actividad profesional principal",
    dateOfAdmission: "Fecha de admisión",
    dateOfBirth: "Fecha de nacimiento",
    municipalityOfLabor: "Municipio de trabajo",
    linkCV: "Link de CV",
    university: "Universidad",
    professionalLicense: "Cédula profesional",
    workAddress: "Domicilio de trabajo",
    homeAddress: "Domicilio de particular",
    specialty: "Especialidad",
    positionsInCouncil: "Cargos en consejos directivos",
    capacitationHours: "Horas asistidas",
    email: "Correo electrónico",
  };

  /**
   * Función de formato para mostrar valores booleanos como "Sí" o "No".
   * @param {boolean} value - El valor booleano a formatear.
   * @returns {string} - "Sí" si el valor es verdadero, "No" si es falso.
   */
  const formatBooleanValue = (value) => (value ? "Sí" : "No");

  /**
   * Renderizar el encabezado de la tabla.
   * @returns {JSX.Element} - Un elemento JSX que representa el encabezado de la tabla.
   */

  const renderTableHeader = () => (
    <tr>
      {columnsToShow.map((column) =>
        columnVisibility[column] && column !== "_id" && column !== "_id"  ? (
          <th key={column} className="sticky-column">
            <div className="header-content">
              <span className="header-text">{headerMappings[column]}</span>
              <div className="hide-button-container">
                <button
                  className="hide-button"
                  onClick={() => toggleColumnVisibility(column)}
                >
                  <img src={CloseIcon} alt="Icono Ocultar" />
                </button>
              </div>
            </div>
          </th>
        ) : null
      )}
    </tr>
  );

  /**
   * Renderizar el cuerpo de la tabla.
   * @returns {JSX.Element} - Un elemento JSX que representa el cuerpo de la tabla.
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
    console.log("yep",data),
    <tr 
      key={rowIndex} 
      className="fila-sombrada"
      onClick={() => onRowClick(data[rowIndex]._id)}
      >
      
      {columnsToShow.map((column) =>
        columnVisibility[column] && column !== "_id" ? (
          <td key={column} className="sticky-column">
            {/* Aplicar el formato solo a las celdas con valores booleanos o fechas */}
            {typeof row[column] === "boolean" ? (
              formatBooleanValue(row[column])
            ) : column === "linkCV" && row[column] ? (
              <a href={row[column]} target="_blank" rel="noopener noreferrer">
                Descargar
              </a>
            ) : column === "dateOfBirth" && row[column] ? (
              formatDate(row[column])
            ) : column === "dateOfAdmission" && row[column] ? (
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
   * Formatear la fecha en el formato "DD/MM/AAAA" utilizando toLocaleDateString.
   * @param {string} date - La fecha en formato de cadena (por ejemplo, "AAAA-MM-DD").
   * @returns {string} - La fecha formateada en "DD/MM/AAAA".
   */
  const formatDate = (date) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  return (
    <div className="tabla-container">
      <BaseButton
        type="primary"
        className="restablecer-button"
        onClick={resetColumnVisibility}
      >
        Resetear tabla
      </BaseButton>

      <table className="tabla">
        <thead>{renderTableHeader()}</thead>
        <tbody>{renderTableBody()}</tbody>
      </table>
    </div>
  );
};

export default InteractiveTable;
