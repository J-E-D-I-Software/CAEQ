import React, { useState, useEffect } from 'react';
import './AcceptAdmin.scss';
import AcceptIcon from '../../components/icons/AcceptIcon.png';
import RejectIcon from '../../components/icons/RejectIcon.png';
import AdminCard from '../../components/cards/AdminCard';
import RegistrationCard from '../../components/cards/RegistrationCard';
import { getArchitectRegistrationRequest } from '../../client/ArchitectUser/ArchitectUser.GET';
import {
    patchAcceptRegistration,
    patchRejectRegistration,
} from '../../client/ArchitectUser/ArchitecUser.PATCH';
import { getCaeqUsers } from '../../client/CaeqUser/CaeqUser.GET';
import { patchAcceptAdmin, patchRejectAdmin } from '../../client/CaeqUser/CaeqUser.PATCH';
import {
    FireError,
    FireSucess,
    FireLoading,
    FireQuestion,
} from '../../utils/alertHandler';
import { useNavigate } from 'react-router-dom';

/**
 * AcceptAdmin component for managing the approval or rejection of administrator accounts.
 * @component
 *
 * @returns {JSX.Element} JSX element representing the AcceptAdmin page.
 *
 * @example
 * // Example usage of AcceptAdmin:
 * <AcceptAdmin />
 */
