import React from 'react';
import './landingArchitect.scss';
import Logo from '../../components/images/caeqLogo.png';
import Image1 from '../../components/images/imageCAEQhome.png';
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
            <div className='welcome'>
                <div className='column left-column'>
                    <img src={Logo} alt='Logo' className='logo' />
                    <div className='titlecaeq'>Bienvenidos al portal del CAEQ</div>
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
                        <div class="solid"/>
                    </div>
                </div>
                <div className='column right-column'>
                    <div className='adminbutton'>
                        <Link to='/welcomeAdmin'>
                            <BaseButton type='disabled'>Familia CAEQ</BaseButton>
                        </Link>
                    </div>
                    <img src={Image1} alt='Image1' className='image1' />
                </div>
            </div>
            <div className='infocaeq'>
                <div className='column left-column'>
                    <img src={Image3} alt='Image3' className='image3' />
                </div>
                <div className='column right-column'>
                    <div className='titleOne'>C A E Q</div>
                    <div className='descOne'>
                        Espacio de expresión, opinión, colaboración y capacitación para
                        promover e impulsar el mejoramiento arquitectónico y urbano de
                        Querétaro.
                    </div>
                </div>
            </div>
            <div className='infocaeq'>
                <div className='column left-column'>
                    <div className='titleTwo'>Objetivos</div>
                    <div className='descTwo'>
                        Integrar a los profesionistas de la arquitectura, promoviendo, la
                        participación dentro del gremio.
                    </div>
                </div>
                <div className='column right-column'>
                    <img src={Image2} alt='Image2' className='image2' />
                </div>
            </div>

            <div className='values'>
                <div className='titleThree'>Valores</div>
                <div className='descThree'>
                    HONESTIDAD | LEALTAD | TRANSPARENCIA | PROFESIONALISMO
                </div>
            </div>
        </div>
    );
};

export default LandingArchitect;
