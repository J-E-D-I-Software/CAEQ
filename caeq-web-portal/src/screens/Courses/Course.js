import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCourse } from '../../client/Course/Course.GET';
import { createInscription } from '../../client/Inscription/Inscription.POST';
import { startPayment } from '../../client/Payment/Payment.POST'; // Importa la función para iniciar el proceso de pago
import {
    FireError,
    FireSucess,
    FireLoading,
    FireQuestion,
} from '../../utils/alertHandler';
import { formatDate } from '../../utils/format';
import { currencyFormat } from '../../utils/reusableFunctions';
import BaseButton from '../../components/buttons/BaseButton';
import DropdownInput from '../../components/inputs/DropdownInput/DropdownInput';
import ClassroomIcon from '../../components/icons/Classroom.png';
import LocationIcon from '../../components/icons/Location.png';
import ClockIcon from '../../components/icons/Clock.png';
import TeacherIcon from '../../components/icons/Teacher.png';
import CalendarIcon from '../../components/icons/Calendar.png';
import RestrictByRole from '../../components/restrictAccess/RestrictByRole';
import FileInput from '../../components/inputs/FileInput/FileInput';
import './course.scss';

const Course = (props) => {
    const searchParams = useParams();
    const navigate = useNavigate();
    const [paymentFile, setPaymentFile] = useState('');
    const [wantsInvoice, setInvoice] = useState('');
    const [data, setData] = useState({});
    const decide = ['SÍ', 'NO'];

    // Pedir las inscripciones donde el user._id sea igual a SavedUser._id.
    //
    useEffect(() => {
        if (searchParams.id) {
            getCourse(searchParams.id)
                .then((response) => setData(response))
                .catch(() => navigate('/404'));
        }
    }, [navigate, searchParams.id]);

    let startDate = null;
    let endDate = null;
    if (data?.startDate && data?.endDate) {
        startDate = new Date(data.startDate);
        endDate = new Date(data.endDate);
    }

    const handleInscription = async (e) => {
        try {
            const confirmation = await FireQuestion(
                '¿Quiere inscribirse a este curso?',
                'La inscripción no tiene costo.'
            );

            if (!confirmation.isConfirmed) {
                return;
            }

            const swal = FireLoading('Inscribiéndote al curso...');
            const response = await createInscription(searchParams.id);
            if (response.status === 'success') {
                FireSucess('Inscripción exitosa.');
                navigate('/Cursos');
            }
            swal.close();
        } catch (error) {
            FireError(error?.response?.data?.message || error?.message);
        }
    };

    const handlePaymentStart = async () => {
        try {
            const confirmation = await FireQuestion(
                '¿Quiere subir su comprobante de pago?',
                'El Área Administrativa revisará su comprobante de pago. De ser aceptado se le inscribirá al curso automáticamente.'
            );

            if (!confirmation.isConfirmed) {
                return;
            }

            if (!paymentFile) {
                FireError('Por favor, seleccione un archivo de comprobante de pago.');
                return;
            }

            const form = new FormData();

            form.append('courseId', searchParams.id);
            form.append('billImageURL', paymentFile);
            const isWantsInvoice = wantsInvoice === 'SÍ' ? true : false;
            form.append('wantsInvoice', isWantsInvoice);

            const swal = FireLoading('Iniciando proceso de pago...');
            const response = await startPayment(form);
            if (response.status === 'success') {
                FireSucess('Pago enviado con éxito.');
                navigate('/Cursos');
            }
            swal.close();
        } catch (error) {
            FireError(error?.response?.data?.message || error?.message);
        }
    };

    return (
        <div className='course'>
            <div className='course-row'>
                <h1>{data.courseName}</h1>
                <h1 className='course-price'>
                    {data.price ? `${currencyFormat(data.price)}` : 'Gratuito'}
                </h1>
                <RestrictByRole allowedRoles={['caeq']}>
                    <BaseButton
                        type='primary'
                        onClick={() => navigate(`/Cursos/Curso/${searchParams.id}`)}>
                        Modificar
                    </BaseButton>
                </RestrictByRole>
                <RestrictByRole allowedRoles={['architect']}>
                    {data.price ? ( // Verifica si el curso tiene precio
                        <></>
                    ) : (
                        <BaseButton type='primary' onClick={(e) => handleInscription(e)}>
                            Inscribirme
                        </BaseButton>
                    )}
                </RestrictByRole>
            </div>

            <div className='course-details-header'>
                <div className='course-details-row'>
                    {data.modality && (
                        <div>
                            <img src={ClassroomIcon} height={40} />
                            <p>
                                <span>Curso {data.modality}</span>
                            </p>
                        </div>
                    )}
                    {data.place && (
                        <div>
                            <img src={LocationIcon} height={40} />
                            <span>
                                <p>Lugar</p>
                                <p>{data.place}</p>
                            </span>
                        </div>
                    )}
                    {data.numberHours && (
                        <div>
                            <img src={ClockIcon} height={40} />
                            <span>
                                <p>Horas totales acreditadas</p>
                                <p>{data.numberHours} hrs</p>
                            </span>
                        </div>
                    )}
                    {data.teacherName && (
                        <div>
                            <img src={TeacherIcon} height={40} />
                            <span>
                                <p>Impartido por</p>
                                <p>{data.teacherName}</p>
                            </span>
                        </div>
                    )}
                </div>
                <div className='course-details-row'>
                    {startDate && endDate && (
                        <div>
                            <img src={CalendarIcon} height={40} />
                            {startDate && endDate && (
                                <p>
                                    Empieza el{' '}
                                    {formatDate(startDate.toISOString().slice(0, 10))}
                                </p>
                            )}
                        </div>
                    )}
                    {startDate && endDate && (
                        <div>
                            <img src={CalendarIcon} height={40} />
                            {startDate && endDate && (
                                <p>
                                    Finaliza el{' '}
                                    {formatDate(endDate.toISOString().slice(0, 10))}
                                </p>
                            )}
                        </div>
                    )}
                    {data.daysOfSession && (
                        <div>
                            <p>
                                <strong>Días de sesión: </strong>
                                {data.daysOfSession}
                            </p>
                        </div>
                    )}
                    {data.schedule && (
                        <div>
                            <p>
                                <strong>Horario: </strong>
                                {data.schedule}
                            </p>
                        </div>
                    )}
                </div>
            </div>

            <div className='course-row course-details'>
                <img src={data.imageUrl} />
                <div className='course-col'>
                    {data.description && <p className='text-area'>{data.description}</p>}
                    {data.teacherReview && (
                        <span>
                            <p>Reseña</p>
                            <p className='course-review'>"{data.teacherReview}"</p>
                        </span>
                    )}
                    {data.objective || data.includes || data.temario ? (
                        <div className='course-row course-extras'>
                            {data.objective && (
                                <div className='course-col'>
                                    <h3>Objetivos</h3>
                                    <p className='text-area'>{data.objective}</p>
                                </div>
                            )}
                            {data.includes && (
                                <div className='course-col'>
                                    <h3>Incluye</h3>
                                    <p className='text-area'>{data.includes}</p>
                                </div>
                            )}
                            {data.temario && (
                                <div className='course-col'>
                                    <h3>Temario</h3>
                                    <p className='text-area'>{data.temario}</p>
                                </div>
                            )}
                        </div>
                    ) : (
                        <></>
                    )}
                    {data.price !== undefined &&
                        data.price !== null &&
                        data.price !== 0 && (
                            <>
                                {' '}
                                {''}
                                <p>
                                    Para que inicie el proceso de pago debe hacer un
                                    depósito o transferencia a la siguiente{' '}
                                    <u>información de pago.</u>
                                </p>
                                <p>
                                    Posteriormente suba su <u>comprobante de pago</u> en
                                    el siguiente formulario:
                                </p>
                                <h3>Información de Pago</h3>
                                <span>{data.paymentInfo}</span>
                                <hr></hr>
                                <RestrictByRole allowedRoles={['architect']}>
                                    <h3>Costo del Curso</h3>
                                    <h2 className='course-price-2'>
                                        {data.price
                                            ? `${currencyFormat(data.price)}`
                                            : 'Gratuito'}
                                    </h2>
                                    <DropdownInput
                                        label='¿Requiere factura?'
                                        options={decide}
                                        getVal={wantsInvoice}
                                        setVal={setInvoice}
                                    />
                                    <hr></hr>
                                    <FileInput
                                        label='Subir Comprobante'
                                        accept='.jpg,.jpeg,.png,.pdf'
                                        getVal={() => paymentFile}
                                        setVal={(file) => setPaymentFile(file)}
                                    />
                                    <hr></hr>

                                    <BaseButton
                                        type='primary'
                                        onClick={(e) => handlePaymentStart(e)}>
                                        Iniciar Proceso de Inscripción
                                    </BaseButton>
                                </RestrictByRole>
                            </>
                        )}
                </div>
            </div>
        </div>
    );
};

export default Course;
