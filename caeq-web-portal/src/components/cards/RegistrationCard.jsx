import './AdminCard.scss';
import './RegistrationCard.scss';
import AcceptIcon from '../icons/AcceptIcon.png';
import RejectIcon from '../icons/RejectIcon.png';

const RegistrationCard = ({
    id,
    acceptRegistration,
    rejectRegistration,
    collegiateNumber,
    overwrites,
    newInfo,
}) => {
    return (
        <div className='registration-card' key={id}>
            <h2>Arquitecto número {collegiateNumber}</h2>
            <div className='registration-card-info'>
                <div className='registration-card-details'>
                    <h3>Nuevo</h3>
                    <p>Nombre: {newInfo.fullName}</p>
                    <p>Correo: {newInfo.newEmail}</p>
                    <p>Ingreso: {newInfo.dateOfAdmission || 'Sin fecha de admisión'}</p>
                    <p>DRO: {newInfo.DRONumber || 'Sin número'}</p>
                    <p>Celular: {newInfo.cellphone || 'Sin número celular'}</p>
                    <p>
                        INE: <a href={newInfo.linkINE}>Descargar</a>
                    </p>
                </div>
                <div className='registration-card-details'>
                    <h3>Antes</h3>
                    <p>Nombre: {overwrites.fullName}</p>
                    <p>Correo: {overwrites.email}</p>
                    <p>
                        Ingreso: {overwrites.dateOfAdmission || 'Sin fecha de admisión'}
                    </p>
                    <p>DRO: {overwrites.DRONumber || 'Sin número'}</p>
                    <p>Celular: {overwrites.cellphone || 'Sin número celular'}</p>
                </div>
            </div>

            <div className='admin-card-buttons'>
                <img
                    onClick={() => acceptRegistration(id)}
                    src={AcceptIcon}
                    alt={`Accept Icon`}
                />
                <img
                    onClick={() => rejectRegistration(id)}
                    src={RejectIcon}
                    alt={`Reject Icon`}
                />
            </div>
        </div>
    );
};

export default RegistrationCard;
