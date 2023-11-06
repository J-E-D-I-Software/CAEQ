
import AcceptIcon from '../icons/AcceptIcon.png'
import RejectIcon from '../icons/RejectIcon.png'
import './PaymentCard.scss'
const PaymentCard = ({ id, fullName, paymentID, paymentURL, courseName, priceToPay, teacherName, invoice, acceptPayment, rejectPayment }) => {
    return (
        <div className='payment-card'>
            
            <div className='payment-concept'>
                <h2>{fullName}</h2>
                <h3>¿Desea Facturar? {invoice}</h3>
                <div className='payment-description'>
                    <p>Curso: '{courseName}'</p>
                    <p>Profesor: {teacherName} | Costo: {priceToPay} </p>
                </div>
            </div>

            <div className='payment-image'>
                <img  src={paymentURL}/>
            </div>
            
            <div className='payment-card-buttons'>
                <img
                    onClick={() => acceptPayment(paymentID)}
                    src={AcceptIcon}
                    alt={`Accept Icon`}
                />
                <img
                    onClick={() => rejectPayment(paymentID)}
                    src={RejectIcon}
                    alt={`Reject Icon`}
                />
            </div>
        </div>
    );
};

export default PaymentCard;