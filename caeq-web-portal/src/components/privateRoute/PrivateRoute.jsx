import { Fragment } from 'react';
import { isAuthenticated, getUserType } from '../../utils/auth';
import { Navigate } from 'react-router-dom';
import Navbar from '../navbar/Navbar';

/**
 * PrivateRoute component for rendering a component if the user is authenticated.
 * If the user is not authenticated, it redirects to the home page.
 * @component
 *
 * @param {Object} props - The component's properties.
 * @param {React.Component} props.component - The component to render if the user is authenticated.
 * @returns {JSX.Element} JSX element representing the PrivateRoute.
 *
 * @example
 * // Example usage of PrivateRoute:
 * <PrivateRoute component={Dashboard} />
 */
const PrivateRoute = ({ component: Component, roles, ...props }) => {
    return isAuthenticated() && roles.includes(getUserType()) ? (
        <Fragment>
            <Navbar />
            <Component {...props} />
        </Fragment>
    ) : (
        <Navigate to='/' />
    );
};

export default PrivateRoute;
