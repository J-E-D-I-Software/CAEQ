import './AcceptPayment.scss';
import React, { useState, useEffect } from 'react';
import AcceptIcon from '../../components/icons/AcceptIcon.png';
import RejectIcon from '../../components/icons/RejectIcon.png';
import PaymentCard from '../../components/cards/PaymentCard';

import { patchAcceptPayment, patchRejectPaymenet } from '../../client/Payment/Payment.PATCH';
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
                console.log("payment",payments)
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
                '¿Está seguro de aceptar este pago?',
                'Esta acción no se puede deshacer. El colegiado se inscribirá automáticamente al curso.'
            );

            if (!confirmation.isConfirmed) {
                return;
            }

            const swal = FireLoading('Aceptando pago...');
            const response = await patchAcceptPayment(id);

            setPayments(payments.filter((payment) => payment._id !== id));

            swal.close();
            FireSucess('Pago aceptado con éxito.');
        } catch (error) {
            FireError(error.response.data.message);
            if (
                error.response.data.message ===
                'Hemos tenido problemas enviando un correo de verificacion.'
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
                '¿Está seguro de rechazar este pago?',
                'Se le notificará al colegiado. Ingresa el motivo del rechazo:'
            );

            if (!confirmation.isConfirmed) {
                return;
            }

            const swal = FireLoading('Rechazando administrador...');
            //const response = await patchRejectAdmin(id);

            setPayments(payments.filter((admin) => admin._id !== id));

            swal.close();
            FireSucess('Pago rechazado con éxito');
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
                    El propósito de esta sección es aceptar los pagos a los diferentes cursos que se ofrecen en la plataforma.
                </h2>
            </div>
            <div className='payment-row-instruction'>
                <img src={AcceptIcon} alt={`Accept Icon`} />
                    <h3>
                        De click a este icono para aceptar el pago de un curso e inscribirlo automáticamente.
                    </h3>
            </div>
            <div className='payment-row-instruction'>
                    <img src={RejectIcon} alt={`Reject Icon`} />
                <h3>
                    De click a este icono para rechazar el pago de un curso e informar al colegiado el motivo.
                </h3>
            </div>
            <div className='payment-cards'> 
                {payments.map((payment) => (<PaymentCard
                    id = {payment._id}
                    fullName={payment.user.fullName}
                    userId={payment.user._id}
                    courseName={payment.course.courseName}
                    invoice={formatBooleanValue(payment.wantsInvoice)}
                    priceToPay={payment.course.price}
                    teacherName={payment.course.teacherName}
                    billimageURL={payment.billImageURL}
                    acceptPayment={handleAccept}
                    rejectPayment={handleReject}
                 />))}
               
            </div>
        </div>
    );
};

export default AcceptAdmin;
