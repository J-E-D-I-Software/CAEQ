import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getArchitectUserById } from '../../client/ArchitectUser/ArchitectUser.GET';
import { FireError, FireLoading, FireSucess } from '../../utils/alertHandler';
import { getAllSpecialties } from '../../client/Specialties/Specialties.GET';
import SelectInputComponent from '../../components/inputs/SelectInput/SelectInput';
import TextInput from '../../components/inputs/TextInput/TextInput';
import './DirectoryArchitectDetail.scss';
import FileInput from '../../components/inputs/FileInput/FileInput';
import NumberInput from '../../components/inputs/NumberInput/NumberInput';
import BaseButton from '../../components/buttons/BaseButton';
import { updateArchitectUserByID } from '../../client/ArchitectUser/ArchitecUser.PATCH';
import DropdownInput from '../../components/inputs/DropdownInput/DropdownInput';
import { getAttendancesByArchitect } from '../../client/Attendees/Attendees.GET';
import AttendancesComponent from '../../components/attendeesButton/AttendeesButton';
import { getCourseHours } from '../../client/Inscription/Inscription.GET';
import { resizeImage } from '../../utils/files';

import {
    memberOptions,
    authorizationOptions,
    classificationOptions,
    lifeInsuranceOptions,
    annuityOptions,
} from '../../components/DirectoryDetailsOptions/DirectoryArchitectDetailOptions';

