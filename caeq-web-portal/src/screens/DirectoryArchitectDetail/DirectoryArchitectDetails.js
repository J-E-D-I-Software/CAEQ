import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getArchitectUserById } from '../../client/ArchitectUser/ArchitectUser.GET';
import { FireError, FireLoading, FireSucess } from '../../utils/alertHandler';
import { getAllSpecialties } from '../../client/Specialties/Specialties.GET';
import Select from 'react-select';
import TextInput from '../../components/inputs/TextInput/TextInput';
import './DirectoryArchitectDetail.scss';
import FileInput from '../../components/inputs/FileInput/FileInput';
import BaseButton from '../../components/buttons/BaseButton';
import { updateArchitectUserByID } from '../../client/ArchitectUser/ArchitecUser.PATCH';
import DropdownInput from '../../components/inputs/DropdownInput/DropdownInput';

const ArchitectDetail = (props) => {
    const searchParams = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState({});
    const [editedData, setEditedData] = useState({});
    const [specialties, setSpecialties] = useState([]);
    const [specialtiesName, setSpecialtiesName] = useState([]);

    const [selectedSpecialties, setSelectedSpecialties] = useState([]);
    const [availableSpecialties, setAvailableSpecialties] = useState(specialties);

    useEffect(() => {
        if (searchParams.id)
            getArchitectUserById(searchParams.id)
                .then((response) => {
                    if (response.authorizationToShareInfo !== true) {
                        response.authorizationToShareInfo = 'No';
                    } else {
                        response.authorizationToShareInfo = 'Si';
                    }
                    if (response.lifeInsurance !== true) {
                        response.lifeInsurance = 'No';
                    } else {
                        response.lifeInsurance = 'Si';
                    }

                    setData(response);
                    setEditedData(response);
                })
                .catch((error) => navigate('/404'));
        console.log(data);
    }, []);

    useEffect(() => {
        (async () => {
            try {
                const specialties = await getAllSpecialties();

                // Mapea las especialidades a un formato que react-select espera
                const specialtyOptions = specialties.map((specialty) => ({
                    label: specialty.name,
                    value: specialty.name,
                    id: specialty._id,
                }));

                setSpecialties(specialtyOptions);
            } catch (error) {
                // Handle error
            }
        })();
    }, []);

    //Recupera las especialidades de los arquitectos
    useEffect(() => {
        // Mapea las especialidades actuales del arquitecto y quítalas de las disponibles.
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
    }, [editedData.specialty, specialties]);

    // Pago de Anualidad pendiente

    /**
     * Handles the save changes functionality for the DirectoryArchitectDetails screen.
     * @async
     * @function handleSaveChanges
     * @param {Event} e - The event object.
     * @returns {Promise<void>}
     */
const handleSaveChanges = async (e) => {
    if (editedData.authorizationToShareInfo === 'Si') {
        editedData.authorizationToShareInfo = true;
    } else {
        editedData.authorizationToShareInfo = false;
    }
    if (editedData.lifeInsurance === 'Si') {
        editedData.lifeInsurance = true;
    } else {
        editedData.lifeInsurance = false;
    }

    const form = new FormData();
    const selectedSpecialtyValues = selectedSpecialties.map((s) => s.value);console.log("selectedSpecialtyValues",specialties);
    specialties.map((specialty,i) => { form.append(`specialties[]`, specialty.id); });
    form.append('DRONumber', editedData.DRONumber);
    form.append('collegiateNumber', editedData.collegiateNumber);
    form.append('memberType', editedData.memberType);
    form.append('classification', editedData.classification);
    form.append('mainProfessionalActivity', editedData.mainProfessionalActivity);
    // En lugar de enviar un array de objetos, envía un array de valores de especialidades
    form.append('specialties', selectedSpecialtyValues);
    console.log("NOU",selectedSpecialtyValues);
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

    try {
        const swal = FireLoading('Guardando cambios... por favor espere');
        const response = await updateArchitectUserByID(searchParams.id, form);
        if (response.status === 'success') {
            console.log("neta?", response);
            setData(response.data);
            swal.close();
            FireSucess('Los Cambios se han guardado correctamente');
            navigate('/Directorio');
        } else {
            swal.close();
            FireError(response.message);
        }
    } catch (error) {
        FireError(error.message);
        console.log(error);
    }
};


    const memberOptions = [
        'Miembro de número',
        'Miembro Adherente',
        'Miembro Pasante',
        'Miembro Honorario',
        'Miembro Vitalicio',
    ];
    const authorizationOptions = { Si: true, No: false };

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
        const filteredOptions = Object.keys(authorizationOptions).filter(
            (option) => option !== editedData.lifeInsurance
        );
        return filteredOptions;
    };

    return (
        <div className="architect-detail">
            <div className="architect-row">
                <h2>
                    {' '}
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
                        label="Fecha de Ingreso"
                        placeholder="FechaDeIngreso"
                        getVal={editedData.dateOfAdmission}
                        setVal={(value) =>
                            setEditedData({ ...editedData, dateOfAdmission: value })
                        }
                    />
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
                    <TextInput
                        label="Número de Asistencias a Asambleas"
                        placeholder="Número de Asistencias a Asambleas"
                        getVal={editedData.hoursAttended}
                        setVal={(value) =>
                            setEditedData({ ...editedData, hoursAttended: value })
                        }
                    />
                    <TextInput
                        label="Horas Acreditadas"
                        placeholder="Horas Acreditadas"
                        getVal={editedData.capacitationHours}
                        setVal={(value) =>
                            setEditedData({ ...editedData, capacitationHours: value })
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
                    <TextInput
                        label="Clasificación"
                        placeholder="Clasificación"
                        getVal={editedData.classification}
                        setVal={(value) =>
                            setEditedData({ ...editedData, classification: value })
                        }
                    />

                    <label>Especialidad</label>
                    <Select
                        isMulti
                        options={specialties}
                        value={selectedSpecialties}
                        onChange={(selectedOptions) => {
                            setSelectedSpecialties(selectedOptions);
                        }}
                        placeholder="Selecciona especialidades..."
                    />
                </div>

                <div className="architect-col">
                    <TextInput
                        label="Poliza de Seguro"
                        placeholder="Poliza de Seguro"
                        getVal={editedData.lifeInsureID}
                        setVal={(value) =>
                            setEditedData({ ...editedData, lifeInsureID: value })
                        }
                    />
                    <DropdownInput
                        label="Tiene Seguro de Vida"
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
                        label="Cédula Profesional"
                        placeholder="Cédula Profesional"
                        getVal={editedData.professionalLicense}
                        setVal={(value) =>
                            setEditedData({ ...editedData, professionalLicense: value })
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
                    <DropdownInput
                        label="Pago de Anualidad"
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
                    <FileInput
                        label="CV"
                        placeholder="CV"
                        getVal={editedData.linkCV}
                        setVal={(value) =>
                            setEditedData({ ...editedData, linkCV: value })
                        }
                    />
                    <p>
                        Archivo Actual:{' '}
                        <a href={editedData.linkCV}>
                            <span>Descargar CV</span>
                        </a>
                    </p>
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
