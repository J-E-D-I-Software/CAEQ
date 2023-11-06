
import AcceptIcon from '../icons/AcceptIcon.png'
import RejectIcon from '../icons/RejectIcon.png'

const PaymentCard = ({ id, email, fullName, paymentID, acceptAdmin, rejectAdmin }) => {
    return (
        <div className='admin-card'>
            <h2>{fullName}</h2>
            <h3>{email}</h3>
            <div className='admin-card-buttons'>
                <img
                    onClick={() => acceptAdmin(paymentID)}
                    src={AcceptIcon}
                    alt={`Accept Icon`}
                />
                <img
                    onClick={() => rejectAdmin(paymentID)}
                    src={RejectIcon}
                    alt={`Reject Icon`}
                />
            </div>
        </div>
    );
};

export default PaymentCard;