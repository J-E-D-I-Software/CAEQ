import { getUserType } from '../../utils/auth';

/**  
 * This component checks the role (type) of the user saved and renders the component
 * if it matches in the allowed roles
*/
const RestrictByRole = ({children, allowedRoles=['architect', 'staff']}) => {
    const userRole = getUserType();
    
    if (allowedRoles.includes(userRole))
        return children;
    return <></>;
};

export default RestrictByRole;
