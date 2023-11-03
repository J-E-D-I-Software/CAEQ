import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getArchitectUserById } from '../../client/ArchitectUser/ArchitectUser.GET';
import { FireError, FireLoading, FireSucess } from '../../utils/alertHandler';
import { getAllSpecialties } from '../../client/Specialties/Specialties.GET';
import SelectInputComponent from '../../components/inputs/SelectInput/SelectInput';
import TextInput from '../../components/inputs/TextInput/TextInput';
import './DirectoryArchitectDetail.scss';
import FileInput from '../../components/inputs/FileInput/FileInput';
import BaseButton from '../../components/buttons/BaseButton';
import { updateArchitectUserByID } from '../../client/ArchitectUser/ArchitecUser.PATCH';
import DropdownInput from '../../components/inputs/DropdownInput/DropdownInput';
import { getAttendancesByArchitect } from '../../client/Attendees/Attendees.GET';
import AttendancesComponent from '../../components/attendeesButton/AttendeesButton';

import {
    memberOptions,
    authorizationOptions,
    classificationOptions,
    lifeInsuranceOptions,
    anuuityOptions,
} from '../../components/DirectoryDetailsOptions/DirectoryArchitectDetailOptions';

const ArchitectDetail = (props) => {
    const searchParams = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState({});
    const [editedData, setEditedData] = useState({});

    const [selectedSpecialties, setSelectedSpecialties] = useState([]);
    const [availableSpecialties, setAvailableSpecialties] = useState([]);
    const [attendances, setAttendances] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const architect = await getArchitectUserById(searchParams.id);

                if (architect.authorizationToShareInfo !== true) {
                    architect.authorizationToShareInfo = 'No';
                } else {
                    architect.authorizationToShareInfo = 'Si';
                }
                if (architect.lifeInsurance !== true) {
                    architect.lifeInsurance = 'No';
                } else {
                    architect.lifeInsurance = 'Si';
                }

                setData(architect);
                setEditedData(architect);

                let specialties = await getAllSpecialties();

                specialties = specialties.map((specialty) => {
                    return { label: specialty.name, value: specialty._id };
                });

                setAvailableSpecialties(specialties);

                setSelectedSpecialties(
                    specialties.filter((specialty) =>
                        architect.specialties.includes(specialty.value)
                    )
                );
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    //Recupera las especialidades de los arquitectos
    useEffect(() => {
        // Mapea las especialidades actuales del arquitecto y elimina las disponibles.
        if (editedData.specialty) {
            const selectedSpecialties = editedData.specialty.map((s) => ({
                value: s,
                label: s,
            }));

            setSelectedSpecialties(selectedSpecialties);
            setAvailableSpecialties((prevSpecialties) =>
                prevSpecialties.filter(
                    (specialty) =>
                        !selectedSpecialties.some(
                            (selected) => selected.value === specialty.value
                        )
                )
            );
        }
    }, [editedData.specialty, selectedSpecialties]);

    useEffect(() => {
        if (searchParams.id) {
            (async () => {
                try {
                    const architectId = searchParams.id;
                    const attendances = await getAttendancesByArchitect(architectId);
                    setAttendances(attendances);
                } catch (error) {
                    console.error('Error al obtener asistencias por arquitecto', error);
                }
            })();
        }
    }, [searchParams.id]);

    const [selectedYear, setSelectedYear] = useState(null);

    const handleYearClick = (year) => {
        setSelectedYear((prevYear) => (prevYear === year ? null : year));
    };

    // Pago de Anualidad pendiente

    /**
     * Handles the save changes functionality for the DirectoryArchitectDetails screen.
     * @async
     * @function handleSaveChanges
     * @param {Event} e - The event object.
     * @returns {Promise<void>}
     */
    const handleSaveChanges = async (e) => {
        const form = new FormData();
        editedData.authorizationToShareInfo =
            editedData.authorizationToShareInfo === 'Si' ? true : false;
        editedData.lifeInsurance = editedData.lifeInsurance === 'Si' ? true : false;

        selectedSpecialties.forEach((specialty, i) => {
            form.append(`specialties[${i}]`, specialty.value);
        });

        form.append('DRONumber', editedData.DRONumber);
        form.append('collegiateNumber', editedData.collegiateNumber);
        form.append('memberType', editedData.memberType);
        form.append('classification', editedData.classification);
        form.append('mainProfessionalActivity', editedData.mainProfessionalActivity);
        form.append('dateOfAdmission', editedData.dateOfAdmission);
        form.append('professionalLicense', editedData.professionalLicense);
        form.append('capacitationHours', editedData.capacitationHours);
        form.append('hoursAttended', editedData.hoursAttended);
        form.append('municipalityOfLabor', editedData.municipalityOfLabor);
        form.append('positionsInCouncil', editedData.positionsInCouncil);
        form.append('authorizationToShareInfo', editedData.authorizationToShareInfo);
        form.append('file', editedData.linkCV);
        form.append('lifeInsurance', editedData.lifeInsurance);
        form.append('lifeInsureID', editedData.lifeInsureID);

        e.preventDefault();

        const swal = FireLoading('Guardando cambios... por favor espere');
        try {
            const response = await updateArchitectUserByID(searchParams.id, form);
            setData(response.data);
            swal.close();
            FireSucess('Los Cambios se han guardado correctamente');
        } catch (error) {
            swal.close();
            FireError(error.response.data.message);
        }
    };

    /**
     * Returns an array of member options excluding the currently edited member type.
     *
     * @function
     * @returns {Array} An array of member options.
     */
    const getMemberOptions = () => {
        const filteredOptions = memberOptions.filter(
            (option) => option !== editedData.memberType
        );
        return filteredOptions;
    };

    const getClassificationOptions = () => {
        const filteredOptions = classificationOptions.filter(
            (option) => option !== editedData.classification
        );
        return filteredOptions;
    };

    /**
     * Returns an array of authorization options, excluding the currently edited option.
     *
     * @function
     * @returns {Array} An array of authorization options.
     */
    const getAuthorizationOptions = () => {
        const filteredOptions = Object.keys(authorizationOptions).filter(
            (option) => option !== editedData.authorizationToShareInfo
        );
        return filteredOptions;
    };

    /**
     * Returns an array of life insurance options based on the authorization options and the currently edited data.
     *
     * @returns {Array} An array of life insurance options.
     */
    const getLifeInsuranceOptions = () => {
        const filteredOptions = Object.keys(lifeInsuranceOptions).filter(
            (option) => option !== editedData.lifeInsurance
        );
        return filteredOptions;
    };

    const getAnuuityOptions = () => {
        const filteredOptions = Object.keys(anuuityOptions).filter(
            (option) => option !== editedData.anuuity
        );
        return filteredOptions;
    };

    return (
        <div className="architect-detail">
            <div className="architect-row">
                <h2>
                    (i) Modifica la información que sea necesaria. Al terminar, haz clic
                    en guardar cambios.
                </h2>
            </div>
            <div className="architect-row">
                <h1>{data.fullName}</h1>
            </div>

            <div className="architect-row">
                <div className="architect-col">
                    <TextInput
                        label="Número de Colegiado"
                        placeholder="Número de Colegiado"
                        getVal={editedData.collegiateNumber}
                        setVal={(value) =>
                            setEditedData({ ...editedData, collegiateNumber: value })
                        }
                    />

                    <TextInput
                        label="Número de DRO"
                        placeholder="Número de DRO"
                        getVal={editedData.DRONumber}
                        setVal={(value) =>
                            setEditedData({ ...editedData, DRONumber: value })
                        }
                    />
                    <DropdownInput
                        label="Tipo de Miembro"
                        placeholder={editedData.memberType}
                        options={getMemberOptions()}
                        getVal={editedData.memberType}
                        setVal={(value) =>
                            setEditedData({ ...editedData, memberType: value })
                        }
                    />
                    <DropdownInput
                        label="Clasificación"
                        placeholder={editedData.classification}
                        getVal={editedData.classification}
                        options={getClassificationOptions()}
                        setVal={(value) =>
                            setEditedData({ ...editedData, classification: value })
                        }
                    />
                    <SelectInputComponent
                        label="Especialidades"
                        isMulti
                        options={availableSpecialties}
                        value={selectedSpecialties}
                        onChange={(selectedOptions) => {
                            setSelectedSpecialties(selectedOptions);
                        }}
                        placeholder="Selecciona una especialidad"
                    />
                    <TextInput
                        label="Actividad Profesional Principal"
                        placeholder="Actividad Profesional Principal"
                        getVal={editedData.mainProfessionalActivity}
                        setVal={(value) =>
                            setEditedData({
                                ...editedData,
                                mainProfessionalActivity: value,
                            })
                        }
                    />
                    <TextInput
                        label="Cédula Profesional"
                        placeholder="Cédula Profesional"
                        getVal={editedData.professionalLicense}
                        setVal={(value) =>
                            setEditedData({ ...editedData, professionalLicense: value })
                        }
                    />
                    <TextInput
                        label="Fecha de Ingreso"
                        placeholder="FechaDeIngreso"
                        getVal={editedData.dateOfAdmission}
                        setVal={(value) =>
                            setEditedData({ ...editedData, dateOfAdmission: value })
                        }
                    />
                    <TextInput
                        label="Municipio de Trabajo"
                        placeholder="Municipio de Trabajo"
                        getVal={editedData.municipalityOfLabor}
                        setVal={(value) =>
                            setEditedData({ ...editedData, municipalityOfLabor: value })
                        }
                    />
                </div>

                <div className="architect-col">
                    <DropdownInput
                        label="Autorización para compartir información"
                        placeholder={editedData.authorizationToShareInfo}
                        options={getAuthorizationOptions()}
                        getVal={editedData.authorizationToShareInfo}
                        setVal={(value) =>
                            setEditedData({
                                ...editedData,
                                authorizationToShareInfo: value,
                            })
                        }
                    />
                    <DropdownInput
                        label="Seguro de Vida"
                        placeholder={editedData.lifeInsurance}
                        options={getLifeInsuranceOptions()}
                        getVal={editedData.lifeInsurance}
                        setVal={(value) =>
                            setEditedData({
                                ...editedData,
                                lifeInsurance: value,
                            })
                        }
                    />
                    <TextInput
                        label="Poliza de Seguro"
                        placeholder="Poliza de Seguro"
                        getVal={editedData.lifeInsureID}
                        setVal={(value) =>
                            setEditedData({ ...editedData, lifeInsureID: value })
                        }
                    />
                    <TextInput
                        label="Horas de Capacitación"
                        placeholder="Horas Acreditadas"
                        getVal={editedData.capacitationHours}
                        setVal={(value) =>
                            setEditedData({ ...editedData, capacitationHours: value })
                        }
                    />
                    <DropdownInput
                        label="Pago de Anualidad"
                        placeholder={editedData.anuuity}
                        options={getAnuuityOptions()}
                        getVal={editedData.anuuity}
                        setVal={(value) =>
                            setEditedData({
                                ...editedData,
                                anuuity: value,
                            })
                        }
                    />
                    <TextInput
                        label="Posiciones en Consejo"
                        placeholder="Posiciones en Consejo"
                        getVal={editedData.positionsInCouncil}
                        setVal={(value) =>
                            setEditedData({ ...editedData, positionsInCouncil: value })
                        }
                    />
                    <FileInput
                        label="Curriculum Vitae"
                        placeholder="CV"
                        getVal={editedData.linkCV}
                        setVal={(value) =>
                            setEditedData({ ...editedData, linkCV: value })
                        }
                    />
                    {editedData.linkCV ? (
                        <p>
                            Archivo Actual:
                            <a href={editedData.linkCV}>
                                <span>Descargar CV</span>
                            </a>
                        </p>
                    ) : (
                        <p>
                            <span>No hay CV registrado. ¡Sube uno!</span>
                        </p>
                    )}
                </div>
            </div>
            <div>
                <div>
                    <AttendancesComponent attendances={attendances} />
                </div>
            </div>

            <div className="architect-row">
                <BaseButton type="primary" className="button" onClick={handleSaveChanges}>
                    Guardar Cambios
                </BaseButton>
            </div>
        </div>
    );
};

export default ArchitectDetail;
