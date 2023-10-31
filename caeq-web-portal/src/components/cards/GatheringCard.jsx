import React from 'react';
import { useNavigate } from 'react-router-dom';
import BaseButton from '../buttons/BaseButton';
import RestrictByRole from '../restrictAccess/RestrictByRole';
import LocationIcon from '../../components/icons/Location.png';
import ClockIcon from '../../components/icons/Clock.png';
import CalendarIcon from '../../components/icons/Calendar.png';
import DownloadActive from '../../components/images/download-active.png';
import DownloadInactive from '../../components/images/download-inactive.png';
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
        const date = new Date(dateString);
        const options = { year: '2-digit', month: '2-digit', day: '2-digit' };
        return new Intl.DateTimeFormat('es-ES', options).format(date);
    }
    

    return (
        <div className='gathering-card'>
            <div className='gathering-card--title'>
                {data.title ? data.title : `Asamblea del ${data.date}`}
            </div>
            <div className='gathering-card--subtitle'>Convocatoria</div>
            <a href={data.moreInfo}>
                {data.moreInfo ? (
                    <img
                        className='image-more-info'
                        src={DownloadActive}
                        alt='Descargar convocatoria'
                    />
                ) : (
                    <img
                        className='image-more-info'
                        src={DownloadInactive}
                        alt='Descargar convocatoria'
                    />
                )}
            </a>
            <div className='gathering-card--row'>
                <div className='gathering-card--row--icon'>
                    <img src={ClockIcon} height={30} />
                    <p>{data.meetingTime ? data.meetingTime : 'No hay horario'}</p>
                </div>
            </div>
            <div className='gathering-card--row'>
                <div className='gathering-card--row--icon'>
                    <img src={CalendarIcon} height={30} />
                    <p>{data.date ? formatDateToDdMmYy(data.date) : 'No hay fecha'}</p>
                </div>
            </div>
            <div className='gathering-card--row'>
                <div className='gathering-card--row--icon'>
                    <img src={LocationIcon} height={30} />
                    <p>
                        <a href={data.meetingLink}>Link de zoom</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default GatheringCard;
