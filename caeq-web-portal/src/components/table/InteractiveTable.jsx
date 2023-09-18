import React, { useState } from "react";
import "./Table.scss"; // Archivo CSS para el estilo de la tabla

// Datos de ejemplo
const datos = [
  {
    id: 1,
    columna1: "Dato 1",
    columna2: "Dato 2",
    columna3: "Dato 3",
    columna4: "Dato 4",
    columna5: "Dato 5",
  },
  {
    id: 2,
    columna1: "Dato 1",
    columna2: "Dato 2",
    columna3: "Dato 3",
    columna4: "Dato 4",
    columna5: "Dato 5",
  },
  {
    id: 3,
    columna1: "Dato 1",
    columna2: "Dato 2",
    columna3: "Dato 3",
    columna4: "Dato 4",
    columna5: "Dato 5",
  },
  {
    id: 4,
    columna1: "Dato 1",
    columna2: "Dato 2",
    columna3: "Dato 3",
    columna4: "Dato 4",
    columna5: "Dato 5",
  },
  {
    id: 5,
    columna1: "Dato 1",
    columna2: "Dato 2",
    columna3: "Dato 3",
    columna4: "Dato 4",
    columna5: "Dato 5",
  },
];

const Table = () => {
  const [columnVisibility, setColumnVisibility] = useState({
    columna1: true,
    columna2: true,
    columna3: true,
    columna4: true,
    columna5: true,
  });

  const toggleColumnVisibility = (columnKey) => {
    setColumnVisibility((prevState) => ({
      ...prevState,
      [columnKey]: !prevState[columnKey],
    }));
  };

  const resetColumnVisibility = () => {
    setColumnVisibility({
      columna1: true,
      columna2: true,
      columna3: true,
      columna4: true,
      columna5: true,
    });
  };

  return (
    <div className="tabla-container">
      <table className="tabla">
        <thead>
          <tr>
            <th className="sticky-column">
              Columna 1
            </th>
            {columnVisibility.columna2 && (
              <th>
                Columna 2{" "}
                <button onClick={() => toggleColumnVisibility("columna2")}>
                  Ocultar
                </button>
              </th>
            )}
            {columnVisibility.columna3 && (
              <th>
                Columna 3{" "}
                <button onClick={() => toggleColumnVisibility("columna3")}>
                  Ocultar
                </button>
              </th>
            )}
            {columnVisibility.columna4 && (
              <th>
                Columna 4{" "}
                <button onClick={() => toggleColumnVisibility("columna4")}>
                  Ocultar
                </button>
              </th>
            )}
            {columnVisibility.columna5 && (
              <th>
                Columna 5{" "}
                <button onClick={() => toggleColumnVisibility("columna5")}>
                  Ocultar
                </button>
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {datos.map((fila) => (
            <tr key={fila.id} className="fila-sombrada">
              <td className="sticky-column">{fila.columna1}</td>
              {columnVisibility.columna2 && <td>{fila.columna2}</td>}
              {columnVisibility.columna3 && <td>{fila.columna3}</td>}
              {columnVisibility.columna4 && <td>{fila.columna4}</td>}
              {columnVisibility.columna5 && <td>{fila.columna5}</td>}
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={resetColumnVisibility}>Restablecer Columnas</button>
    </div>
  );
};

export default Table;
