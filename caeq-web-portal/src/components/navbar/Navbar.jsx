import NavbarButton from '../buttons/NavbarButton';
import BaseButton from '../buttons/BaseButton';
import BurgerMenu from './BurgerMenu';
import './Navbar.scss';
import routes from '../../routes';
import { useNavigate } from 'react-router-dom';
import RestrictByRole from '../restrictAccess/RestrictByRole';
import { logOut } from '../../utils/auth';

/**
 * Navbar component for navigation and user actions.
 * @component
 *
 * @returns {JSX.Element} JSX element representing the Navbar.
 *
 * @example
 * // Example usage of Navbar:
 * <Navbar />
 */
const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        logOut();
        navigate('/');
    };

    return (
        <div className='navbar'>
            <BurgerMenu />
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
        </div>
    );
};

export default Navbar;
