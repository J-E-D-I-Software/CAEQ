import React from 'react';
import './landingCAEQ.scss';
import Logo from '../../components/images/WhiteAdminLogo.png';
import { Link, useNavigate } from 'react-router-dom';
import BaseButton from '../../components/buttons/BaseButton';

const LandingCAEQ = () => {
    return (
        <div className='landing-admin-container'>
            <div className='column left-column'>
                <img src={Logo} alt='Logo' className='Logo' />
                <div className='title'>
                    <div className='main'>Portal Administrativo</div>
                    <div className='subtitle'>Todo en un solo lugar.</div>
                </div>
                <div className='button-container'>
                    <Link to='/LoginAdmin'>
                        <BaseButton>Iniciar sesión</BaseButton>
                    </Link>

                    <Link to='/SignupAdmin'>
                        <BaseButton type='primary'>Registrarse</BaseButton>
                    </Link>
                </div>
            </div>

            <div className='column right-column'></div>
        </div>
    );
};

export default LandingCAEQ;
