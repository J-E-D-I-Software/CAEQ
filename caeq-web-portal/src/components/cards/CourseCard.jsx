import BaseButton from '../buttons/BaseButton';
import './CourseCard.scss';

const CourseCard = (props) => {
    return (
        <div className='course-card'>
            <div className='card-col'>
                <img src={props.imageUrl} />
            </div>

            <div className='card-col'>
                <div className='card-row'>
                    <h4>{props.courseName}</h4>
                </div>
                <div className='card-row'>
                    <div className='inline-block'>
                        <i>Icon</i>
                        <p>{props.startDate}</p>
                    </div>
                    <div className='inline-block'>
                        <span>{props.daysOfSession}</span>
                        <span>{props.schedule}</span>
                    </div>
                </div>
                <div className='card-row'>
                    <p>{props.description}</p>
                </div>
                <div className='card-row'>
                    <div>
                        <i>Icon</i>
                        <p>{props.modality}</p>
                    </div>
                    <div>
                        <i>Icon</i>
                        <p>{props.modality}</p>
                    </div>
                </div>
                <div className='card-row'>
                    <p>${props.price}</p>
                    <BaseButton type="primary">Ver más</BaseButton>
                </div>
            </div>
        </div>
    );
}

export default CourseCard;
