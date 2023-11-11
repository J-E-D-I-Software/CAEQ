import { useNavigate } from 'react-router-dom';
import BaseButton from '../buttons/BaseButton';
import './InscriptionCard.scss';

const InscriptionCard = ({ showMoreBtn = true, ...props }) => {
    const navigate = useNavigate();
    console.log(props);

    // Accede a las propiedades dentro de la propiedad 'course'
    let description = props.course.description.slice(0, 130);
    if (props.course.description.length > 130)
        description += '...';

    const date = new Date(props.course.startDate);

    return (
        <div className='course-card'>
            <div className='card-col'>
                <img src={props.course.imageUrl} alt={props.course.courseName} />
            </div>

            <div className='card-col'>
                <div className='card-row m-1'>
                    <h4>{props.course.courseName}</h4>
                </div>
                <div className='card-row'>
                    <div className='card-icon-text'>
                        <p>{date.toLocaleDateString()}</p>
                    </div>
                    <div className='card-col card-icon-text'>
                        <p>{props.course.daysOfSession}</p>
                        <p>{props.course.schedule}</p>
                    </div>
                </div>
                <div className='card-row'>
                    <p>{description}</p>
                </div>
                <div className='card-row'>
                    <div className='card-row'>
                        <p>{props.course.modality}</p>
                    </div>
                    <div className='card-row'>
                        <p>{props.course.numberHours} horas</p>
                    </div>
                </div>
                <div className='card-row'>
                    <p className='card-price'>
                        {props.course.price ? `$${props.course.price}` : 'Gratuito'}
                    </p>
                    <div>
                        {showMoreBtn && (
                            <BaseButton
                                className='mb-1'
                                type='primary'
                                onClick={() => navigate(`/Curso/${props._id}`)}
                            >
                                Ver más
                            </BaseButton>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InscriptionCard;
