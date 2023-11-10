
import BaseButton from '../buttons/BaseButton';
import AcceptIcon from '../icons/AcceptIcon.png'
import RejectIcon from '../icons/RejectIcon.png'
import pdfPlaceholder from '../images/download-active.png'
import './PaymentCard.scss'
const PaymentCard = ({ id, fullName, userId, courseId, billimageURL, courseName, priceToPay, teacherName, invoice, acceptPayment, rejectPayment }) => {




    const handleButtonClick = (e, url) => {
        e.preventDefault();
        window.open(url, '_blank');
    };
    const url = billimageURL;
    const containsPDF = /\.pdf/.test(url);
    const navigate = `/Curso/${courseId}`

    return (
        <div className='payment-card'>
            
            <div className='payment-concept'>
                <h2>{fullName}</h2>
                <h3>¿Desea Facturar? {invoice}</h3>
                <div className='payment-description'>
                    <p>Curso: <a href={navigate}> '{courseName}'</a></p>
                    <p>Profesor: {teacherName} | Costo: {priceToPay} </p>
                </div>
            </div>

            <div className='payment-image'>
                <img  src={containsPDF ? pdfPlaceholder  : billimageURL}/>
            </div>
            
            <div className='payment-card-buttons'>
                <div className='payment-card-col--download'>
                    <BaseButton type='primary' onClick={(e) => handleButtonClick(e, billimageURL)}>
                        Descargar
                    </BaseButton>
                </div>
                <div className='payment-card-col--button'>
                    
                    <img
                        onClick={() => acceptPayment(id)}
                        src={AcceptIcon}
                        alt={`Accept Icon`}
                    />
                    <img
                        onClick={() => rejectPayment(id)}
                        src={RejectIcon}
                        alt={`Reject Icon`}
                    />
                </div>
                
            </div>
        </div>
    );
};

export default PaymentCard;