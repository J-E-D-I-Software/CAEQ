import NavbarButton from '../buttons/NavbarButton';
import BaseButton from '../buttons/BaseButton';
import Navbar from './Navbar';
import './BurgerMenu.scss';
import routes from '../../routes';
import { useNavigate } from 'react-router-dom';
import RestrictByRole from '../restrictAccess/RestrictByRole';
import { logOut } from '../../utils/auth';
import {slide as Menu} from 'react-burger-menu'

const BurgerMenu = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        logOut();
        navigate('/');
    };

    return (
        <Menu right>
            <div className='navbar-button'>
                <BaseButton type='fail' onClick={handleLogout}>
                    Cerrar sesión
                </BaseButton>
            </div>
            <div className='navbar-center'>
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
                            <NavbarButton
                                label={route.name}
                                key={route.path}
                                id='inicio_btn'
                                icon={route.icon}
                                iconWhite={route.iconWhite}
                                action={() => navigate(route.path)}
                                to={route.path}
                            />
                        </RestrictByRole>
                    ))}
            </div>
        </Menu>
    );
}

export default BurgerMenu;