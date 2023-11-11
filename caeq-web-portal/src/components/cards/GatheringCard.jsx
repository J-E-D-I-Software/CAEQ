import React from 'react';
import { useNavigate } from 'react-router-dom';
import BaseButton from '../buttons/BaseButton';
import RestrictByRole from '../restrictAccess/RestrictByRole';
import LocationIcon from '../../components/icons/Location.png';
import ClockIcon from '../../components/icons/Clock.png';
import CalendarIcon from '../../components/icons/Calendar.png';
import DownloadActive from '../../components/images/download-active.png';
import DownloadInactive from '../../components/images/download-inactive.png';
import FlechaIcon from '../../components/icons/flechaIcon.png';
import './GatheringCard.scss';

/**
 * Represents a card for displaying gathering information.
 *
 * @param {Object} props - The component's properties.
 * @param {Object} data - The gathering data to be displayed.
 */
const GatheringCard = ({ data, ...props }) => {
    const navigate = useNavigate();

    // Function to format the date to "dd/mm/yy"
    function formatDateToDdMmYy(dateString) {
        const [year, month, day] = dateString.split('-');

        // Crea una fecha en UTC para evitar problemas de zona horaria
        const date = new Date(Date.UTC(year, month - 1, day));

        return date.toLocaleDateString('es-MX');
    }

    const handleButtonClick = () => {
        if (data.moreInfo) {
            window.location.href = data.moreInfo;
        }
    };

    return (
        <div className="gathering-card">
            <div className="gathering-card--title">
                {data.title ? data.title : `Asamblea del ${data.date}`}
            </div>
            <div className="gathering-card--subtitle">Convocatoria</div>
            <div className="gathering-card--row">
                <BaseButton
                    type={data.moreInfo ? 'primary' : 'disabled'}
                    className="download-button"
                    onClick={handleButtonClick}
                    disabled={!data.moreInfo}
                >
                    {data.moreInfo
                        ? 'Descargar Convocatoria'
                        : 'Convocatoria no disponible'}
                </BaseButton>
            </div>
            <div className="gathering-card--row">
                <div className="gathering-card--row--icon">
                    <img src={ClockIcon} height={30} />
                    <p>{data.meetingTime ? data.meetingTime : 'No hay horario'}</p>
                </div>
            </div>
            <div className="gathering-card--row">
                <div className="gathering-card--row--icon">
                    <img src={CalendarIcon} height={30} />
                    <p>{data.date ? data.date.substring(0, 10) : 'No hay fecha'}</p>
                </div>
            </div>
            <div className="gathering-card--row">
                <div className="gathering-card--row--icon">
                    <img src={FlechaIcon} height={30} />
                    <p>
                        <a href={data.meetingLink}>Link de zoom</a>
                    </p>
                </div>
            </div>
            {data._id ? (
                <div className="gathering-card--row--buttons">
                    <RestrictByRole allowedRoles={['caeq']}>
                        <BaseButton
                            type="primary"
                            onClick={() => navigate(`/Asambleas/Asistencias/${data._id}`)}
                        >
                            Asistencias
                        </BaseButton>
                        <BaseButton
                            type="primary"
                            onClick={() => navigate(`/Asambleas/Asamblea/${data._id}`)}
                        >
                            Editar
                        </BaseButton>
                    </RestrictByRole>
                </div>
            ) : (
                <></>
            )}
        </div>
    );
};

export default GatheringCard;
