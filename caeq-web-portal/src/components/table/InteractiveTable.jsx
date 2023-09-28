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
            <span className="header-text">{column}</span>
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
      <BaseButton type='primary' label='Resetear tabla' className="restablecer-button" onClick={resetColumnVisibility}>
        Restablecer Columnas
      </BaseButton>
      <table className="tabla">
        <thead>{renderTableHeader()}</thead>
        <tbody>{renderTableBody()}</tbody>
      </table>
    </div>
  );
};

export default InteractiveTable;
