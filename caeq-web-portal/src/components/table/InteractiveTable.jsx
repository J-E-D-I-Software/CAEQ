//

import React, { useState } from "react";
import "./Table.scss";
import CloseIcon from "../icons/Close.png";
import BaseButton from "../buttons/BaseButton";
import headerMappings from "./HeaderMappings";

/**
 * An interactive table component that allows showing or hiding columns.
 * @param {Object[]} data - The data to populate the table.
 * @returns {JSX.Element} - A JSX element representing the interactive table.
 */
const InteractiveTable = ({ data, onRowClick }) => {
    // Get the columns to be displayed in the table.
    const columnsToShow = data?.length > 0 ? Object.keys(data[0]) : [];

    // State to maintain the visibility of columns.
    const [columnVisibility, setColumnVisibility] = useState(() => {
        return columnsToShow.reduce((visibility, column) => {
            visibility[column] = true;
            return visibility;
        }, {});
    });

    /**
     * Toggle the visibility of a column.
     * @param {string} columnKey - The key of the column to toggle.
     */
    const toggleColumnVisibility = (columnKey) => {
        setColumnVisibility((prevVisibility) => ({
            ...prevVisibility,
            [columnKey]: !prevVisibility[columnKey],
        }));
    };

    /**
     * Reset the visibility of all columns.
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
     * Format function to display boolean values as "Yes" or "No".
     * @param {boolean} value - The boolean value to format.
     * @returns {string} - "Yes" if the value is true, "No" if it's false.
     */
    const formatBooleanValue = (value) => (value ? "Sí" : "No");

    /**
     * Render the table header.
     * @returns {JSX.Element} - A JSX element representing the table header.
     */
    const renderTableHeader = () => (
        <tr>
            {Object.keys(headerMappings).map((column) =>
                columnVisibility[column] && column !== "_id" ? (
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
     * Render the table body.
     * @returns {JSX.Element} - A JSX element representing the table body.
     */
    const renderTableBody = () => {
        if (!data || data.length === 0) {
            return (
                <tr>
                    <td colSpan={Object.keys(headerMappings).length}>
                        No hay colegiados disponibles.
                    </td>
                </tr>
            );
        }

        return data.map((row, rowIndex) => (
            <tr
                key={rowIndex}
                className="fila-sombrada"
                onClick={() => onRowClick(data[rowIndex]._id)}
            >
                {Object.keys(headerMappings).map((column) =>
                    columnVisibility[column] && column !== "_id" ? (
                        <td key={column} className="sticky-column">
                            {typeof row[column] === "boolean" ? (
                                formatBooleanValue(row[column])
                            ) : column === "linkCV" && row[column] ? (
                                <a
                                    href={row[column]}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Descargar
                                </a>
                            ) : column === "dateOfBirth" && row[column] ? (
                                formatDate(row[column])
                            ) : column === "specialties" && row[column] ? (
                                row[column].map((val) => val.name).join(", ")
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
     * Format the date in the "DD/MM/YYYY" format using toLocaleDateString.
     * @param {string} date - The date in string format (e.g., "YYYY-MM-DD").
     * @returns {string} - The date formatted as "DD/MM/YYYY".
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
