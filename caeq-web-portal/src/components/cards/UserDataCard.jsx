import { useNavigate } from 'react-router-dom';
import './UserDataCard.scss';

const CourseCard = (props) => {

    const navigate = useNavigate();

    let description = props.description.slice(0, 130);
    if (props.description.length > 130)
        description += '...';

    return(
        //<h1>hola</h1>
        <div className='UserData-card'>
        </div>
    )

}