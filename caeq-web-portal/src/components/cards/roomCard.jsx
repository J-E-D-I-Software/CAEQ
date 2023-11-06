import { useNavigate } from "react-router-dom";
import BaseButton from "../buttons/BaseButton";
import RestrictByRole from '../restrictAccess/RestrictByRole';
import PhotoTemplate from '../../components/images/salon_foto.jpg';
import './roomCard.scss';

const RoomCard = ({showMoreBtn=true, ...props}) => {
    const navigate = useNavigate();

    return (
        <div className="room-card">
            <div className="card-col-1">
                <h2>{props.name}</h2>
                
                <p>${props.cost}</p>
                    
            </div>
            <div className="card-col-2">
                <a href={props.roomPhoto}>
                    {props.roomPhoto && props.roomPhoto!=="null" ? (
                
                        <img src={props.roomPhoto} />
                
                    ) : (
                        
                        <img src={PhotoTemplate} />
                    )}
                    
                </a> 
            
            </div>
            <div className="card-col-3">
                <p>Capacidad: {props.capacity} persona(s)</p>
                
                    <div className="card-button">
                            <BaseButton className="mb-1" type="primary" onClick={()=> navigate(`/Servicios/${props._id}`)}>
                                Ver detalles
                            </BaseButton>
                            
                        {showMoreBtn &&
                            <RestrictByRole allowedRoles={['caeq']}>
                                <BaseButton type="primary" onClick={()=> navigate(`/Servicios/Salon/${props._id}`)}>
                                    Modificar
                                </BaseButton>
                            </RestrictByRole>
                        }

                    </div>
            </div>
        </div>
    );
}

export default RoomCard;