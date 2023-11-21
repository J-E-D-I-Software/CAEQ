import './PrincipalCard.scss';
import { useNavigate } from 'react-router-dom';

const PrincipalCard = ({ path, title, icon, description }) => {
    const navigate = useNavigate();
    return (
        <div className='principal-card' onClick={() => navigate(path)}>
            <img src={icon} alt={`${title} Icon`} />
            <h1>{title}</h1>
            <p>{description}</p>
            
        </div>
    );
};

export default PrincipalCard;