import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DropdownInput from '../../components/inputs/DropdownInput/DropdownInput';
import InteractiveTable from "../../components/table/InteractiveTable";
import InputText from "../../components/inputs/TextInput/TextInput";
import { getAllArchitectUsers } from "../../client/ArchitectUser/ArchitectUser.GET";
import PaginationNav from "../../components/pagination/PaginationNav";
import "./directory.scss";

const Directory = () => {
  const [architectUsers, setArchitectUsers] = useState([]);
  const [filterSearchByName, setFilterSearchByName] = useState('');
  const [filterSearchBymunicipalityOfLabor, setFilterSearchBymunicipalityOfLabor] = useState('');
  const [filterSearchByDRONumber, setFilterSearchByDRONumber] = useState('');
  const [filtergender, setFiltergender] = useState('');
  const [filterclassification, setFilterclassification] = useState('');
  const [filtermemberType, setFiltermemberType] = useState('');
  const [paginationPage, setPaginationPage] = useState(1);
  const navigate = useNavigate();

  const handleRowClick = (id) => {
    navigate(`/Directorio/${id}`);
  };

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
        // Handle error
      }
    })();
  }, [paginationPage, filterSearchByName, filterSearchBymunicipalityOfLabor, filterSearchByDRONumber, filtergender, filterclassification, filtermemberType]);

  const handlePreviousPage = () => {
    if (paginationPage > 1) {
      setPaginationPage(paginationPage - 1);
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

    const handleDownload = async () => {
        const architects = await getAllArchitectUsers(paginationPage, '', 10000);

        console.log(architects);

        const architectsDownload = architects.map((val) => {
            delete val._id;

            // Create a new object with mapped headers
            const mappedObject = {};
            for (const key in val) {
                if (headerMappings[key]) {
                    mappedObject[headerMappings[key]] = val[key];

                    if (
                        typeof mappedObject[headerMappings[key]] === 'boolean' &&
                        mappedObject[headerMappings[key]] === true
                    ) {
                        mappedObject[headerMappings[key]] = 'Si';
                    } else if (
                        typeof mappedObject[headerMappings[key]] === 'boolean' &&
                        mappedObject[headerMappings[key]] === false
                    ) {
                        mappedObject[headerMappings[key]] = 'No';
                    } else if (key === 'specialties') {
                        mappedObject[headerMappings[key]] = val[key]
                            .map((val) => val.name)
                            .join(', ');
                    }
                }
            }

            return mappedObject;
        });

        console.log(architectsDownload);

        exportToExcel(architectsDownload, 'seleccion-arquitectos', false);
    };

    return (
        console.log('this is', tablefilteredArchitects[0]),
        (
            <div className='directory'>
                <div className='directory-row directory-header'>
                    <h1>Directorio de arquitectos</h1>
                </div>
                <button onClick={() => handleDownload()}>Descargar arquitectos</button>
                <label>
                    <InputText
                        getVal={getArchitect}
                        setVal={setArchitect}
                        placeholder='Buscar'
                    />
                </label>

                <div className='directory-row'>
                    {filteredArchitects.length > 0 ? (
                        <div className='box-container'>
                            <InteractiveTable
                                data={filteredArchitects}
                                onRowClick={handleRowClick}
                            />
                        </div>
                    ) : (
                        <p className='no-data-message'>No hay colegiados disponibles</p>
                    )}
                </div>

                <div className='directory-row directory-pagination'>
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
