import './AcceptPayment.scss';
import React, { useState, useEffect } from 'react';
import AcceptIcon from '../../components/icons/AcceptIcon.png';
import RejectIcon from '../../components/icons/RejectIcon.png';
import PaymentCard from '../../components/cards/PaymentCard';

import { patchAcceptAdmin, patchRejectAdmin } from '../../client/CaeqUser/CaeqUser.PATCH';
import {
    FireError,
    FireSucess,
    FireLoading,
    FireQuestion,
    FireQuestionInput
} from '../../utils/alertHandler';
import {getAllPayments } from '../../client/Payment/Payment.GET';
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
    const [payments, setPayments] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                const payments = await getAllPayments();

                setPayments(payments);
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

            setPayments(payments.filter((payment) => payment._id !== id));

            swal.close();
            FireSucess(response.message);
        } catch (error) {
            FireError(error.response.data.message);
            if (
                error.response.data.message ===
                'Hemos tenido problemas enviando un correo de verificacion. El usuario ha sido verificado.'
            ) {
                setPayments(payments.filter((payment) => payment._id !== id));
            }
        }
    };

    /**
     * Handles the rejection of an administrator.
     * @param {string} id - The ID of the administrator to be rejected.
     */
    const handleReject = async (id) => {
        try {
            const confirmation = await FireQuestionInput(
                '¿Está seguro que desea rechazar al administrador?',
                'Esta acción no se puede deshacer. El administrador será eliminado.'
            );

            if (!confirmation.isConfirmed) {
                return;
            }

            const swal = FireLoading('Rechazando administrador...');
            const response = await patchRejectAdmin(id);

            setPayments(payments.filter((admin) => admin._id !== id));

            swal.close();
            FireSucess(response.message);
        } catch (error) {
            FireError(error.response.data.message);
            if (
                error.response.data.message ===
                'Hemos tenido problemas enviando un correo de verificacion. El usuario ha sido eliminado.'
            ) {
                setPayments(payments.filter((admin) => admin._id !== id));
            }
        }
    };

    /**
     * Format function to display boolean values as "Yes" or "No".
     * @param {boolean} value - The boolean value to format.
     * @returns {string} - "Yes" if the value is true, "No" if it's false.
     */
        const formatBooleanValue = (value) => (value ? 'Sí' : 'No');

    return (
        <div className='accept-payment-container'>
            <div className='payment-row'>
                <h1>Pagos de los Cursos</h1>
                <h2>
                    El propósito de esta sección es conceder autorizaciones a otras cuentas
                    para permitirles el acceso al portal de administración.
                </h2>
            </div>
            <div className='payment-row-instruction'>
                <img src={AcceptIcon} alt={`Accept Icon`} />
                    <h3>
                        Da click a este icono para aceptar la petición de otorgar a una cuenta acceso al
                        portal de administración.
                    </h3>
            </div>
            <div className='payment-row-instruction'>
                    <img src={RejectIcon} alt={`Reject Icon`} />
                <h3>
                    Da click a este para rechazar la petición de otorgar a una cuenta acceso al
                    portal de administración.
                </h3>
            </div>
            <div className='payment-cards'> 

                <PaymentCard
                    fullName={'Juan Ernesto Cevilla'}
                    paymentID={'123456789'}
                    courseName={'Mampostería industrial'}
                    invoice={formatBooleanValue(true)}
                    priceToPay={'$120.30'}
                    teacherName={'Juan Ernesto Cevilla'}
                    billimageURL={"https://i.imgur.com/2xtkgUA.jpeg"}
                    acceptPayment={handleAccept}
                    rejectPayment={handleReject}
                />

            </div>
        </div>
    );
};

export default AcceptAdmin;
