import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DropdownInput from '../../components/inputs/DropdownInput/DropdownInput';
import InteractiveTable from '../../components/table/InteractiveTable';
import InputText from '../../components/inputs/TextInput/TextInput';
import InputNumber from '../../components/inputs/NumberInput/NumberInput.jsx';
import { getAllArchitectUsers } from '../../client/ArchitectUser/ArchitectUser.GET';
import { getAllSpecialties } from '../../client/Specialties/Specialties.GET';
import PaginationNav from '../../components/pagination/PaginationNav';
import headerMappings from '../../components/table/HeaderMappings';
import DateInput from '../../components/inputs/DateInput/DateInput';
import { exportToExcel } from 'react-json-to-excel';
import BaseButton from '../../components/buttons/BaseButton';
import { FireSucess, FireLoading, FireError } from '../../utils/alertHandler';
import './directory.scss';

/**
 * The Directory component displays a directory of architects with filtering options and pagination.
 * It allows users to search for architects, apply filters, and navigate through the results.
 *
 * @component
 */
const Directory = () => {
    const [architectUsers, setArchitectUsers] = useState([]);
    const [filterSearchByName, setFilterSearchByName] = useState('');
    const [
        filterSearchBymunicipalityOfLabor,
        setFilterSearchBymunicipalityOfLabor,
    ] = useState('');
    const [filterSearchBycollegiateNumber, setFilterSearchBycollegiateNumber] =
        useState('');
    const [filterGender, setfilterGender] = useState('');
    const [filterClassification, setfilterClassification] = useState('');
    const [FilterMemberType, setFilterMemberType] = useState('');
    const [paginationPage, setPaginationPage] = useState(1);
    const [admisionInitial, setAdmisionInitial] = useState(0);
    const [admisionFinal, setAdmisionFinal] = useState(2024);
    const [birthInitial, setBirthInitial] = useState();
    const [birthFinal, setBirthFinal] = useState();
    const [specialties, setSpecialties] = useState([]);
    const [specialtiesName, setSpecialtiesName] = useState([]);
    const [specialty, setSpecialty] = useState('');
    const [specialtyName, setSpecialtyName] = useState('');
    const [currentRights, setCurrentRights] = useState('');
    const [orderBy, setOrderBy] = useState('collegiateNumber');
    const navigate = useNavigate();
    /**
     * Handle a row click event by navigating to a directory page with the specified ID.
     *
     * @param {string} id - The ID of the directory item to navigate to.
     * @returns {void}
     */
    const handleRowClick = (id) => {
        navigate(`/Directorio/${id}`);
    };

    /**
     * Calculate filters for searching directory items.
     *
     * @returns {string} The query string containing filters.
     */
    const calculateFilters = () => {
        if (
            admisionFinal < admisionInitial ||
            birthFinal === null ||
            birthInitial === null
        ) {
            FireError(
                'No es posible ingresar un rango de fecha de admisión con la fecha límite menor a la de inicio.'
            );
            return '';
        }
        if (birthFinal < birthInitial) {
            FireError(
                'No es posible ingresar un rango de fecha de nacimiento con la fecha limite menor a la de inicio.'
            );
            return '';
        }

        let filters = '';

        if (filterSearchByName)
            filters = `fullName[regex]=${filterSearchByName}`;
        if (filterSearchBymunicipalityOfLabor)
            filters += `&municipalityOfLabor[regex]=${filterSearchBymunicipalityOfLabor}`;
        if (filterSearchBycollegiateNumber)
            filters += `&collegiateNumber=${filterSearchBycollegiateNumber}`;

        if (filterGender) filters += `&gender=${filterGender}`;
        if (filterClassification)
            filters += `&classification=${filterClassification}`;
        if (FilterMemberType) filters += `&memberType=${FilterMemberType}`;
        if (admisionInitial)
            filters += `&dateOfAdmission[gte]=${admisionInitial}`;
        if (admisionFinal) filters += `&dateOfAdmission[lte]=${admisionFinal}`;
        if (birthInitial) filters += `&dateOfBirth[gte]=${birthInitial}`;
        if (birthFinal) filters += `&dateOfBirth[lte]=${birthFinal}`;
        if (specialty) filters += `&specialties=${specialty}`;
        if (currentRights) filters += `&currentRights=${currentRights}`;

        return filters;
    };

    useEffect(() => {
        (async () => {
            setPaginationPage(1);
            const effectiveOrderBy = orderBy || 'collegiateNumber';
            try {
                const filters = calculateFilters();
                const architects = await getAllArchitectUsers(
                    1,
                    filters,
                    effectiveOrderBy
                );

                setArchitectUsers(architects);
            } catch (error) {
                // Handle error
            }
        })();
    }, [
        filterSearchByName,
        filterSearchBymunicipalityOfLabor,
        filterSearchBycollegiateNumber,
        filterGender,
        filterClassification,
        FilterMemberType,
        admisionFinal,
        admisionInitial,
        birthFinal,
        birthInitial,
        specialty,
        currentRights,
        orderBy,
    ]);

    useEffect(() => {
        (async () => {
            try {
                const specialties = await getAllSpecialties();

                setSpecialties(specialties);

                setSpecialtiesName(
                    specialties.map((specialty) => specialty.name)
                );
            } catch (error) {}
        })();
    }, []);

    useEffect(() => {
        (async () => {
            const effectiveOrderBy = orderBy || 'collegiateNumber';
            try {
                const filters = calculateFilters();
                const architects = await getAllArchitectUsers(
                    paginationPage,
                    filters,
                    effectiveOrderBy
                );
                setArchitectUsers(architects);
            } catch (error) {
                // Handle error
            }
        })();
    }, [paginationPage]);

    /**
     * Handle clicking the 'Previous Page' button to navigate to the previous page of results.
     * Decrements the pagination page if it's greater than 1.
     *
     * @returns {void}
     */
    const handlePreviousPage = () => {
        if (paginationPage > 1) {
            setPaginationPage(paginationPage - 1);
        }
    };

    /**
     * Handle clicking the 'Next Page' button to navigate to the next page of results.
     * Increments the pagination page.
     *
     * @returns {void}
     */
    const handleNextPage = () => {
        setPaginationPage(paginationPage + 1);
    };

    /**
     * Handle downloading data based on specified filters and export it to an Excel file.
     * Calls the `getAllArchitectUsers` function to retrieve architects' data.
     * Maps and processes the data and then exports it to Excel.
     *
     * @returns {Promise<void>} A Promise that resolves when the download is complete.
     */
    const handleDownload = async () => {
        const swal = FireLoading('Generando archivo de Excel...');

        const filters = calculateFilters();
        const architects = await getAllArchitectUsers(1, filters, 100000);

        const architectsDownload = architects.map((val) => {
            delete val._id;

            // Create a new object with mapped headers
            const mappedObject = {};
            for (const key in val) {
                if (headerMappings[key]) {
                    mappedObject[headerMappings[key]] = val[key];

                    if (
                        typeof mappedObject[headerMappings[key]] ===
                            'boolean' &&
                        mappedObject[headerMappings[key]] === true
                    ) {
                        mappedObject[headerMappings[key]] = 'Si';
                    } else if (
                        typeof mappedObject[headerMappings[key]] ===
                            'boolean' &&
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

        swal.close();
        FireSucess('La descarga se iniciará en breve.');

        exportToExcel(architectsDownload, 'seleccion-arquitectos', false);
    };

    /**
     * Handle a change in specialty selection.
     *
     * @param {string|null} specialty - The selected specialty name, or null if no specialty is selected.
     * @returns {void}
     */
    const handleSpecialtyChange = (specialty) => {
        if (!specialty) {
            setSpecialty('');
            setSpecialtyName('');
            return;
        }

        setSpecialtyName(specialty);

        const specialtyId = specialties.filter(
            (val) => val.name === specialty
        )[0]._id;

        setSpecialty(specialtyId);
    };

    const clearFilters = () => {
        setFilterSearchByName('');
        setFilterSearchBymunicipalityOfLabor('');
        setFilterSearchBycollegiateNumber('');
        setfilterGender('');
        setfilterClassification('');
        setFilterMemberType('');
        setAdmisionInitial('');
        setAdmisionFinal('');
        setBirthInitial('');
        setBirthFinal('');
        setSpecialty('');
        setSpecialtyName('');
        setOrderBy('collegiateNumber');
    };

    const handleClearFilters = () => {
        clearFilters();
        window.location.reload();
    };

    return (
        <div className='directory'>
            <div className='directory-header'>
                <h1 className='directory-title'>Directorio de arquitectos</h1>
                <BaseButton onClick={() => handleDownload()} type='primary'>
                    Descargar arquitectos
                </BaseButton>
                <BaseButton
                    onClick={() => handleClearFilters()}
                    type='secondary'
                >
                    Limpiar filtros
                </BaseButton>
            </div>

            <div className='filter-container'>
                <div className='searchbars-column'>
                    <div className='inputText-filters'>
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
                            placeholder='Número de colegiado'
                            getVal={filterSearchBycollegiateNumber}
                            setVal={setFilterSearchBycollegiateNumber}
                        />
                    </div>
                </div>

                <div className='DropdownInputs-row'>
                    <DropdownInput
                        getVal={filterGender}
                        setVal={setfilterGender}
                        options={['Hombre', 'Mujer', 'Prefiero no decirlo']}
                        placeholder='Género'
                    />
                    <DropdownInput
                        getVal={filterClassification}
                        setVal={setfilterClassification}
                        options={[
                            'Expresidente',
                            'Docente',
                            'Convenio',
                            'Ninguno',
                        ]}
                        placeholder='Clasificación'
                    />

                    <div className='DropdownInputs-row'>
                        <DropdownInput
                            getVal={FilterMemberType}
                            setVal={setFilterMemberType}
                            options={[
                                'Miembro de número',
                                'Miembro Adherente',
                                'Miembro Pasante',
                                'Miembro Vitalicio',
                                'Miembro Honorario',
                            ]}
                            placeholder='Tipo de miembro'
                        />
                        <DropdownInput
                            getVal={specialtyName}
                            setVal={(specialty) =>
                                handleSpecialtyChange(specialty)
                            }
                            options={specialtiesName}
                            placeholder='Especialidad'
                        />
                    </div>
                </div>
            </div>

            <br />
            <div className='inputNumber-date-row'>
                <div className='InputContainer'>
                    <div className='Input-title'>
                        <h3> Año de admisión </h3>
                    </div>
                    <div className='Input-row'>
                        <InputNumber
                            placeholder='Admitido después de:'
                            getVal={admisionInitial}
                            setVal={setAdmisionInitial}
                        />
                        <InputNumber
                            placeholder='Admitido antes de:'
                            getVal={admisionFinal}
                            setVal={setAdmisionFinal}
                        />
                    </div>
                </div>

                <div className='DateInput-container'>
                    <div className='DateInput-title'>
                        <h3> Fecha de nacimiento </h3>
                    </div>
                    <div className='DateInput-row'>
                        <DateInput
                            placeholder='Nacido después de:'
                            getVal={birthInitial}
                            setVal={setBirthInitial}
                        />
                        <DateInput
                            placeholder='Nacido antes de:'
                            getVal={birthFinal}
                            setVal={setBirthFinal}
                        />
                    </div>
                </div>
            </div>
            <br />
            <div className='DateInput-row'>
                <DropdownInput
                    getVal={currentRights}
                    setVal={setCurrentRights}
                    options={[true, false]}
                    placeholder='Derechos vigentes'
                />
            </div>

            <br />

            <div className='directory-row directory-pagination'>
                <PaginationNav
                    onClickBefore={handlePreviousPage}
                    onClickAfter={handleNextPage}
                    page={paginationPage}
                />
            </div>

            <div className='directory-row'>
                {architectUsers.length > 0 ? (
                    <div className='box-container'>
                        <InteractiveTable
                            data={architectUsers}
                            onRowClick={handleRowClick}
                        />
                    </div>
                ) : (
                    <p className='no-data-message'>
                        No hay colegiados disponibles
                    </p>
                )}
            </div>
        </div>
    );
};

export default Directory;
