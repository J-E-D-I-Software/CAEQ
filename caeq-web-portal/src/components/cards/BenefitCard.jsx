import { useNavigate } from 'react-router-dom';
import BaseButton from '../buttons/BaseButton';
import RestrictByRole from '../restrictAccess/RestrictByRole';
import LocationIcon from '../icons/Location.png';
import ContactIcon from '../icons/ContactIcon.png';
import DescriptionIcon from '../icons/DescriptionIcon.png';
import LinkIcon from '../icons/LinkIcon.png';
import Swal from 'sweetalert2';
import './BenefitCard.scss';

/**
 * Represents a BenefitCard component.
 *
 * @component
 * @param {Object} props - The properties of the BenefitCard component.
 * @param {boolean} [props.showMoreBtn=true] - Determines whether to show the "Show More" button.
 * @param {string} props.name - The name of the benefit.
 * @param {string} props.category - The category of the benefit.
 * @param {string} props.description - The description of the benefit.
 * @param {string} props.contact - The contact information for the benefit.
 * @param {string} [props.location] - The location of the benefit.
 * @param {string} [props.website] - The website URL for the benefit.
 * @param {string} props._id - The unique identifier of the benefit.
 * @returns {JSX.Element} The rendered BenefitCard component.
 */
const BenefitCard = ({ showMoreBtn = true, ...props }) => {
    const navigate = useNavigate();

    let description = props.description.slice(0, 350);
    if (props.description.length > 350)
        description += '... Favor de dar click en ver detalles para más información.';
    console.log(description);
    return (
        <div className='benefit-card'>
            <div className='gathering-card--title'>{props.name}</div>
            <div className='gathering-card--title--secondary'>{props.category}</div>
            <div className='gathering-card--row--icon'>
                <img src={DescriptionIcon} height={30} alt='Icono descripcion' />
                <p>{description}</p>
            </div>
            <div className='gathering-card--row--icon'>
                <img src={ContactIcon} height={30} alt='Icono contacto' />
                <p>{props.contact}</p>
            </div>
            <div className='gathering-card--row--data'>
                {props.location ? (
                    <div className='gathering-card--row--icon'>
                        <img src={LocationIcon} height={30} alt='Icono ubicación' />
                        <p>{props.location}</p>
                    </div>
                ) : (
                    <></>
                )}
                {props.website ? (
                    <div className='gathering-card--row--icon'>
                        <img src={LinkIcon} height={30} alt='Icono link' />
                        <p>
                            <a href={props.website}>Sitio web del beneficio</a>
                        </p>
                    </div>
                ) : (
                    <></>
                )}
            </div>
            <div className='gathering-card--row--buttons'>
                <RestrictByRole allowedRoles={['caeq']}>
                    <BaseButton
                        type='delete'
                        onClick={() => navigate(`/Beneficio/${props._id}`)}>
                        <p>Editar</p>
                    </BaseButton>
                </RestrictByRole>
                <BaseButton
                    type='primary'
                    onClick={() =>
                        Swal.fire({
                            title: props.name,
                            html: `<b>Descripción: </b><p className="line-component" style="white-space: pre-line;">${
                                props.description
                            }</p><br><br><b>Contacto: </b>${props.contact}<br><br>${
                                props.location
                                    ? `<b>Ubicación: </b>${props.location}<br>`
                                    : ''
                            }${
                                props.website
                                    ? `<br><b>Sitio web: </b>${props.website}`
                                    : ''
                            }`,
                            confirmButtonColor: '#136F63',
                        })
                    }>
                    <p>Ver detalles</p>
                </BaseButton>
            </div>
        </div>
    );
};

export default BenefitCard;
