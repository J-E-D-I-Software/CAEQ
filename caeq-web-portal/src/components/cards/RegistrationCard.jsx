import './AdminCard.scss';
import './RegistrationCard.scss';
import AcceptIcon from '../icons/AcceptIcon.png';
import RejectIcon from '../icons/RejectIcon.png';

/**
 * RegistrationCard component for displaying registration details and actions.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.id - The unique identifier for the registration card.
 * @param {Function} props.acceptRegistration - Callback function for accepting the registration.
 * @param {Function} props.rejectRegistration - Callback function for rejecting the registration.
 * @param {string} props.collegiateNumber - The collegiate number of the architect.
 * @param {Object} props.overwrites - Information before the update.
 * @param {Object} props.newInfo - Information after the update.
 * @returns {JSX.Element} JSX representation of the RegistrationCard component.
 */
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
                    <p>
                        Ingreso al colegio:{' '}
                        {newInfo.dateOfAdmission || 'Sin fecha de admisión'}
                    </p>
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
