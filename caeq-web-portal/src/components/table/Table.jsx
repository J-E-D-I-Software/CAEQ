// import React from "react";
// import "./Table.scss"; // Archivo CSS para el estilo de la caja



// // Datos de ejemplo
// const datos = [
//   { id: 1, columna1: 'Dato 1', columna2: 'Dato 2', columna3: 'Dato 3', columna4: 'Dato 4', columna5: 'Dato 5' },
//   { id: 1, columna1: 'Dato 1', columna2: 'Dato 2', columna3: 'Dato 3', columna4: 'Dato 4', columna5: 'Dato 5' },
//   { id: 1, columna1: 'Dato 1', columna2: 'Dato 2', columna3: 'Dato 3', columna4: 'Dato 4', columna5: 'Dato 5' },
//   { id: 1, columna1: 'Dato 1', columna2: 'Dato 2', columna3: 'Dato 3', columna4: 'Dato 4', columna5: 'Dato 5' },
//   { id: 1, columna1: 'Dato 1', columna2: 'Dato 2', columna3: 'Dato 3', columna4: 'Dato 4', columna5: 'Dato 5' },

//   // Agrega más datos según sea necesario
// ];

// const Table = () => {
//   return (
//     <div className="tabla-container">
//       <table className="tabla">
//         <thead>
//           <tr>
//             <th>Columna 1</th>
//             <th>Columna 2</th>
//             <th>Columna 3</th>
//             <th>Columna 4</th>
//             <th>Columna 5</th>
//           </tr>
//         </thead>
//         <tbody>
//           {datos.map((fila, id) => (
//             <tr key={id} className="fila-sombrada">
//               <td>{fila.columna1}</td>
//               <td>{fila.columna2}</td>
//               <td>{fila.columna3}</td>
//               <td>{fila.columna4}</td>
//               <td>{fila.columna5}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Table;

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
