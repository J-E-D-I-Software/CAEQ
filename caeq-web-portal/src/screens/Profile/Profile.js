import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getArchitectUserById } from '../../client/ArchitectUser/ArchitectUser.GET';
import { getArchitectUserSaved } from '../../utils/auth';
import { getAttendancesByArchitect } from '../../client/Attendees/Attendees.GET';
import { FireError } from '../../utils/alertHandler';
import WhiteContainer from '../../components/containers/WhiteCard/WhiteCard';
import BaseButton from '../../components/buttons/BaseButton';
import AttendancesComponent from '../../components/attendeesButton/AttendeesButton';
import { getCourseHours } from '../../client/Inscription/Inscription.GET';
import './Profile.scss';
import RestrictByRole from '../../components/restrictAccess/RestrictByRole';

/**
 * Renders the user's profile information, including personal data, CAEQ information, and professional information.
 * @param {Object} props - The props object.
 * @returns {JSX.Element} - The JSX element representing the user's profile.
 */
const Profile = (props) => {
    const attendeesRef = useRef();
    const SavedUser = getArchitectUserSaved();
    const navigate = useNavigate();
    const [profile, setProfile] = useState({});
    const [attendances, setAttendances] = useState([]);
    const [courseHours, setCourseHours] = useState([]);
    const [currentRights, setCurrentRights] = useState('');
    const [attendanceByYear, setAttendanceByYear] = useState({});

    const date = profile.dateOfBirth
        ? profile.dateOfBirth.split('T')[0].replace(/-/g, '/')
        : '';
    const normalDate = date.split('/').reverse().join('/');
    const startDate = new Date(profile.dateOfAdmission);

    const [selectedYear, setSelectedYear] = useState(null);

    const handleYearClick = (year) => {
        setSelectedYear((prevYear) => (prevYear === year ? null : year));
    };

    const handleRoute = (id) => {
        navigate(`/Perfil/${SavedUser._id}`);
    };

    const currentYear = new Date().getFullYear();

    useEffect(() => {
        if (SavedUser._id)
            getArchitectUserById(SavedUser._id)
                .then((response) => {
                    setProfile(response);
                })
                .catch((error) => FireError(error.response.data.message));
    }, []);

    useEffect(() => {
        (async () => {
            try {
                const architectId = SavedUser._id;
                const attendances = await getAttendancesByArchitect(architectId);
                setAttendances(attendances);

                let accreditedHours = await getCourseHours(SavedUser._id);
                setCourseHours(accreditedHours);
            } catch (error) {
                console.error('Error al obtener asistencias por arquitecto', error);
            }
        })();
    }, [SavedUser._id]);

    let dobValue = new Date(profile.dateOfBirth);
    const currentDate = new Date();
    let age = currentDate.getUTCFullYear() - dobValue.getUTCFullYear();
    if (
        currentDate.getUTCMonth() < dobValue.getUTCMonth() ||
        (currentDate.getUTCMonth() === dobValue.getUTCMonth() &&
            currentDate.getUTCDate() < dobValue.getUTCDate())
    ) {
        age--;
    }

    return (
        <div className='profile'>
            <h1>Datos Personales</h1>
            <div className='profile-row'>
                <BaseButton type='primary' onClick={handleRoute}>
                    Editar Datos Personales
                </BaseButton>
            </div>

            <div className='profile-row'>
                <WhiteContainer>
                    <div className='profile-col'>
                        <p>
                            <span>Nombre: </span> {profile.fullName}
                        </p>
                        <p>
                            <span>Fecha de Nacimiento: </span>
                            {normalDate}
                        </p>
                        <p>
                            <span>Edad: </span>
                            {age} años
                        </p>
                        <p>
                            <span>Género: </span>
                            {profile.gender}
                        </p>
                        <p>
                            <span>Dirección: </span>
                            {profile.homeAddress}
                        </p>
                    </div>
                    <div className='profile-col'>
                        <p>
                            <span>Teléfono Celular: </span>
                            {profile.cellphone}
                        </p>
                        <p>
                            <span>Teléfono Casa: </span>
                            {profile.homePhone}
                        </p>
                        <p>
                            <span>Correo Electrónico: </span>
                            {profile.email}
                        </p>
                        <p>
                            <span>Contacto de Emergencia: </span>
                            {profile.emergencyContact}
                        </p>
                        <p>
                            <span>INE: </span>
                            {profile.linkINE ? (
                                <a href={profile.linkINE}>Visualizar</a>
                            ) : (
                                'No hay documento guardado'
                            )}
                        </p>
                        <p>
                            <span>CURP: </span>
                            {profile.linkCURP ? (
                                <a href={profile.linkCURP}>Visualizar</a>
                            ) : (
                                'No hay documento guardado'
                            )}
                        </p>
                        <p>
                            <span>Acta de Nacimiento: </span>
                            {profile.linkBirthCertificate ? (
                                <a href={profile.linkBirthCertificate}>Visualizar</a>
                            ) : (
                                'No hay documento guardado'
                            )}
                        </p>
                        <p>
                            <span>Comprobante de domicilio: </span>
                            {profile.linkAddressCertificate ? (
                                <a href={profile.linkAddressCertificate}>Visualizar</a>
                            ) : (
                                'No hay documento guardado'
                            )}
                        </p>
                    </div>
                </WhiteContainer>
            </div>

            <h1>Información CAEQ</h1>
            <div className='profile-row'>
                <WhiteContainer>
                    <div className='profile-col semi-col'>
                        <p>
                            <span>Tipo de Miembro: </span>
                            {profile.memberType}
                        </p>
                        <p>
                            <span>Número de Colegiado: </span>
                            {profile.collegiateNumber}
                        </p>
                        <p>
                            <span>Clasificación: </span>
                            {profile.classification}
                        </p>
                        <p>
                            <span>Puesto en Consejo: </span>
                            {profile.positionsInCouncil}
                        </p>
                        <p>
                            <span>Número de DRO: </span>
                            {profile.DRONumber}
                        </p>
                        <p>
                            <span>Derechos vigentes: {profile.rights ? 'Sí' : 'No'}</span>
                            <p>Anualidad pagada: {profile.annuity ? 'Sí' : 'No'}</p>
                            <p>
                                Asistencias a asambleas del último año:{' '}
                                {profile.totalGatheringAttendees}/5
                            </p>
                            <p>
                                Asistencias presenciales a asambleas del último año:{' '}
                                {profile.totalGatheringAttendeesPresential}
                                /3
                            </p>
                            <p>
                                Horas de capacitación del último año: {profile.totalHours}
                                /{profile.specialties?.length > 0 ? '40' : '20'}
                            </p>
                        </p>
                    </div>
                    <div className='profile-col semi-col'>
                        <p>
                            <span>Horas Acreditadas: </span>
                            {courseHours
                                .sort((prev, next) => next.endYear - prev.endYear)
                                .slice(0, 2) // Select only the first three elements
                                .map((courseHour) => (
                                    <p>
                                        {courseHour.startYear} - {courseHour.endYear} :{' '}
                                        {courseHour.value}
                                    </p>
                                ))}
                        </p>
                        <p>
                            <span>Asistencias por Año:</span>
                            <p key={currentYear}>
                                {currentYear}: {profile[currentYear]}
                            </p>
                            <p key={currentYear}>
                                {currentYear - 1}: {profile[currentYear - 1]}
                            </p>
                            <p key={currentYear}>
                                {currentYear - 2}: {profile[currentYear - 2]}
                            </p>
                        </p>
                        <p>
                            <BaseButton
                                type='primary'
                                onClick={() =>
                                    attendeesRef.current.scrollIntoView({
                                        behavior: 'smooth',
                                    })
                                }>
                                Ver asistencias registradas
                            </BaseButton>
                        </p>
                        <p>
                            <span>Fecha de Ingreso: </span>
                            {profile.dateOfAdmission}
                        </p>
                        <p>
                            <span>Credencial CAEQ: </span>
                            {profile.linkCAEQCard ? (
                                <a href={profile.linkCAEQCard}>Visualizar</a>
                            ) : (
                                'No hay documento guardado'
                            )}
                        </p>
                    </div>
                </WhiteContainer>
            </div>

            <h1>Información Profesional</h1>
            <div className='profile-row'>
                <WhiteContainer>
                    <div className='profile-col semi-col'>
                        <p>
                            <span>Dirección de Oficina: </span>
                            {profile.workAddress}
                        </p>
                        <p>
                            <span>Teléfono de Oficina: </span>
                            {profile.officePhone}
                        </p>
                        <p>
                            <span>Universidad: </span>
                            {profile.university}
                        </p>
                    </div>
                    <div className='profile-col semi-col'>
                        <p>
                            <span>Profesión: </span>
                            {profile.mainProfessionalActivity}
                        </p>
                        <p>
                            <span>Especialidad: </span>
                            {profile.specialties
                                ? profile.specialties
                                      .map((specialty) => specialty.name)
                                      .join(', ')
                                : 'No especialidades'}
                        </p>
                        <p>
                            <span>Municipio: </span>
                            {profile.municipalityOfLabor}
                        </p>
                        <p>
                            <span>Currículum Vitae (CV): </span>
                            {profile.linkCV ? (
                                <a href={profile.linkCV}>Visualizar</a>
                            ) : (
                                'No hay documento guardado'
                            )}
                        </p>
                        <p>
                            <span>Título Universitario: </span>
                            {profile.linkBachelorsDegree ? (
                                <a href={profile.linkBachelorsDegree}>Visualizar</a>
                            ) : (
                                'No hay documento guardado'
                            )}
                        </p>
                        <p>
                            <span>Cédula Profesional: </span>
                            {profile.linkProfessionalLicense ? (
                                <a href={profile.linkProfessionalLicense}>Visualizar</a>
                            ) : (
                                'No hay documento guardado'
                            )}
                        </p>
                    </div>
                </WhiteContainer>
            </div>
            <div>
                <div ref={attendeesRef}>
                    <AttendancesComponent attendances={attendances} />
                </div>
            </div>
            <div>
                <p>
                    <h1>Horas Acreditadas</h1>
                    <div></div>
                    {courseHours
                        .sort((prev, next) => next.endYear - prev.endYear)
                        .map((courseHour) =>
                            courseHour.startYear === 2023 ? (
                                <p className='list-data'>
                                    <span className='list-data-year'>
                                        {courseHour.startYear} - {courseHour.endYear}
                                    </span>{' '}
                                    : {courseHour.value} horas (
                                    {profile.capacitationHours} registradas anteriormente)
                                </p>
                            ) : (
                                <p className='list-data'>
                                    <span className='list-data-year'>
                                        {courseHour.startYear} - {courseHour.endYear}
                                    </span>{' '}
                                    : {courseHour.value} horas
                                </p>
                            )
                        )}
                </p>
                <h3>
                    (i) Las horas calculadas son del 15 de marzo al 14 de marzo del año
                    siguiente.
                </h3>
            </div>
        </div>
    );
};

export default Profile;
