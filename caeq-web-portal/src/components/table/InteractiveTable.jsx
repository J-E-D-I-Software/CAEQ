import React, { useState } from "react";
import "./Table.scss";
import CloseIcon from "../icons/Close.png";

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

  const renderTableHeader = () => {
    return (
      <tr>
        <th className="sticky-column">Columna 1</th>
        {Object.keys(columnVisibility).map((key) =>
          columnVisibility[key] ? (
            <th key={key}>
              {`Columna ${key.charAt(key.length - 1)}`}{" "}
              <button
                className="hide-button"
                onClick={() => toggleColumnVisibility(key)}
              >
                <img src={CloseIcon} alt="Icono Ocultar" />
              </button>
            </th>
          ) : null
        )}
      </tr>
    );
  };

  const renderTableBody = () => {
    return datos.map((fila) => (
      <tr key={fila.id} className="fila-sombrada">
        <td className="sticky-column">{fila.columna1}</td>
        {Object.keys(columnVisibility).map((key) =>
          columnVisibility[key] ? <td key={key}>{fila[key]}</td> : null
        )}
      </tr>
    ));
  };

  return (
    <div className="tabla-container">
      <table className="tabla">
        <thead>{renderTableHeader()}</thead>
        <tbody>{renderTableBody()}</tbody>
      </table>
      <button className="restablecer-button" onClick={resetColumnVisibility}>
        Restablecer Columnas
      </button>
    </div>
  );
};

export default Table;
