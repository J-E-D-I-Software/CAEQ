import { useNavigate } from 'react-router-dom';
import BaseButton from '../buttons/BaseButton';
import RestrictByRole from '../restrictAccess/RestrictByRole';
import './BenefitCard.scss';
import { currencyFormat } from '../../utils/reusableFunctions';

const BenefitCard = ({ showMoreBtn = true, ...props }) => {
    const navigate = useNavigate();

    let description = props.description.slice(0, 130);
    if (props.description.length > 130) description += '...';

    const date = new Date(props.startDate);

    return (
        <div className='benefit-card'>
            <div className='card-col'>
                <div className='card-row m-1 center'>
                    <h2>{props.name}</h2>
                </div>
                <div className='card-row m-1 center'>
                    <h3>{props.category}</h3>
                </div>
                <div className='card-row m-1'>
                    <p>{props.description}</p>
                </div>
                <div className='card-row m-1'>
                    <p>{props.contact}</p>
                </div>
                <div className='card-row'>
                    <div className='card-icon-text'>
                        <p>{props.location}</p>
                    </div>
                    <div className='card-icon-text'>
                        <p>{props.website}</p>
                    </div>
                </div>
                <div className='card-row'>
                    <div>
                        {showMoreBtn && (
                            <BaseButton
                                className='mb-1'
                                type='primary'
                                onClick={() => navigate(`/Curso/${props._id}`)}>
                                Ver más
                            </BaseButton>
                        )}
                        {showMoreBtn && (
                            <RestrictByRole allowedRoles={['caeq']}>
                                <BaseButton
                                    type='primary'
                                    onClick={() =>
                                        navigate(`/Cursos/Curso/${props._id}`)
                                    }>
                                    Modificar
                                </BaseButton>
                            </RestrictByRole>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BenefitCard;
