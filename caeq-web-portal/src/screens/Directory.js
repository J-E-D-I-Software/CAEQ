import React, { useState, useEffect } from "react";
import InteractiveTable from "../components/table/InteractiveTable";
import InputText from "../components/inputs/TextInput/TextInput";
import { getAllArchitectUsers } from "../client/ArchitectUser/ArchitectUser.GET";
import '../styles/directory.scss'
/**
 * Componente que muestra una lista de arquitectos con función de búsqueda.
 * @component
 */
const Directory = () => {
  /** Estado que almacena la lista completa de arquitectos. */
  const [architectUsers, setArchitectUsers] = useState([]);
  
  /** Estado que almacena el texto de búsqueda del usuario. */
  const [getArchitect, setArchitect] = useState('');

  /**
   * Efecto que se ejecuta al cargar el componente para obtener la lista completa de arquitectos.
   */
  useEffect(() => {
    (async () => {
      try {
        const architects = await getAllArchitectUsers();
        setArchitectUsers(architects);
      } catch (error) {

      }
    })();
  }, []);

  /**
   * Función que filtra los arquitectos en función del texto de búsqueda.
   * @param {Object[]} data - La lista de arquitectos completa.
   * @param {string} searchText - El texto de búsqueda.
   * @returns {Object[]} - La lista de arquitectos filtrada.
   */
  const filterArchitects = (data, searchText) => {
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

  // Filtrar y excluir la primera columna ('id') antes de pasar los datos a InteractiveTable
  const tablefilteredArchitects = filteredArchitects.map(({ _id, ...rest }) => rest);

  return (
  <div className="directory">
    <label>
      <InputText
        getVal={getArchitect}
        setVal={setArchitect}
        placeholder="Buscar"
      />
    </label>
    <div className="directory-row">
      {filteredArchitects.length > 0 && (
        <div className="box-container">
          <InteractiveTable data={tablefilteredArchitects} />
        </div>
      )}
    </div>
  </div>

  );
};

export default Directory;
