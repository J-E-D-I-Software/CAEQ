import { useNavigate } from 'react-router-dom';
import BaseButton from '../buttons/BaseButton';
import RestrictByRole from '../restrictAccess/RestrictByRole';
import LocationIcon from '../icons/Location.png';
import ContactIcon from '../icons/ContactIcon.png';
import DescriptionIcon from '../icons/DescriptionIcon.png';
import LinkIcon from '../icons/LinkIcon.png';
import './BenefitCard.scss';

const BenefitCard = ({ showMoreBtn = true, ...props }) => {
    const navigate = useNavigate();

    return (
        <div className='benefit-card'>
            <div className='gathering-card--title'>{props.name}</div>
            <div className='gathering-card--title--secondary'>{props.category}</div>
            <div className='gathering-card--row'>
                <div className='gathering-card--row--icon'>
                    <img src={DescriptionIcon} height={30} />
                    <p>{props.description}</p>
                </div>
            </div>
            <div className='gathering-card--row'>
                <div className='gathering-card--row--icon'>
                    <img src={ContactIcon} height={30} />
                    <p>{props.contact}</p>
                </div>
            </div>
            <div className='gathering-card--row--data'>
                {props.location ? (
                    <div className='gathering-card--row--icon'>
                        <img src={LocationIcon} height={30} />
                        <p>{props.location}</p>
                    </div>
                ) : (
                    <></>
                )}
                {props.website ? (
                    <div className='gathering-card--row--icon'>
                        <img src={LinkIcon} height={30} />
                        <p>
                            <a href={props.website}>Link de zoom</a>
                        </p>
                    </div>
                ) : (
                    <></>
                )}
            </div>
            {/* {data._id ? (
                <div className='gathering-card--row--buttons'>
                    <RestrictByRole allowedRoles={['caeq']}>
                        <BaseButton
                            type='primary'
                            onClick={() =>
                                navigate(`/Asambleas/Asistencias/${data._id}`)
                            }>
                            Asistencias
                        </BaseButton>
                        <BaseButton
                            type='primary'
                            onClick={() => navigate(`/Asambleas/Asamblea/${data._id}`)}>
                            Editar
                        </BaseButton>
                    </RestrictByRole>
                </div>
            ) : (
                <></>
            )} */}
        </div>
    );
};

export default BenefitCard;
