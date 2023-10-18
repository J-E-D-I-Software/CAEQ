import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DropdownInput from "../../components/inputs/DropdownInput/DropdownInput";
import InteractiveTable from "../../components/table/InteractiveTable";
import InputText from "../../components/inputs/TextInput/TextInput";
import InputNumber from "../../components/inputs/NumberInput/NumberInput.jsx";
import { getAllArchitectUsers } from "../../client/ArchitectUser/ArchitectUser.GET";
import { getAllSpecialties } from "../../client/Specialties/Specialties.GET";
import PaginationNav from "../../components/pagination/PaginationNav";
import headerMappings from "../../components/table/HeaderMappings";
import DateInput from "../../components/inputs/DateInput/DateInput";
import { exportToExcel } from "react-json-to-excel";
import BaseButton from "../../components/buttons/BaseButton";
import "./directory.scss";

const Directory = () => {
    const [architectUsers, setArchitectUsers] = useState([]);
    const [filterSearchByName, setFilterSearchByName] = useState("");
    const [filterSearchBymunicipalityOfLabor, setFilterSearchBymunicipalityOfLabor] =
        useState("");
    const [filterSearchByDRONumber, setFilterSearchByDRONumber] = useState("");
    const [filtergender, setFiltergender] = useState("");
    const [filterclassification, setFilterclassification] = useState("");
    const [filtermemberType, setFiltermemberType] = useState("");
    const [paginationPage, setPaginationPage] = useState(1);
    const [admisionInitial, setAdmisionInitial] = useState();
    const [admisionFinal, setAdmisionFinal] = useState();
    const [birthInitial, setBirthInitial] = useState();
    const [birthFinal, setBirthFinal] = useState();
    const [specialties, setSpecialties] = useState([]);
    const [specialtiesName, setSpecialtiesName] = useState([]);
    const [specialty, setSpecialty] = useState("");
    const [specialtyName, setSpecialtyName] = useState("");
    const [orderBy, setOrderBy] = useState("collegiateNumber");
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
        let filters = "";
        if (filterSearchByName) filters = `fullName[regex]=${filterSearchByName}`;
        if (filterSearchBymunicipalityOfLabor)
            filters += `&municipalityOfLabor[regex]=${filterSearchBymunicipalityOfLabor}`;
        if (filterSearchByDRONumber)
            filters += `&DRONumber[regex]=${filterSearchByDRONumber}`;
        if (filtergender) filters += `&gender=${filtergender}`;
        if (filterclassification) filters += `&classification=${filterclassification}`;
        if (filtermemberType) filters += `&memberType=${filtermemberType}`;
        if (admisionInitial) filters += `&dateOfAdmission[gte]=${admisionInitial}`;
        if (admisionFinal) filters += `&dateOfAdmission[lte]=${admisionFinal}`;
        if (birthInitial) filters += `&dateOfBirth[gte]=${birthInitial}`;
        if (birthFinal) filters += `&dateOfBirth[lte]=${birthFinal}`;
        if (specialty) filters += `&specialties=${specialty}`;
        return filters;
    };

    useEffect(() => {
        (async () => {
            const effectiveOrderBy = orderBy || "collegiateNumber";
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
    }, [
        paginationPage,
        filterSearchByName,
        filterSearchBymunicipalityOfLabor,
        filterSearchByDRONumber,
        filtergender,
        filterclassification,
        filtermemberType,
        admisionFinal,
        admisionInitial,
        birthFinal,
        birthInitial,
        specialty,
        orderBy,
    ]);

    useEffect(() => {
        (async () => {
            try {
                const specialties = await getAllSpecialties();

                setSpecialtiesName(specialties.map((val) => val.name));
                setSpecialties(specialties);
            } catch (error) {
                // Handle error
            }
        })();
    }, []);

    /**
     * Handle clicking the "Previous Page" button to navigate to the previous page of results.
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
     * Handle clicking the "Next Page" button to navigate to the next page of results.
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
        const filters = calculateFilters();
        const architects = await getAllArchitectUsers(paginationPage, filters, 10000);

        const architectsDownload = architects.map((val) => {
            delete val._id;

            // Create a new object with mapped headers
            const mappedObject = {};
            for (const key in val) {
                if (headerMappings[key]) {
                    mappedObject[headerMappings[key]] = val[key];

                    if (
                        typeof mappedObject[headerMappings[key]] === "boolean" &&
                        mappedObject[headerMappings[key]] === true
                    ) {
                        mappedObject[headerMappings[key]] = "Si";
                    } else if (
                        typeof mappedObject[headerMappings[key]] === "boolean" &&
                        mappedObject[headerMappings[key]] === false
                    ) {
                        mappedObject[headerMappings[key]] = "No";
                    } else if (key === "specialties") {
                        mappedObject[headerMappings[key]] = val[key]
                            .map((val) => val.name)
                            .join(", ");
                    }
                }
            }

            return mappedObject;
        });

        exportToExcel(architectsDownload, "seleccion-arquitectos", false);
    };

    /**
     * Handle a change in specialty selection.
     *
     * @param {string|null} specialty - The selected specialty name, or null if no specialty is selected.
     * @returns {void}
     */
    const handleSpecialtyChange = (specialty) => {
        if (!specialty) {
            setSpecialty("");
            setSpecialtyName("");
            return;
        }

        setSpecialtyName(specialty);

        const specialtyId = specialties.filter((val) => val.name === specialty)[0]._id;

        setSpecialty(specialtyId);
    };

    const clearFilters = () => {
        setFilterSearchByName("");
        setFilterSearchBymunicipalityOfLabor("");
        setFilterSearchByDRONumber("");
        setFiltergender("");
        setFilterclassification("");
        setFiltermemberType("");
        setAdmisionInitial("");
        setAdmisionFinal("");
        setBirthInitial("");
        setBirthFinal("");
        setSpecialty("");
        setSpecialtyName("");
        setOrderBy("collegiateNumber");
    };

    const handleClearFilters = () => {
        clearFilters();
    };

    return (
        <div className="directory">
            <div className="directory-header">
                <h1 className="directory-title">Directorio de arquitectos</h1>
                <BaseButton onClick={() => handleDownload()} type="primary">
                    Descargar arquitectos
                </BaseButton>
                <BaseButton onClick={() => handleClearFilters()} type="secondary">
                    Limpiar filtros
                </BaseButton>
            </div>

            <div className="filter-container">
                <div className="searchbars-column">
                    <div className="inputText-filters">
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
                    </div>
                </div>

                <div className="DropdownInputs-row">
                    <DropdownInput
                        getVal={filtergender}
                        setVal={setFiltergender}
                        options={["Hombre", "Mujer", "Prefiero no decirlo"]}
                        placeholder="Género"
                    />
                    <DropdownInput
                        getVal={filterclassification}
                        setVal={setFilterclassification}
                        options={["Expresidente", "Docente", "Convenio"]}
                        placeholder="Clasificación"
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
                        placeholder="Tipo de miembro"
                    />
                    <DropdownInput
                        getVal={specialtyName}
                        setVal={(specialty) => handleSpecialtyChange(specialty)}
                        options={specialtiesName}
                        placeholder="Especialidad"
                    />
                </div>
            </div>

            <br />

            <div className="inputNumber-date-row">
                <div className="inputNumber-row">
                    <h3> Año de admisión </h3>
                    <InputNumber
                        placeholder="Admitido después de:"
                        getVal={admisionInitial}
                        setVal={setAdmisionInitial}
                    />
                    <InputNumber
                        placeholder="Admitido antes de:"
                        getVal={admisionFinal}
                        setVal={setAdmisionFinal}
                    />
                </div>
                <div className="DateInput-row">
                    <h3> Fecha de nacimiento </h3>
                    <DateInput
                        placeholder="Nacido después de:"
                        getVal={birthInitial}
                        setVal={setBirthInitial}
                    />
                    <DateInput
                        placeholder="Nacido antes de:"
                        getVal={birthFinal}
                        setVal={setBirthFinal}
                    />
                </div>
            </div>

            <br />

            <div className="directory-row">
                {architectUsers.length > 0 ? (
                    <div className="box-container">
                        <InteractiveTable
                            data={architectUsers}
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
    );
};

export default Directory;
