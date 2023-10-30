import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getArchitectUserById } from '../../client/ArchitectUser/ArchitectUser.GET';
import { getArchitectUserSaved } from '../../utils/auth';

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

    const date = new Date(profile.dateOfBirth);
    const startDate = new Date(profile.dateOfAdmission);

    const handleRoute = (id) => {
        navigate(`/Perfil/${SavedUser._id}`);
    };

    useEffect(() => {
        if (SavedUser._id)
            getArchitectUserById(SavedUser._id)
                .then((response) => setProfile(response))
                .catch((error) => navigate('/404'));
    }, []);

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
                            {date.toLocaleDateString()}
                        </p>
                        <p>
                            <span>Edad: </span>
                            {profile.age} años
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
                            {profile.municipalityOfLabor}
                        </p>
                    </div>
                </WhiteContainer>
            </div>
        </div>
    );
};

export default Profile;
