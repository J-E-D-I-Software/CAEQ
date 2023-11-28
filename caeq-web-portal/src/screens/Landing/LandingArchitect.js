import React from 'react';
import './landingArchitect.scss';
import Logo from '../../components/images/caeqLogo.png';
import Image1 from '../../components/images/Landing_Image.svg';
import Image2 from '../../components/images/imageCAEQ2.png';
import Image3 from '../../components/images/imageCAEQ3.png';
import { Link } from 'react-router-dom';
import BaseButton from '../../components/buttons/BaseButton';

/**
 * LandingArchitect is a welcome screen for all architechts to get to know more about CAEQ and see public info
 * @returns Landing Architect page
 */
const LandingArchitect = () => {
    return (
        <div className='containercaeq'>
            <div className='imagen-oscura'></div>
            <div className='welcome'>
                <div className='column left-column'>
                    <img src={Logo} alt='Logo' className='logo' />
                    <div className='titlecaeq'>Bienvenidos al portal CAEQ</div>
                    <p className='subtitlecaeq'>
                        Un nuevo espacio de consulta informativa.
                    </p>
                    <div className='button-container'>
                        <Link to='/LoginUser'>
                            <BaseButton>Iniciar sesión</BaseButton>
                        </Link>

                        <Link to='/SignupUser'>
                            <BaseButton type='primary'>Registrarse</BaseButton>
                        </Link>
                        <div className='solid' />
                    </div>
                </div>
                <div className='column right-column'>
                    <div className='adminbutton'>
                        <Link to='/welcomeAdmin'>
                            <BaseButton type='disabled'>Administración CAEQ</BaseButton>
                        </Link>
                    </div>
                    <img src={Image1} alt='Image1' className='image1' />
                </div>
            </div>
        </div>
    );
};

export default LandingArchitect;