const ArchitectDetail = (props) => {
    const searchParams = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState({});
    const [editedData, setEditedData] = useState({});

    const [updateHours, setUpdateHours] = useState(false);

    const [selectedSpecialties, setSelectedSpecialties] = useState([]);
    const [availableSpecialties, setAvailableSpecialties] = useState([]);
    const [attendances, setAttendances] = useState([]);
    const [courseHours, setCourseHours] = useState([]);

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

                if (architect.annuity !== true) {
                    architect.annuity = 'No';
                } else {
                    architect.annuity = 'Si';
                }

                setData(architect);
                setEditedData(architect);

                let specialties = await getAllSpecialties();

                specialties = specialties.map((specialty) => {
                    return { label: specialty.name, value: specialty._id };
                });

                setAvailableSpecialties(specialties);

                let currentSpecialties = architect.specialties.map(
                    (specialty) => {
                        return { label: specialty.name, value: specialty._id };
                    }
                );

                const accreditedHours = await getCourseHours(searchParams.id);
                setCourseHours(accreditedHours);

                setSelectedSpecialties(currentSpecialties);
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
                    const attendances = await getAttendancesByArchitect(
                        architectId
                    );
                    setAttendances(attendances);
                } catch (error) {
                    console.error(
                        'Error al obtener asistencias por arquitecto',
                        error
                    );
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
        e.preventDefault();

        const currentDate = new Date();
        const dateAdmission = new Date(editedData.dateOfAdmission, 0, 1);

        if (dateAdmission > currentDate) {
            FireError('Tu fecha de admisión no puede estar en el futuro.');
            return;
        }

        // Reduce file size
        let fileINE = editedData.linkINE;
        if (!editedData.linkINE) {
            FireError('Por favor adjunta una foto de tu INE al derecho y al revés.');
            return;
        }
        if (editedData.linkINE.type.includes('image') && 
            editedData.linkINE?.size > 3000000) {
            fileINE = await resizeImage(editedData.linkINE);
        }   

        const form = new FormData();
        editedData.authorizationToShareInfo =
            editedData.authorizationToShareInfo === 'Si' ? true : false;
        editedData.lifeInsurance =
            editedData.lifeInsurance === 'Si' ? true : false;
        editedData.annuity = editedData.annuity === 'Si' ? true : false;

        if (selectedSpecialties.length > 0) {
            // If there are selected specialties, add them to the form
            selectedSpecialties.forEach((specialty, i) => {
                form.append(`specialties[${i}]`, specialty.value);
            });
        } else {
            // If no specialties are selected, send a fake ID to indicate no specialties
            form.append('specialties', '131233213123213132132132');
        }

        form.append('DRONumber', editedData.DRONumber);
        form.append('collegiateNumber', editedData.collegiateNumber);
        form.append('memberType', editedData.memberType);
        form.append('classification', editedData.classification);
        form.append(
            'mainProfessionalActivity',
            editedData.mainProfessionalActivity
        );
        form.append('dateOfAdmission', editedData.dateOfAdmission);
        form.append('professionalLicense', editedData.professionalLicense);
        form.append('capacitationHours', editedData.capacitationHours);
        form.append('hoursAttended', editedData.hoursAttended);
        form.append('municipalityOfLabor', editedData.municipalityOfLabor);
        form.append('annuity', editedData.annuity);
        form.append('positionsInCouncil', editedData.positionsInCouncil);
        form.append(
            'authorizationToShareInfo',
            editedData.authorizationToShareInfo
        );
        form.append('file', editedData.linkCV);
        form.append('authorizationToShareInfo', editedData.authorizationToShareInfo);
        form.append('linkINE', editedData.linkINE);
        form.append('lifeInsurance', editedData.lifeInsurance);
        form.append('lifeInsureID', editedData.lifeInsureID);

        const swal = FireLoading('Guardando cambios... por favor espere');
        try {
            const response = await updateArchitectUserByID(
                searchParams.id,
                form
            );
            setData(response.data);
            swal.close();
            FireSucess('Los Cambios se han guardado correctamente');
        } catch (error) {
            swal.close();
            FireError(error.response.data.message);
        }

        const filesToUpload = [editedData.linkCV, editedData.linkCURP, editedData.linkProfessionalLicense, 
            editedData.linkBachelorsDegree, editedData.linkAddressCertificate, editedData.linkBirthCertificate];
        const errors = [];
        for (let i = 0; i < filesToUpload.length; i++) {
            let file = filesToUpload[i];
            
            if (file) {
                // If file size is over 5mb we have to compress it for the backend
                if (file.type?.includes('image') && file.size > 3000000) {
                    file = await resizeImage(file);
                }

                const formFile = new FormData();
                formFile.append('file', file);
                try {
                    const response = await updateArchitectUserByID(searchParams.id, formFile);
                    if (response.status !== 'success')
                        throw new Error('Error al subir archivo');
                } catch (error) {
                    console.error(error);
                    errors.push(file.name);
                }
            }
        }

        if (errors.length > 0) {
            FireError(
                `ocurrió un error al subir los siguientes archivos:\n${errors.join('\n')}`);
            return;
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

    const getAnnuityOptions = () => {
        const filteredOptions = Object.keys(annuityOptions).filter(
            (option) => option !== editedData.annuity
        );
        return filteredOptions;
    };

    return (
        <div className='architect-detail'>
            <div className='architect-row'>
                <h2>
                    Modifique la información que sea necesaria. Al terminar, haz
                    clic en guardar cambios.
                </h2>
            </div>
            <div className='architect-row'>
                <h1>{data.fullName}</h1>
            </div>

            <div className='architect-row'>
                <div className='architect-col'>
                    <TextInput
                        label='Número de Colegiado'
                        placeholder='Número de Colegiado'
                        getVal={editedData.collegiateNumber}
                        setVal={(value) =>
                            setEditedData({
                                ...editedData,
                                collegiateNumber: value,
                            })
                        }
                    />

                    <TextInput
                        label='Número de DRO'
                        placeholder='Número de DRO'
                        getVal={editedData.DRONumber}
                        setVal={(value) =>
                            setEditedData({ ...editedData, DRONumber: value })
                        }
                    />
                    <DropdownInput
                        label='Tipo de Miembro'
                        placeholder={editedData.memberType}
                        options={getMemberOptions()}
                        getVal={editedData.memberType}
                        setVal={(value) =>
                            setEditedData({ ...editedData, memberType: value })
                        }
                    />
                    <DropdownInput
                        label='Clasificación'
                        placeholder={editedData.classification}
                        getVal={editedData.classification}
                        options={getClassificationOptions()}
                        setVal={(value) =>
                            setEditedData({
                                ...editedData,
                                classification: value,
                            })
                        }
                    />
                    <SelectInputComponent
                        label='Especialidades'
                        isMulti
                        options={availableSpecialties}
                        value={selectedSpecialties}
                        onChange={(selectedOptions) => {
                            setSelectedSpecialties(selectedOptions);
                        }}
                        placeholder='Selecciona una especialidad'
                    />
                    <TextInput
                        label='Actividad Profesional Principal'
                        placeholder='Actividad Profesional Principal'
                        getVal={editedData.mainProfessionalActivity}
                        setVal={(value) =>
                            setEditedData({
                                ...editedData,
                                mainProfessionalActivity: value,
                            })
                        }
                    />
                    <TextInput
                        label='Cédula Profesional'
                        placeholder='Cédula Profesional'
                        getVal={editedData.professionalLicense}
                        setVal={(value) =>
                            setEditedData({
                                ...editedData,
                                professionalLicense: value,
                            })
                        }
                    />
                    <TextInput
                        label='Fecha de Ingreso'
                        placeholder='FechaDeIngreso'
                        getVal={editedData.dateOfAdmission}
                        setVal={(value) =>
                            setEditedData({
                                ...editedData,
                                dateOfAdmission: value,
                            })
                        }
                    />
                    <TextInput
                        label='Municipio de Trabajo'
                        placeholder='Municipio de Trabajo'
                        getVal={editedData.municipalityOfLabor}
                        setVal={(value) =>
                            setEditedData({
                                ...editedData,
                                municipalityOfLabor: value,
                            })
                        }
                    />
                    <DropdownInput
                        label='Autorización para compartir información'
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
                        label='Seguro de Vida'
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
                        label='Póliza de Seguro'
                        placeholder='Póliza de Seguro'
                        getVal={editedData.lifeInsureID}
                        setVal={(value) =>
                            setEditedData({
                                ...editedData,
                                lifeInsureID: value,
                            })
                        }
                    />
                    <NumberInput
                        label='Horas de Capacitación'
                        placeholder='Horas Acreditadas'
                        getVal={editedData.capacitationHours}
                        setVal={(value) =>
                            setEditedData({
                                ...editedData,
                                capacitationHours: value,
                            })
                        }
                    />
                    <DropdownInput
                        label='Pago de Anualidad'
                        placeholder={editedData.annuity}
                        options={getAnnuityOptions()}
                        getVal={editedData.annuity}
                        setVal={(value) =>
                            setEditedData({
                                ...editedData,
                                annuity: value,
                            })
                        }
                    />
                    <TextInput
                        label='Posiciones en Consejo'
                        placeholder='Posiciones en Consejo'
                        getVal={editedData.positionsInCouncil}
                        setVal={(value) =>
                            setEditedData({
                                ...editedData,
                                positionsInCouncil: value,
                            })
                        }
                    />
                </div>

                <div className='architect-col'>
                    <FileInput
                        label='INE'
                        getVal={editedData.linkINE}
                        setVal={(value) =>
                            setEditedData({ ...editedData, linkINE: value })
                        }
                        accept='image/*,application/pdf'
                    />
                    {editedData.linkINE ? (
                        <p>
                            Archivo Actual:
                            <a href={editedData.linkINE}>
                                <span>Descargar INE</span>
                            </a>
                        </p>
                    ) : (
                        <p>
                            <span>No hay un INE registrado. ¡Sube uno!</span>
                        </p>
                    )}
                    <FileInput
                        label='Curriculum Vitae'
                        placeholder='CV'
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
                    <FileInput
                        label='Credencial CAEQ'
                        getVal={editedData.linkCAEQCard}
                        setVal={(value) =>
                            setEditedData({ ...editedData, linkCAEQCard: value })
                        }
                        accept='image/*,application/pdf'
                    />
                    {editedData.linkCAEQCard ? (
                        <p>
                            Archivo Actual:
                            <a href={editedData.linkCAEQCard}>
                                <span>Descargar tarjeta de CAEQ</span>
                            </a>
                        </p>
                    ) : (
                        <p>
                            <span>No hay una tarjeta de CAEQ registrada. ¡Sube una!</span>
                        </p>
                    )}
                    <FileInput
                        label='CURP'
                        getVal={editedData.linkCURP}
                        setVal={(value) =>
                            setEditedData({ ...editedData, linkCURP: value })
                        }
                        accept='image/*,application/pdf'
                    />
                    {editedData.linkCURP ? (
                        <p>
                            Archivo Actual:
                            <a href={editedData.linkCURP}>
                                <span>Descargar CURP</span>
                            </a>
                        </p>
                    ) : (
                        <p>
                            <span>No hay un CURP registrado. ¡Sube uno!</span>
                        </p>
                    )}
                    <FileInput
                        label='Cédula Profesional'
                        getVal={editedData.linkProfessionalLicense}
                        setVal={(value) =>
                            setEditedData({ ...editedData, linkProfessionalLicense: value })
                        }
                        accept='image/*,application/pdf'
                    />
                    {editedData.linkProfessionalLicense ? (
                        <p>
                            Archivo Actual:
                            <a href={editedData.linkProfessionalLicense}>
                                <span>Descargar cédula profesional</span>
                            </a>
                        </p>
                    ) : (
                        <p>
                            <span>No hay una cédula profesional registrada. ¡Sube una!</span>
                        </p>
                    )}
                    <FileInput
                        label='Título Profesional'
                        getVal={editedData.linkBachelorsDegree}
                        setVal={(value) =>
                            setEditedData({ ...editedData, linkBachelorsDegree: value })
                        }
                        accept='image/*,application/pdf'
                    />
                    {editedData.linkBachelorsDegree ? (
                        <p>
                            Archivo Actual:
                            <a href={editedData.linkBachelorsDegree}>
                                <span>Descargar título profesional</span>
                            </a>
                        </p>
                    ) : (
                        <p>
                            <span>No hay un título registrado. ¡Sube uno!</span>
                        </p>
                    )}
                    <FileInput
                        label='Comprobante de domicilio (no mayor a 3 meses)'
                        getVal={editedData.linkAddressCertificate}
                        setVal={(value) =>
                            setEditedData({ ...editedData, linkAddressCertificate: value })
                        }
                        accept='image/*,application/pdf'
                    />
                    {editedData.linkAddressCertificate ? (
                        <p>
                            Archivo Actual:
                            <a href={editedData.linkAddressCertificate}>
                                <span>Descargar comprobante de domicilio</span>
                            </a>
                        </p>
                    ) : (
                        <p>
                            <span>No hay comprobante de domicilio registrado. ¡Sube uno!</span>
                        </p>
                    )}
                    <FileInput
                        label='Acta de Nacimiento'
                        getVal={editedData.linkBirthCertificate}
                        setVal={(value) =>
                            setEditedData({ ...editedData, linkBirthCertificate: value })
                        }
                        accept='image/*,application/pdf'
                    />
                    {editedData.linkBirthCertificate ? (
                        <p>
                            Archivo Actual:
                            <a href={editedData.linkBirthCertificate}>
                                <span>Descargar acta de nacimiento</span>
                            </a>
                        </p>
                    ) : (
                        <p>
                            <span>No hay acta de nacimiento registrada. ¡Sube una!</span>
                        </p>
                    )}
                </div>
            </div>
            <div className='architect-row'>
                <BaseButton
                    type='primary'
                    className='button'
                    onClick={handleSaveChanges}
                >
                    Guardar Cambios
                </BaseButton>
            </div>
            <div>
                <div>
                    <AttendancesComponent attendances={attendances} />
                </div>
            </div>
            <div>
                <p>
                    <h1>Horas Acreditadas</h1>
                    <div></div>
                    {courseHours
                        .sort((prev, next) => next.endYear - prev.endYear)
                        .map((courseHour) => (
                            <p className='list-data'>
                                <span className='list-data-year'>
                                    {courseHour.startYear} -{' '}
                                    {courseHour.endYear}
                                </span>{' '}
                                : {courseHour.value} horas
                            </p>
                        ))}
                </p>
                <h3>
                    (i) Las horas calculadas son del 15 de marzo al 14 de marzo
                    del año siguiente.
                </h3>
                <h3>
                    (i) Para modificar las horas de un colegiado, debe acceder
                    al curso, completar sus asistencias y terminar el curso para
                    que le sean sumadas.
                </h3>
            </div>
        </div>
    );
};

export default ArchitectDetail;
