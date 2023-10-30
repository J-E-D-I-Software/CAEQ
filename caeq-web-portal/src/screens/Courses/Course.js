import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCourse } from '../../client/Course/Course.GET';
import { inscribeArchitectToCourse } from '../../client/Inscription/Inscription.POST';
import { FireError, FireSucess, FireLoading } from '../../utils/alertHandler';

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

    const handleInscription = async (e) => {
        e.preventDefault();
        
        try {
            const swal = FireLoading('Inscribiéndote al curso...');

            // Realiza la solicitud de inscripción aquí llamando a la función correspondiente.
           
            const response = await inscribeArchitectToCourse(searchParams.id);

            if (response.status === 'success') {
                FireSucess('Inscripción exitosa.');
                // Realiza la redirección a la página de inicio o cualquier otra página necesaria.
                navigate('/Cursos');
            }

            swal.close();
        } catch (error) {
           
            // Maneja errores, muestra un mensaje de error o realiza acciones necesarias.
            FireError(error.response.data.message);
        }
    };

    return (
        <div className="course">
            <div className="course-row">
                <h1>{data.courseName}</h1>
                <RestrictByRole allowedRoles={['caeq']}>
                    <BaseButton
                        type="primary"
                        onClick={() => navigate(`/Cursos/Curso/${searchParams.id}`)}
                    >
                        Modificar
                    </BaseButton>
                </RestrictByRole>
                <RestrictByRole allowedRoles={['architect']}>
                    <BaseButton type="primary" onClick={(e) => handleInscription(e)}>
                        Inscribirme
                    </BaseButton>
                </RestrictByRole>

                <h2 className="course-price">
                    {data.price ? `$${data.price}` : 'Gratuito'}
                </h2>
            </div>

            <div className="course-row course-data">
                <div className="course-row">
                    <img src={ClassroomIcon} height={40} />
                    <span>Curso {data.modality}</span>
                </div>
                <div className="course-row">
                    <img src={LocationIcon} height={40} />
                    <span>{data.place}</span>
                </div>
                <div className="course-row">
                    <img src={ClockIcon} height={40} />
                    <span>{data.numberHours} horas acreditadas</span>
                </div>
                <div className="course-row">
                    <img src={TeacherIcon} height={40} />
                    <span>{data.teacherName}</span>
                </div>
            </div>

            <div className="course-row course-data">
                <div className="course-row">
                    <img src={SatisfactionIcon} height={40} />
                    <span>{data.teacherReview}</span>
                </div>
                <div className="course-row course-time">
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

            <div className="course-row course-details">
                <img src={data.imageUrl} />
                <div className="course-col">
                    <p className="text-area">{data.description}</p>
                    <div className="course-row course-extras">
                        <div className="course-col">
                            <h3>Objetivos</h3>
                            <p className="text-area">{data.objective}</p>
                        </div>
                        <div className="course-col">
                            <h3>Incluye</h3>
                            <p className="text-area">{data.includes}</p>
                        </div>
                        <div className="course-col">
                            <h3>Temario</h3>
                            <p className="text-area">{data.temario}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Course;