const AcceptAdmin = () => {
    const [admins, setAdmins] = useState([]);
    const [registrations, setRegistrations] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                const admins = await getCaeqUsers(false);

                setAdmins(admins);

                const registrations = await getArchitectRegistrationRequest();

                setRegistrations(registrations);
            } catch (error) {
                FireError(error.response.data.message);
            }
        })();
    }, []);

    /**
     * Handles the approval of an administrator.
     * @param {string} id - The ID of the administrator to be approved.
     */
    const handleAcceptAdmin = async (id) => {
        try {
            const confirmation = await FireQuestion(
                '¿Está seguro que desea aprobar al administrador?',
                'Esta acción no se puede deshacer. El administrador tendrá acceso a la aplicación.'
            );

            if (!confirmation.isConfirmed) {
                return;
            }

            const swal = FireLoading('Aceptando administrador...');
            const response = await patchAcceptAdmin(id);

            setAdmins(admins.filter((admin) => admin._id !== id));

            swal.close();
            FireSucess(response.message);
        } catch (error) {
            FireError(error.response.data.message);
            if (
                error.response.data.message ===
                'Hemos tenido problemas enviando un correo de verificación. El usuario ha sido verificado.'
            ) {
                setAdmins(admins.filter((admin) => admin._id !== id));
            }
        }
    };

    /**
     * Handles the rejection of an administrator.
     * @param {string} id - The ID of the administrator to be rejected.
     */
    const handleRejectAdmin = async (id) => {
        try {
            const confirmation = await FireQuestion(
                '¿Está seguro que desea rechazar al administrador?',
                'Esta acción no se puede deshacer. El administrador será eliminado.'
            );

            if (!confirmation.isConfirmed) {
                return;
            }

            const swal = FireLoading('Rechazando administrador...');
            const response = await patchRejectAdmin(id);

            setAdmins(admins.filter((admin) => admin._id !== id));

            swal.close();
            FireSucess(response.message);
        } catch (error) {
            FireError(error.response.data.message);
            if (
                error.response.data.message ===
                'Hemos tenido problemas enviando un correo de verificación. El usuario ha sido eliminado.'
            ) {
                setAdmins(admins.filter((admin) => admin._id !== id));
            }
        }
    };

    /**
     * Handles the approval of a registration.
     * @param {string} id - The ID of the registration to be approved.
     */
    const handleAcceptRegistration = async (id) => {
        try {
            const registration = registrations.filter(
                (registration) => registration._id === id
            )[0];

            if (registration.overwrites.overwritten) {
                const confirmation = await FireQuestion(
                    '¿Está seguro que desea aprobar al nuevo usuario?',
                    'Este usuario ya ha sido sobreescrito anteriormente. Aprobar esta solicitud podría dejar sin acceso al portal a un usuario existente.'
                );

                if (!confirmation.isConfirmed) {
                    return;
                }
            } else {
                const confirmation = await FireQuestion(
                    '¿Está seguro que desea aprobar al nuevo usuario?',
                    'Esta acción no se puede deshacer. El usuario tendrá acceso a la aplicación.'
                );

                if (!confirmation.isConfirmed) {
                    return;
                }
            }

            const swal = FireLoading('Aceptando usuario...');
            const response = await patchAcceptRegistration(id);

            const newUser = registration.newInfo;
            const oldUser = registration.overwrites;

            setRegistrations(
                registrations
                    .filter((registration) => registration._id !== id)
                    .map((registration) => {
                        if (registration.overwrites._id === oldUser._id) {
                            registration.overwrites = newUser;
                            registration.overwrites.email = newUser.newEmail;
                        }
                        console.log(registration);

                        return registration;
                    })
            );

            swal.close();
            FireSucess(response.message);
        } catch (error) {
            console.log(error);
            FireError(error.response.data.message);
            if (
                error.response.data.message ===
                'Hemos tenido problemas enviando un correo de verificación. El usuario ha sido verificado.'
            ) {
                setRegistrations(
                    registrations.filter((registration) => registration._id !== id)
                );
            }
        }
    };

    /**
     * Handles the rejection of a registration.
     * @param {string} id - The ID of the registration to be rejected.
     */
    const handleRejectRegistration = async (id) => {
        try {
            const confirmation = await FireQuestion(
                '¿Está seguro que desea rechazar al administrador?',
                'Esta acción no se puede deshacer. El usuario que intenta acceder será eliminado.'
            );

            if (!confirmation.isConfirmed) {
                return;
            }

            const swal = FireLoading('Rechazando usuario...');
            const response = await patchRejectRegistration(id);

            setRegistrations(
                registrations.filter((registration) => registration._id !== id)
            );

            swal.close();
            FireSucess(response.message);
        } catch (error) {
            FireError(error.response.data.message);
            if (
                error.response.data.message ===
                'Hemos tenido problemas enviando un correo de verificación. El usuario ha sido eliminado.'
            ) {
                setRegistrations(
                    registrations.filter((registration) => registration._id !== id)
                );
            }
        }
    };

    return (
        <div className='user-management'>
            <div className='accept-admin'>
                <h1>Administradores por registrar</h1>
                <h2>
                    El propósito de esta sección es conceder autorizaciones a otras
                    cuentas para permitirles el acceso al portal de administración.
                </h2>
                <div className='instruction'>
                    <img src={AcceptIcon} alt={`Accept Icon`} />
                    <h3>
                        Da click a para aceptar la petición de otorgar a una cuenta acceso
                        al portal de administración.
                    </h3>
                </div>
                <div className='instruction'>
                    <img src={RejectIcon} alt={`Reject Icon`} />
                    <h3>
                        Da click para rechazar la petición de otorgar a una cuenta acceso
                        al portal de administración.
                    </h3>
                </div>
                <div className='admin-cards'>
                    {admins.map((admin) => (
                        <AdminCard
                            id={admin._id}
                            email={admin.email}
                            fullName={admin.fullName}
                            acceptAdmin={handleAcceptAdmin}
                            rejectAdmin={handleRejectAdmin}
                        />
                    ))}
                </div>
            </div>
            <div className='accept-admin'>
                <h1>Colegiados por registrar</h1>
                <h2>
                    El propósito de esta sección es conceder autorizaciones a otras
                    cuentas para permitirles el acceso al portal de arquitectos. Las
                    peticiones de acceso son creadas cuando un arquitecto se registra con
                    un número de colegiado que ya existe en la base de datos.
                </h2>
                <div className='instruction'>
                    <img src={AcceptIcon} alt={`Accept Icon`} />
                    <h3>
                        Da click a para aceptar la petición de sobreescribir la
                        información anterior del arquitecto.
                    </h3>
                </div>
                <div className='instruction'>
                    <img src={RejectIcon} alt={`Reject Icon`} />
                    <h3>
                        Da click a para rechazar la petición de sobreescribir la
                        información anterior del arquitecto.
                    </h3>
                </div>
                <div className='registration-cards'>
                    {registrations.length > 0 ? (
                        registrations.map((registration) => (
                            <RegistrationCard
                                id={registration._id}
                                overwrites={registration.overwrites}
                                newInfo={registration.newInfo}
                                acceptRegistration={handleAcceptRegistration}
                                rejectRegistration={handleRejectRegistration}
                                collegiateNumber={registration.architectNumber}
                            />
                        ))
                    ) : (
                        <h3>No hay usuarios por aceptar</h3>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AcceptAdmin;
