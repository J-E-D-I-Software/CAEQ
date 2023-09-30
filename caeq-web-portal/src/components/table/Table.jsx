import React from "react";
import "./Table.scss"; // Archivo CSS para el estilo de la caja



// Datos de ejemplo
const datos = [
  { id: 1, columna1: 'Dato 1', columna2: 'Dato 2', columna3: 'Dato 3', columna4: 'Dato 4', columna5: 'Dato 5' },
  { id: 1, columna1: 'Dato 1', columna2: 'Dato 2', columna3: 'Dato 3', columna4: 'Dato 4', columna5: 'Dato 5' },
  { id: 1, columna1: 'Dato 1', columna2: 'Dato 2', columna3: 'Dato 3', columna4: 'Dato 4', columna5: 'Dato 5' },
  { id: 1, columna1: 'Dato 1', columna2: 'Dato 2', columna3: 'Dato 3', columna4: 'Dato 4', columna5: 'Dato 5' },
  { id: 1, columna1: 'Dato 1', columna2: 'Dato 2', columna3: 'Dato 3', columna4: 'Dato 4', columna5: 'Dato 5' },

  // Agrega más datos según sea necesario
];

const Table = () => {
  return (
    <div className="tabla-container">
      <table className="tabla">
        <thead>
          <tr>
            <th>Columna 1</th>
            <th>Columna 2</th>
            <th>Columna 3</th>
            <th>Columna 4</th>
            <th>Columna 5</th>
          </tr>
        </thead>
        <tbody>
          {datos.map((fila, id) => (
            <tr key={id} className="fila-sombrada">
              <td>{fila.columna1}</td>
              <td>{fila.columna2}</td>
              <td>{fila.columna3}</td>
              <td>{fila.columna4}</td>
              <td>{fila.columna5}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;