import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getArchitectUserById } from '../../client/ArchitectUser/ArchitectUser.GET';
import { getArchitectUserSaved } from '../../utils/auth';
import { getAllAttendees } from '../../client/Attendees/Attendees.GET';

import WhiteContainer from '../../components/containers/WhiteCard/WhiteCard';
import BaseButton from '../../components/buttons/BaseButton';
import './Profile.scss';

/**
 * Renders the user's profile information, including personal data, CAEQ information, and professional information.
 * @param {Object} props - The props object.
 * @returns {JSX.Element} - The JSX element representing the user's profile.
 */
const Profile = (props) => {
    const SavedUser = getArchitectUserSaved();
    const navigate = useNavigate();
    const [profile, setProfile] = useState({});
    const [attendances, setAttendances] = useState([]);
    const [filterByArchitectId, setfilterByArchitectId] = useState([]);

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

    const asistencias = [
        { year: 2005, dates: ['2005-01-01', '2005-03-15', '2005-08-20'] },
        { year: 2007, dates: ['2007-02-10', '2007-06-05', '2007-12-30'] },
        { year: 2008, dates: ['2008-02-10', '2008-06-05', '2008-12-30'] },
        { year: 2009, dates: ['2009-02-10', '2009-06-05', '2009-12-30'] },
        { year: 2010, dates: ['2010-01-01', '2010-04-15', '2010-09-20'] },
        { year: 2012, dates: ['2012-02-10', '2012-06-05', '2012-12-30'] },
        { year: 2015, dates: ['2015-03-15', '2015-07-20', '2015-11-25'] },
        { year: 2018, dates: ['2018-01-10', '2018-05-15', '2018-10-20'] },
        { year: 2020, dates: ['2020-02-10', '2020-06-05', '2020-12-30'] },
    ];

    useEffect(() => {
        if (SavedUser._id)
            getArchitectUserById(SavedUser._id)
                .then((response) => setProfile(response))
                .catch((error) => navigate('/404'));
    }, []);

    useEffect(() => {
        (async () => {
            try {
                const attendances = await getAllAttendees();
                setAttendances(attendances);
                console.log('Asistencias', attendances);
            } catch {}
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
                            <span>Número Celular: </span>
                            {profile.cellphone}
                        </p>
                        <p>
                            <span>Teléfono de casa: </span>
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
                    </div>
                    <div className='profile-col semi-col'>
                        <p>
                            <span>Número de DRO: </span>
                            {profile.DRONumber}
                        </p>
                        <p>
                            <span>Horas Acreditadas: </span>
                            {profile.capacitationHours}
                        </p>
                        <p>
                            <span>Fecha de Ingreso: </span>
                            {profile.dateOfAdmission}
                        </p>
                        <p>.</p>
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
                            <span>Link CV: </span>
                            <a href={profile.linkCV}>Descargar</a>
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
                  list'          {profile.municipalityOfLabor}
                        </p>
                    </div>
                </WhiteContainer>
            </div>
            <div>
                <h1>Asistencias a Asambleas</h1>
                <div className='Attendees-row'>
                    {asistencias.map((asistencia) => (
                        <div key={asistencia.year}>
                            <BaseButton
                                className='year-button'
                                type='primary'
                                onClick={() => handleYearClick(asistencia.year)}
                            >
                                {asistencia.year}
                            </BaseButton>
                            {selectedYear === asistencia.year && (
                                <div className='list-data'>
                                    {asistencia.dates.map((date, index) => (
                                        <p key={index}>{date}</p>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Profile;
