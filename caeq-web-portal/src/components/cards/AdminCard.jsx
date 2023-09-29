import './AdminCard.scss';
import AcceptIcon from '../icons/AcceptIcon.png';
import RejectIcon from '../icons/RejectIcon.png';

/**
 * AdminCard component for displaying administrator information and actions.
 * @component
 *
 * @param {Object} props - The component's properties.
 * @param {string} props.id - The ID of the administrator.
 * @param {string} props.email - The email of the administrator.
 * @param {string} props.fullName - The full name of the administrator.
 * @param {function} props.acceptAdmin - A function to accept the administrator.
 * @param {function} props.rejectAdmin - A function to reject the administrator.
 * @returns {JSX.Element} JSX element representing the AdminCard.
 *
 * @example
 * // Example usage of AdminCard:
 * <AdminCard
 *   id="admin123"
 *   email="admin@example.com"
 *   fullName="John Doe"
 *   acceptAdmin={handleAccept}
 *   rejectAdmin={handleReject}
 * />
 */
const AdminCard = ({ id, email, fullName, acceptAdmin, rejectAdmin }) => {
    return (
        <div className='admin-card'>
            <h2>{fullName}</h2>
            <h3>{email}</h3>
            <div className='admin-card-buttons'>
                <img
                    onClick={() => acceptAdmin(id)}
                    src={AcceptIcon}
                    alt={`Accept Icon`}
                />
                <img
                    onClick={() => rejectAdmin(id)}
                    src={RejectIcon}
                    alt={`Reject Icon`}
                />
            </div>
        </div>
    );
};

export default AdminCard;
