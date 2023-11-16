import NavbarButton from '../buttons/NavbarButton';
import BaseButton from '../buttons/BaseButton';
import Navbar from './Navbar';
import './BurgerMenu.scss';
import routes from '../../routes';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RestrictByRole from '../restrictAccess/RestrictByRole';
import { logOut } from '../../utils/auth';
import {slide as Menu} from 'react-burger-menu'

const BurgerMenu = () => {
    const navigate = useNavigate();
    const [state, setState] = useState({menuOpen: false})

    const handleLogout = () => {
        logOut();
        navigate('/');
    };

    const handleStateChange = (state) => {
        setState({menuOpen: state.isOpen})
    }

    const closeMenu = () => {
        setState({menuOpen: false})
    }

    return (
        <div className='topNav'>
           <h2>Menú</h2>
            <Menu left 
                isOpen={state.menuOpen}
                onStateChange={(state) => handleStateChange(state)}
             >
                <div className='burguer-button'>
                    <BaseButton type='fail' onClick={handleLogout}>
                        Cerrar sesión
                    </BaseButton>
                </div>
                <div className='burguer-center' >
                    {routes
                        .filter((route) => route.inNavbar)
                        .map((route, index) => (
                            <RestrictByRole
                                key={index}
                                allowedRoles={
                                    route.roles !== undefined
                                        ? route.roles
                                        : ['architect', 'caeq']
                                }>
                                <a onClick={() => closeMenu()}>
                                <NavbarButton
                                    label={route.name}
                                    key={route.path}
                                    id='inicio_btn'
                                    icon={route.icon}
                                    iconWhite={route.iconWhite}
                                    action={() => navigate(route.path)}
                                    to={route.path}
                                />
                                </a>
                            </RestrictByRole>
                        ))}
                </div>
                
            </Menu>
        </div>
    );
}

export default BurgerMenu;