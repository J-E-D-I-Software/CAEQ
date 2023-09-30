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
const InteractiveTable = ({ data }) => {
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
    hoursAttended: "Horas asistidas",
    memberType: "Tipo de miembro",
    classification: "Clasificación",
    DRONumber: "Número de DRO",
    autorizationToShareInfo: "Autorización para compartir información",
    lifeInsurance: "Seguro de vida",
    lifeInsuranceId: "Poliza de seguro de vida",
    age: "Edad",
    gender: "Género",
    cellphoone: "Número de celular",
    homephone: "Número de casa",
    officephone: "Número de oficina",
    emergencyContactName: "Nombre de contacto de emergencia",
    emergencyContact: "Número de contacto de emergencia",
    mainProfessionalActivity: "Actividad profesional principal",
    dateOfAdmission: "Fecha de admisión",
    dateOfBirth: "Fecha de nacimiento",
    municipalityOfLabor: "Municipio de trabajo",
    linkCV: "Link de CV",
    university: "Universidad",
    mainProfessionalLicense: "Cédula profesional",
    workAddress: "Domicilio de trabajo",
    homeAddress: "Domicilio de particular",
    speciality: "Especialidad",
    positionsInCouncil: "Cargos en consejos directivos",
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
  /**
   * Renderizar el encabezado de la tabla.
   * @returns {JSX.Element} - Un elemento JSX que representa el encabezado de la tabla.
   */

  const renderTableHeader = () => (
    <tr>
      {columnsToShow.map((column) =>
        columnVisibility[column] ? (
          <th key={column} className="sticky-column">
            <div className="header-content">
              <span className="header-text">{headerMappings[column]}</span>
              <button
                className="hide-button"
                onClick={() => toggleColumnVisibility(column)}
              >
                <img src={CloseIcon} alt="Icono Ocultar" />
              </button>
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
  const renderTableBody = () =>
    data?.length > 0 ? (
      data.map((row, rowIndex) => (
        <tr key={rowIndex} className="fila-sombrada">
          {columnsToShow.map((column) =>
            columnVisibility[column] ? (
              <td key={column} className="sticky-column">
                {/* Aplicar el formato solo a las celdas con valores booleanos */}
                {typeof row[column] === "boolean"
                  ? formatBooleanValue(row[column])
                  : row[column]}
              </td>
            ) : null
          )}
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan={columnsToShow.length}>No hay datos disponibles.</td>
      </tr>
    );

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
