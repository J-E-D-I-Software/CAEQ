import { useNavigate } from 'react-router-dom';
import BaseButton from '../buttons/BaseButton';
import RestrictByRole from '../restrictAccess/RestrictByRole';
import PhotoTemplate from '../../components/images/salon_foto.jpg';
import { FireError, FireLoading, FireSucess } from '../../utils/alertHandler';
import Swal from 'sweetalert2';
import './roomCard.scss';
import { currencyFormat } from '../../utils/reusableFunctions';

const RoomCard = ({ showMoreBtn = true, ...props }) => {
    const navigate = useNavigate();

    return (
        <div className='room-card'>
            <div className='card-col-1'>
                <h2>{props.name}</h2>

                <p>
                    {props.cost == 0
                        ? 'Renta gratuita'
                        : currencyFormat(props.cost) + ' + IVA'}
                </p>
            </div>
            <div className='card-col-2'>
                <a href={props.roomPhoto}>
                    {props.roomPhoto && props.roomPhoto !== 'null' ? (
                        <img src={props.roomPhoto} />
                    ) : (
                        <img src={PhotoTemplate} />
                    )}
                </a>
            </div>
            <div className='card-col-3'>
                <p>Capacidad: {props.capacity} persona(s)</p>

                <div className='card-button'>
                    <BaseButton
                        className='mb-1'
                        type='primary'
                        onClick={() =>
                            Swal.fire({
                                title: props.name,
                                html: props.specifications
                                    ? props.specifications.replaceAll('-', '<br>-')
                                    : 'No hay más detalles de este salón.',
                                imageUrl:
                                    props.roomPhoto && props.roomPhoto !== 'null'
                                        ? props.roomPhoto
                                        : PhotoTemplate,
                                imageWidth: 400,
                                imageAlt: 'Custom image',
                                confirmButtonColor: '#136F63',
                            })
                        }>
                        Ver detalles
                    </BaseButton>

                    {showMoreBtn && (
                        <RestrictByRole allowedRoles={['caeq']}>
                            <BaseButton
                                type='primary'
                                onClick={() => navigate(`/Servicios/Salon/${props._id}`)}>
                                Modificar
                            </BaseButton>
                        </RestrictByRole>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RoomCard;
