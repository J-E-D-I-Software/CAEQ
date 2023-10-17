import React, { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import DropdownInput from '../../components/inputs/DropdownInput/DropdownInput';
import InteractiveTable from "../../components/table/InteractiveTable";
import InputText from "../../components/inputs/TextInput/TextInput";
import { getAllArchitectUsers } from "../../client/ArchitectUser/ArchitectUser.GET";
import PaginationNav from "../../components/pagination/PaginationNav";
import "./directory.scss";
/**
 * Componente que muestra una lista de arquitectos con función de búsqueda.
 * @component
 */
const Directory = () => {
  const [architectUsers, setArchitectUsers] = useState([]);
  const [getArchitect, setArchitect] = useState('');
  const [filterSearchByName, setFilterSearchByName] = useState('');
  const [filterSearchBymunicipalityOfLabor, setFilterSearchBymunicipalityOfLabor] = useState('');
  const [filterSearchByDRONumber, setFilterSearchByDRONumber] = useState('');
  const [filtergender, setFiltergender] = useState('');
  const [filterclassification, setFilterclassification] = useState('');
  const [filtermemberType, setFiltermemberType] = useState('');


  const [paginationPage, setPaginationPage] = useState(1);
  const navigate = useNavigate();


  const handleRowClick = (id) => {
    // Utiliza navigate para redirigir a la página de detalles del directorio
    navigate(`/Directorio/${id}`);
  };

  /**
   * Efecto que se ejecuta al cargar el componente para obtener la lista completa de arquitectos.
   */


  useEffect(() => {
    (async () => {
      try {
        let filters = "";
        if (filterSearchByName) filters = `fullName[regex]=${filterSearchByName}`;
        if (filterSearchBymunicipalityOfLabor) filters += `&municipalityOfLabor[regex]=${filterSearchBymunicipalityOfLabor}`;
        if (filterSearchByDRONumber) filters += `&DRONumber[regex]=${filterSearchByDRONumber}`;
        if (filtergender) filters += `&gender=${filtergender}`;
        if (filterclassification) filters += `&classification=${filterclassification}`;
        if (filtermemberType) filters += `&memberType=${filtermemberType}`;




        const architects = await getAllArchitectUsers(paginationPage, filters);
        setArchitectUsers(architects);
      } catch (error) {
      }
    })();
  }, [paginationPage, filterSearchByName, filterSearchBymunicipalityOfLabor, filterSearchByDRONumber, filtergender, filterclassification, filtermemberType]);

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

  // Filtrar y excluir la última columna antes de pasar los datos a InteractiveTable
  const tablefilteredArchitects = filteredArchitects
  /*.map(
    ({ _id, ...rest }) => rest
  );*/
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

  const handlePreviousPage = () => {
    if (paginationPage > 1) {
      setPaginationPage(paginationPage - 1);
    }
  };

  /**
   * Maneja la acción de avanzar a la siguiente página en la paginación.
   */
  const handleNextPage = () => {
    setPaginationPage(paginationPage + 1);
  };

  return (
      console.log("this is", tablefilteredArchitects[0]),
      (
          <div className="directory">
              <div className="directory-row directory-header">
                  <h1>Directorio de arquitectos</h1>
              </div>

              <DropdownInput
                  getVal={filtergender}
                  setVal={setFiltergender}
                  options={["Hombre", "Mujer", "Prefiero no decirlo"]}
                  placeholder="Filtrar género"
              />

              <DropdownInput
                  getVal={filterclassification}
                  setVal={setFilterclassification}
                  options={["Expresidente", "Docente", "Convenio"]}
                  placeholder="Filtrar clasificación"
              />

              <DropdownInput
                  getVal={filtermemberType}
                  setVal={setFiltermemberType}
                  options={[
                      "Miembro de número",
                      "Miembro Adherente",
                      "Miembro Pasante",
                      "Miembro Vitalicio",
                      "Miembro Honorario",
                  ]}
                  placeholder="Filtrar tipo de miembro"
              />

              <InputText
                  placeholder="Nombre del colegiado"
                  getVal={filterSearchByName}
                  setVal={setFilterSearchByName}
              />

              <InputText
                  placeholder="Municipio"
                  getVal={filterSearchBymunicipalityOfLabor}
                  setVal={setFilterSearchBymunicipalityOfLabor}
              />
              <InputText
                  placeholder="Número de DRO"
                  getVal={filterSearchByDRONumber}
                  setVal={setFilterSearchByDRONumber}
              />

              <div className="directory-row">
                  {filteredArchitects.length > 0 ? (
                      <div className="box-container">
                          <InteractiveTable
                              data={filteredArchitects}
                              onRowClick={handleRowClick}
                          />
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
      )
  );
};

export default Directory;
