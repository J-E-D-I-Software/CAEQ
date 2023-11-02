import { Navigate, useNavigate } from "react-router-dom";
import BaseButton from "../../components/buttons/BaseButton";

const Services = () => {
    const navigate = useNavigate();

    return (
        <div>
            <div>
                <h1>Servicios</h1>
            </div>
            <div>
                <BaseButton type='primary' onClick={() => navigate('/Servicios/CrearSalon')}>
                    Ofertar salón
                </BaseButton>
            </div>
        </div>
    );
};

export default Services;