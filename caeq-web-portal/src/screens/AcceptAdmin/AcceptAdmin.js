import React, { useState, useEffect } from 'react';
import './AcceptAdmin.scss';
import AcceptIcon from '../../components/icons/AcceptIcon.png';
import RejectIcon from '../../components/icons/RejectIcon.png';
import AdminCard from '../../components/cards/AdminCard';
import { getCaeqUsers } from '../../client/CaeqUser/CaeqUser.GET';
import { patchAcceptAdmin, patchRejectAdmin } from '../../client/CaeqUser/CaeqUser.PATCH';
import {
    FireError,
    FireSucess,
    FireLoading,
    FireQuestion,
} from '../../utils/alertHandler';

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

    useEffect(() => {
        (async () => {
            try {
                const admins = await getCaeqUsers(false);

                setAdmins(admins);
            } catch (error) {
                FireError(error.response.data.message);
            }
        })();
    }, []);

    /**
     * Handles the approval of an administrator.
     * @param {string} id - The ID of the administrator to be approved.
     */
    const handleAccept = async (id) => {
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
        }
    };

    /**
     * Handles the rejection of an administrator.
     * @param {string} id - The ID of the administrator to be rejected.
     */
    const handleReject = async (id) => {
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
        }
    };

    return (
        <div className='accept-admin'>
            <h1>Administradores por registrar</h1>
            <h2>
                El propósito de esta sección es conceder autorizaciones a otras cuentas
                para permitirles el acceso al portal de administración.
            </h2>
            <div className='instruction'>
                <img src={AcceptIcon} alt={`Accept Icon`} />
                <h3>
                    Da click a para aceptar la petición de otorgar a una cuenta acceso al
                    portal de administración.
                </h3>
            </div>
            <div className='instruction'>
                <img src={RejectIcon} alt={`Reject Icon`} />
                <h3>
                    Da click para rechazar la petición de otorgar a una cuenta acceso al
                    portal de administración.
                </h3>
            </div>
            <div className='admin-cards'>
                {admins.map((admin) => (
                    <AdminCard
                        id={admin._id}
                        email={admin.email}
                        fullName={admin.fullName}
                        acceptAdmin={handleAccept}
                        rejectAdmin={handleReject}
                    />
                ))}
            </div>
        </div>
    );
};

export default AcceptAdmin;
