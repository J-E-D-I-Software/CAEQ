import React from "react";
import "./Table.scss";

/**
 * Un componente de tabla que muestra los datos sin funcionalidad adicional.
 * @param {Object[]} data - Los datos para llenar la tabla.
 * @returns {JSX.Element} - Un elemento JSX que representa la tabla.
 */
const InteractiveTable = ({ data }) => {
  // Obtiene las columnas que deben mostrarse en la tabla.
  const columnsToShow = data?.length > 0 ? Object.keys(data[0]) : [];

  /**
   * Renderizar el encabezado de la tabla.
   * @returns {JSX.Element} - Un elemento JSX que representa el encabezado de la tabla.
   */
  const renderTableHeader = () => (
    <tr>
      {columnsToShow.map((column) => (
        <th key={column} className="sticky-column">
          {column}
        </th>
      ))}
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
          {columnsToShow.map((column) => (
            <td key={column} className="sticky-column">
              {row[column]}
            </td>
          ))}
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan={columnsToShow.length}>No hay datos disponibles.</td>
      </tr>
    );

  return (
    <div className="tabla-container">
      <table className="tabla">
        <thead>{renderTableHeader()}</thead>
        <tbody>{renderTableBody()}</tbody>
      </table>
    </div>
  );
};

export default InteractiveTable;
