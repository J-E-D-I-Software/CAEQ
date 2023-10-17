import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DropdownInput from '../../components/inputs/DropdownInput/DropdownInput';
import InteractiveTable from '../../components/table/InteractiveTable';
import InputText from '../../components/inputs/TextInput/TextInput';
import InputNumber from '../../components/inputs/NumberInput/NumberInput.jsx';
import { getAllArchitectUsers } from '../../client/ArchitectUser/ArchitectUser.GET';
import PaginationNav from '../../components/pagination/PaginationNav';
import headerMappings from '../../components/table/HeaderMappings';
import { exportToExcel } from 'react-json-to-excel';
import './directory.scss';

const Directory = () => {
    const [architectUsers, setArchitectUsers] = useState([]);
    const [filterSearchByName, setFilterSearchByName] = useState('');
    const [filterSearchBymunicipalityOfLabor, setFilterSearchBymunicipalityOfLabor] =
        useState('');
    const [filterSearchByDRONumber, setFilterSearchByDRONumber] = useState('');
    const [filtergender, setFiltergender] = useState('');
    const [filterclassification, setFilterclassification] = useState('');
    const [filtermemberType, setFiltermemberType] = useState('');
    const [paginationPage, setPaginationPage] = useState(1);
    const navigate = useNavigate();

    const handleRowClick = (id) => {
        navigate(`/Directorio/${id}`);
    };

    const calculateFilters = () => {
        let filters = '';
        if (filterSearchByName) filters = `fullName[regex]=${filterSearchByName}`;
        if (filterSearchBymunicipalityOfLabor)
            filters += `&municipalityOfLabor[regex]=${filterSearchBymunicipalityOfLabor}`;
        if (filterSearchByDRONumber)
            filters += `&DRONumber[regex]=${filterSearchByDRONumber}`;
        if (filtergender) filters += `&gender=${filtergender}`;
        if (filterclassification) filters += `&classification=${filterclassification}`;
        if (filtermemberType) filters += `&memberType=${filtermemberType}`;
        return filters;
    };

    useEffect(() => {
        (async () => {
            try {
                const filters = calculateFilters();
                const architects = await getAllArchitectUsers(paginationPage, filters);
                setArchitectUsers(architects);
            } catch (error) {
                // Handle error
            }
        })();
    }, [
        paginationPage,
        filterSearchByName,
        filterSearchBymunicipalityOfLabor,
        filterSearchByDRONumber,
        filtergender,
        filterclassification,
        filtermemberType,
    ]);

    const handlePreviousPage = () => {
        if (paginationPage > 1) {
            setPaginationPage(paginationPage - 1);
        }
    };

    const handleNextPage = () => {
        setPaginationPage(paginationPage + 1);
    };

    const handleDownload = async () => {
        const filters = calculateFilters();
        const architects = await getAllArchitectUsers(paginationPage, filters, 10000);

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

        exportToExcel(architectsDownload, 'seleccion-arquitectos', false);
    };

    return (
        <div className='directory'>
            <div className='directory-row directory-header'>
                <h1>Directorio de arquitectos</h1>
            </div>
            <button onClick={() => handleDownload()}>Descargar arquitectos</button>

            <DropdownInput
                getVal={filtergender}
                setVal={setFiltergender}
                options={['Hombre', 'Mujer', 'Prefiero no decirlo']}
                placeholder='Filtrar género'
            />

            <DropdownInput
                getVal={filterclassification}
                setVal={setFilterclassification}
                options={['Expresidente', 'Docente', 'Convenio']}
                placeholder='Filtrar clasificación'
            />

            <DropdownInput
                getVal={filtermemberType}
                setVal={setFiltermemberType}
                options={[
                    'Miembro de número',
                    'Miembro Adherente',
                    'Miembro Pasante',
                    'Miembro Vitalicio',
                    'Miembro Honorario',
                ]}
                placeholder='Filtrar tipo de miembro'
            />

            <InputText
                placeholder='Nombre del colegiado'
                getVal={filterSearchByName}
                setVal={setFilterSearchByName}
            />

            <InputText
                placeholder='Municipio'
                getVal={filterSearchBymunicipalityOfLabor}
                setVal={setFilterSearchBymunicipalityOfLabor}
            />
            <InputText
                placeholder='Número de DRO'
                getVal={filterSearchByDRONumber}
                setVal={setFilterSearchByDRONumber}
            />
            <InputNumber
                placeholder='Rango de año de nacimiento inicial'
                getVal={filterSearchBymunicipalityOfLabor}
                setVal={setFilterSearchBymunicipalityOfLabor}
            />
            <InputNumber
                placeholder='Rango de año de nacimiento final'
                getVal={filterSearchByDRONumber}
                setVal={setFilterSearchByDRONumber}
            />

            <div className='directory-row'>
                {architectUsers.length > 0 ? (
                    <div className='box-container'>
                        <InteractiveTable
                            data={architectUsers}
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
    );
};

export default Directory;
