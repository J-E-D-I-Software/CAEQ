import React from 'react';
import './landingCAEQ.scss';
import Logo from '../../components/images/WhiteAdminLogo.png';
import { Link, useNavigate } from 'react-router-dom';
import BaseButton from '../../components/buttons/BaseButton';

const LandingCAEQ = () => {
    return (
        <div class='container'>
            <div class='column left-column'>
                <img src={Logo} alt='Logo' className='Logo' />
                <div className='title'>
                    <div className='main'>Portal Administrativo</div>
                    <div className='subtitle'>Todo en un solo lugar.</div>
                    <div className='button-container'>
                        <Link to='/LoginAdmin'>
                            <BaseButton>Iniciar sesión</BaseButton>
                        </Link>

                        <Link to='/SignupAdmin'>
                            <BaseButton type='primary'>Registrarse</BaseButton>
                        </Link>
                    </div>
                </div>
            </div>
            <div class='column right-column'>
                Si usted pertenece a la gerencia de la administración actual
                favor de ingresar con sus credenciales para acceder al sistema.
                <br />
                <br />
                En caso de que sea un nuevo empleado de la gerencia favor de
                registrarse.
            </div>
        </div>
    );
};

export default LandingCAEQ;
