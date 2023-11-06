import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCourse } from '../../client/Course/Course.GET';
import BaseButton from '../../components/buttons/BaseButton';
import ClassroomIcon from '../../components/icons/Classroom.png';
import LocationIcon from '../../components/icons/Location.png';
import ClockIcon from '../../components/icons/Clock.png';
import TeacherIcon from '../../components/icons/Teacher.png';
import CalendarIcon from '../../components/icons/Calendar.png';
import SatisfactionIcon from '../../components/icons/Satisfaction.png';
import RestrictByRole from '../../components/restrictAccess/RestrictByRole';
import './course.scss';

/**
 * Page that detailed information of a course.
 */
const Course = (props) => {
    const searchParams = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState({});

    useEffect(() => {
        if (searchParams.id)
            getCourse(searchParams.id)
                .then((response) => setData(response))
                .catch(() => navigate('/404'));
    }, []);

    let startDate = null;
    let endDate = null;
    if (data?.startDate && data?.endDate) {
        startDate = new Date(data.startDate);
        endDate = new Date(data.endDate);
    }

    return (
        <div className='course'>
            <div className='course-row'>
                <h1>{data.courseName}</h1>
                <RestrictByRole allowedRoles={['caeq']}>
                    <BaseButton
                        type='primary'
                        onClick={() => navigate(`/Cursos/Curso/${searchParams.id}`)}>
                        Modificar
                    </BaseButton>
                </RestrictByRole>
                <h2 className='course-price'>
                    {data.price ? `$${data.price}` : 'Gratuito'}
                </h2>
            </div>

            <div className='course-row course-data'>
                <div className='course-row'>
                    <img src={ClassroomIcon} height={40} />
                    <span>Curso {data.modality}</span>
                </div>
                <div className='course-row'>
                    <img src={LocationIcon} height={40} />
                    <span>{data.place}</span>
                </div>
                <div className='course-row'>
                    <img src={ClockIcon} height={40} />
                    <span>{data.numberHours} horas acreditadas</span>
                </div>
                <div className='course-row'>
                    <img src={TeacherIcon} height={40} />
                    <span>{data.teacherName}</span>
                </div>
            </div>

            <div className='course-row course-data'>
                <div className='course-row'>
                    <img src={SatisfactionIcon} height={40} />
                    <span>{data.teacherReview}</span>
                </div>
                <div className='course-row course-time'>
                    <img src={CalendarIcon} height={40} />
                    {startDate && endDate && (
                        <span>
                            {startDate.toISOString().slice(0, 10)} -{' '}
                            {endDate.toISOString().slice(0, 10)}
                        </span>
                    )}
                    <span>{data.daysOfSession}</span>
                    <span>{data.schedule}</span>
                </div>
            </div>

            <div className='course-row course-details'>
                <img src={data.imageUrl} />
                <div className='course-col'>
                    <p className='text-area'>{data.description}</p>
                    <div className='course-row course-extras'>
                        <div className='course-col'>
                            <h3>Objetivos</h3>
                            <p className='text-area'>{data.objective}</p>
                        </div>
                        <div className='course-col'>
                            <h3>Incluye</h3>
                            <p className='text-area'>{data.includes}</p>
                        </div>
                        <div className='course-col'>
                            <h3>Temario</h3>
                            <p className='text-area'>{data.temario}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Course;
