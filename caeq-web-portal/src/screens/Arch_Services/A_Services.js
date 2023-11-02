import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import WhiteContainer from '../../components/containers/WhiteCard/WhiteCard';
import BaseButton from "../../components/buttons/BaseButton";

const Services = () => {
    const navigate = useNavigate();

    return (
        <div>
            <div>
                <h1>Servicios</h1>
            </div>
            <div>
                <h2>Renta de Salones</h2>
            </div>
            <div>
                <h2>Cotización de Bitácoras</h2>
            </div>
            <div>
                <BaseButton type='primary' onClick={() => navigate('/Perfil')}>
                    Descargar Tabulador
                </BaseButton>
            </div>
        </div>
    );
};

export default Services;