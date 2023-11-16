import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getArchitectUserById } from '../../client/ArchitectUser/ArchitectUser.GET';
import { getArchitectUserSaved } from '../../utils/auth';
import { getAttendancesByArchitect } from '../../client/Attendees/Attendees.GET';
import { getCourseHours } from '../../client/Inscription/Inscription.GET';
import { FireError } from '../../utils/alertHandler';
import WhiteContainer from '../../components/containers/WhiteCard/WhiteCard';
import BaseButton from '../../components/buttons/BaseButton';
import AttendancesComponent from '../../components/attendeesButton/AttendeesButton';
import './Profile.scss';

/**
 * Renders the user's profile information, including personal data, CAEQ information, and professional information.
 * @param {Object} props - The props object.
 * @returns {JSX.Element} - The JSX element representing the user's profile.
 */
const Profile = (props) => {
    const savedUser = getArchitectUserSaved();
    const navigate = useNavigate();
    const [profile, setProfile] = useState({});
    const [attendances, setAttendances] = useState([]);
    const [attendanceByYear, setAttendanceByYear] = useState({});
    const [courseHours, setCourseHours] = useState([]);

    const date = profile.dateOfBirth
        ? profile.dateOfBirth.split('T')[0].replace(/-/g, '/')
        : '';
    const normalDate = date.split('/').reverse().join('/');

    const handleRoute = (id) => {
        navigate(`/Perfil/${savedUser._id}`);
    };

    useEffect(() => {
        if (savedUser._id)
            getArchitectUserById(savedUser._id)
                .then((response) => setProfile(response))
                .catch((error) => FireError(error.response.data.message));
    }, []);

    useEffect(() => {
        (async () => {
            try {
                const architectId = savedUser._id;
                const attendances = await getAttendancesByArchitect(architectId);
                setAttendances(attendances);

                if (attendances.length > 0) {
                    // Calculate attendance by year
                    const attendanceByYear = {};
                    for (const asistencia of attendances) {
                        const year = asistencia.idGathering.year;
                        if (asistencia.attended) {
                            if (!attendanceByYear[year]) {
                                attendanceByYear[year] = 1;
                            } else {
                                attendanceByYear[year]++;
                            }
                        }
                    }
                    setAttendanceByYear(attendanceByYear);
                }

                const accreditedHours = await getCourseHours(savedUser._id);
                setCourseHours(accreditedHours);
            } catch (error) {
                console.error('Error al obtener asistencias por arquitecto', error);
            }
        })();
    }, []);


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
            <div className='profile-row'>
                <BaseButton type='primary' onClick={handleRoute}>
                    Editar Datos de Perfil
                </BaseButton>
            </div>

            <h1>Datos Personales</h1>
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
                        <p>
                            <span>Número Celular: </span>
                            {profile.cellphone}
                        </p>
                        <p>
                            <span>Teléfono de Casa: </span>
                            {profile.homePhone}
                        </p>
                    </div>
                    <div className='profile-col'>
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
                            {profile.linkINE ?
                                <a href={profile.linkINE}>Visualizar</a>
                                : 'No hay documento guardado'
                            }
                        </p>
                        <p>
                            <span>CURP: </span>
                            {profile.linkCURP ?
                                <a href={profile.linkCURP}>Visualizar</a>
                                : 'No hay documento guardado'
                            }
                        </p>
                        <p>
                            <span>Acta de Nacimiento: </span>
                            {profile.linkBirthCertificate ?
                                <a href={profile.linkBirthCertificate}>Visualizar</a>
                                : 'No hay documento guardado'
                            }
                        </p>
                        <p>
                            <span>Comprobante de domicilio: </span>
                            {profile.linkAddressCertificate ?
                                <a href={profile.linkAddressCertificate}>Visualizar</a>
                                : 'No hay documento guardado'
                            }
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
                    </div>
                    <div className='profile-col semi-col'>
                        <p>
                            <span>Horas Acreditadas: </span>

                            {courseHours
                                .sort((prev, next) => next.endYear - prev.endYear)
                                .map((courseHour) => (
                                    <p>
                                        {courseHour.startYear} - {courseHour.endYear} :{' '}
                                        {courseHour.value}
                                    </p>
                                ))}
                        </p>
                        <p>
                            <span>Asistencias por Año:</span>
                            {Object.keys(attendanceByYear).map((year) => (
                                <p key={year}>
                                    {year}: {attendanceByYear[year] || 0} asistencias
                                </p>
                            ))}
                        </p>
                        <p>
                            <span>Fecha de Ingreso: </span>
                            {profile.dateOfAdmission}
                        </p>
                        <p>
                            <span>Credencial CAEQ: </span>
                            {profile.linkCAEQCard ?
                                <a href={profile.linkCAEQCard}>Visualizar</a>
                                : 'No hay documento guardado'
                            }
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
                    </div>
                    <div className='profile-col semi-col'>
                        <p>
                            <span>Municipio: </span>
                            {profile.municipalityOfLabor}
                        </p>
                        <p>
                            <span>Currículum Vitae (CV): </span>
                            {profile.linkCV ?
                                <a href={profile.linkCV}>Visualizar</a>
                                : 'No hay documento guardado'
                            }
                        </p>
                        <p>
                            <span>Título Universitario: </span>
                            {profile.linkBachelorsDegree ?
                                <a href={profile.linkBachelorsDegree}>Visualizar</a>
                                : 'No hay documento guardado'
                            }
                        </p>
                        <p>
                            <span>Cédula Profesional: </span>
                            {profile.linkProfessionalLicense ?
                                <a href={profile.linkProfessionalLicense}>Visualizar</a>
                                : 'No hay documento guardado'
                            }
                        </p>
                    </div>
                </WhiteContainer>
            </div>
            <div>
                <div>
                    <AttendancesComponent attendances={attendances} />
                </div>
            </div>
        </div>
    );
};

export default Profile;
