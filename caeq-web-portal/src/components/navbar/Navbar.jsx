import NavbarButton from '../buttons/NavbarButton';
import BaseButton from '../buttons/BaseButton';
import './Navbar.scss';
import routes from '../../routes';
import { useNavigate } from 'react-router-dom';
import RestrictByRole from '../restrictAccess/RestrictByRole';

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

    return (
        <div className='navbar'>
            <div className='navbar-button'>
                <BaseButton type='fail'>Cerrar sesión</BaseButton>
            </div>
            <div className='navbar-center'>
                {routes
                    .filter((route) => route.inNavbar)
                    .map((route) => (
                        <RestrictByRole
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
