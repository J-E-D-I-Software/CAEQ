import { useNavigate } from 'react-router-dom';
import BaseButton from '../buttons/BaseButton';
import RestrictByRole from '../restrictAccess/RestrictByRole';
import './CourseCard.scss';
import { currencyFormat } from '../../utils/reusableFunctions';

const CourseCard = ({showMoreBtn=true, ...props}) => {
    const navigate = useNavigate();

    let description = props.description.slice(0, 130);
    if (props.description.length > 130)
        description += '...';

    const date = new Date(props.startDate);
    
    return (
        <div className='course-card'>
            <div className='card-col'>
                <img src={props.imageUrl} />
            </div>

            <div className='card-col'>
                <div className='card-row m-1'>
                    <h4>{props.courseName}</h4>
                </div>
                <div className='card-row'>
                    <div className='card-icon-text'>
                        {/* <i>I</i> */}
                        <p>{date.toLocaleDateString()}</p>
                    </div>
                    <div className='card-col card-icon-text'>
                        <p>{props.daysOfSession}</p>
                        <p>{props.schedule}</p>
                    </div>
                </div>
                <div className='card-row'>
                    <p>{description}</p>
                </div>
                <div className='card-row'>
                    <div className='card-row'>
                        {/* <i>I</i> */}
                        <p>{props.modality}</p>
                    </div>
                    <div className='card-row'>
                        {/* <i>I</i> */}
                        <p>{props.numberHours} horas</p>
                    </div>
                </div>
                <div className='card-row'>
                    <p className='card-price'>
                        {props.price ? `${currencyFormat(props.price)}` : 'Gratuito'}
                    </p>
                    <div>
                        {showMoreBtn &&
                            <BaseButton className="mb-1" type="primary" onClick={()=> navigate(`/Curso/${props._id}`)}>
                                Ver más
                            </BaseButton>
                        }
                        {showMoreBtn &&
                            <RestrictByRole allowedRoles={['caeq']}>
                                <BaseButton type="primary" onClick={()=> navigate(`/Cursos/Curso/${props._id}`)}>
                                    Modificar
                                </BaseButton>
                            </RestrictByRole>
                        }

                    </div>
                </div>
            </div>
        </div>
    );
}

export default CourseCard;
