import { Fragment } from 'react';
import { isAuthenticated } from '../../utils/auth';
import { Navigate } from 'react-router-dom';
import Navbar from '../navbar/Navbar';

const PrivateRoute = ({component: Component,  ...props}) => {
    return (
        isAuthenticated() ?
            <Fragment>
                <Navbar />
                <Component {...props} />
            </Fragment>
        :  <Navigate to="/" />
    );
}

export default PrivateRoute;
