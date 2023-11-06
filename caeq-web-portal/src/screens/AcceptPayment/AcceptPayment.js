import React, { useState, useEffect } from 'react';
import AcceptIcon from '../../components/icons/AcceptIcon.png';
import RejectIcon from '../../components/icons/RejectIcon.png';
import PaymentCard from '../../components/cards/PaymentCard';

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
    const navigate = useNavigate();

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
            if (
                error.response.data.message ===
                'Hemos tenido problemas enviando un correo de verificacion. El usuario ha sido verificado.'
            ) {
                setAdmins(admins.filter((admin) => admin._id !== id));
            }
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
            if (
                error.response.data.message ===
                'Hemos tenido problemas enviando un correo de verificacion. El usuario ha sido eliminado.'
            ) {
                setAdmins(admins.filter((admin) => admin._id !== id));
            }
        }
    };

    return (
        <div className='accept-payment-container'>
            <div className='payment-row'>
                <h2>Pagos de los Cursos</h2>
            </div>
            <div className='payment-row instruction'>
                DirectoryArchitectDetail
            </div>
            <div className='payment-row'>
                <div className='payment-col'> v 

                </div>
                <div className='payment-col'></div>
            </div>

        </div>
    );
};

export default AcceptAdmin;
