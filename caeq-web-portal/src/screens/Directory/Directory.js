/*import React, { useState, useEffect } from "react";
import InteractiveTable from "../../components/table/InteractiveTable";
import InputText from "../../components/inputs/TextInput/TextInput";
import { getAllArchitectUsers } from "../../client/ArchitectUser/ArchitectUser.GET";
import PaginationNav from "../../components/pagination/PaginationNav";
import "./directory.scss";
/**
 * Componente que muestra una lista de arquitectos con función de búsqueda.
 * @component
 */
/*const Directory = () => {
  const [architectUsers, setArchitectUsers] = useState([]);
  const [getArchitect, setArchitect] = useState("");
  const [paginationPage, setPaginationPage] = useState(1);

  /**
   * Efecto que se ejecuta al cargar el componente para obtener la lista completa de arquitectos.
   */

  /*useEffect(() => {
    (async () => {
      try {
        let filters = "";
        const architects = await getAllArchitectUsers(paginationPage, filters);
        setArchitectUsers(architects);
      } catch (error) {}
    })();
  }, [paginationPage]);
  /**
   * Función que filtra los arquitectos en función del texto de búsqueda.
   * @param {Object[]} data - La lista de arquitectos completa.
   * @param {string} searchText - El texto de búsqueda.
   * @returns {Object[]} - La lista de arquitectos filtrada.
   */
  /*const filterArchitects = (data, searchText) => {
    // Filtrar los arquitectos en función del texto de búsqueda
    return data.filter((architect) => {
      // Convertir todos los valores de los arquitectos en cadenas de texto
      const architectValues = Object.values(architect).map((value) =>
        String(value).toLowerCase()
      );
      // Verificar si algún valor contiene el texto de búsqueda
      return architectValues.some((value) =>
        value.includes(searchText.toLowerCase())
      );
    });
  };

  // Filtrar los arquitectos en función del texto de búsqueda
  const filteredArchitects = filterArchitects(architectUsers, getArchitect);

  const columnsToShow =
    filteredArchitects?.length > 0 ? Object.keys(filteredArchitects[0]) : [];

  if (columnsToShow.length > 1) {
    filteredArchitects.forEach((architect) => {
      // Elimina la última propiedad de cada objeto arquitecto
      delete architect[columnsToShow[columnsToShow.length - 1]];
    });
  }

  /**
   * Maneja la acción de retroceder a la página anterior en la paginación.
   */

  /*const handlePreviousPage = () => {
    if (paginationPage > 1) {
      setPaginationPage(paginationPage - 1);
    }
  };

  /**
   * Maneja la acción de avanzar a la siguiente página en la paginación.
   */
  /*const handleNextPage = () => {
    setPaginationPage(paginationPage + 1);
  };

  return (
    <div className="directory">
      <div className="directory-row directory-header">
        <h1>Directorio de arquitectos</h1>
      </div>
      <label>
        <InputText
          getVal={getArchitect}
          setVal={setArchitect}
          placeholder="Buscar"
        />
      </label>

      <div className="directory-row">
        {filteredArchitects.length > 0 ? (
          <div className="box-container">
            <InteractiveTable data={filteredArchitects} />
          </div>
        ) : (
          <p className="no-data-message">No hay colegiados disponibles</p>
        )}
      </div>

      <div className="directory-row directory-pagination">
        <PaginationNav
          onClickBefore={handlePreviousPage}
          onClickAfter={handleNextPage}
          page={paginationPage}
        />
      </div>
    </div>
  );
};

export default Directory;*/