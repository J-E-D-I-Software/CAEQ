import { isAuthenticated } from '../../utils/auth';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({component: Component,  ...props}) => {
    return (
        isAuthenticated() ?
            <Component {...props} />
        :  <Navigate to="/Login" />
    );
}

export default PrivateRoute;
