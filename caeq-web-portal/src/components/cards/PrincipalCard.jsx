import './PrincipalCard.scss';
import { useNavigate } from 'react-router-dom';

const PrincipalCard = ({ path, title, icon, description, cardType}) => {
    const navigate = useNavigate();
    return (
        <div className='principal-card' onClick={() => navigate(path)}>
            <img className={`image-${cardType}`}  src={icon} alt={`${title} Icon`} />
            <h1>{title}</h1>
            <p>{description}</p>
            
        </div>
    );
};

export default PrincipalCard;