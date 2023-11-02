import { Navigate, useNavigate } from "react-router-dom";
import BaseButton from "../../components/buttons/BaseButton";
import './Services.scss';

const Services = () => {
    const navigate = useNavigate();

    return (
        <div className="services">
            <div className="services-title">
                <h1>Servicios CAEQ</h1>
            </div>
            <div className="services-content">
                <div className="services-subtitle">
                    <h1>Renta de salones</h1>
                    <BaseButton type='primary' onClick={() => navigate('/Servicios/CrearSalon')}>
                        Ofertar salón
                    </BaseButton>
                </div>
            </div>
        </div>
    );
};

export default Services;