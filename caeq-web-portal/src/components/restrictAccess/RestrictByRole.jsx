import { getUserType } from '../../utils/auth';

/**
 * RestrictByRole component for rendering children components based on user roles.
 * This component checks the role (type) of the user and renders the children components
 * if the user role matches one of the allowed roles.
 * @component
 *
 * @param {Object} props - The component's properties.
 * @param {React.ReactNode} props.children - The components to be rendered if the user's role matches.
 * @param {string[]} [props.allowedRoles=['architect', 'caeq']] - An array of allowed user roles.
 * @returns {JSX.Element|null} JSX element representing the RestrictByRole or null if the user's role doesn't match.
 *
 * @example
 * // Example usage of RestrictByRole:
 * <RestrictByRole allowedRoles={['caeq']}>
 *   <AdminDashboard />
 * </RestrictByRole>
 */
const RestrictByRole = ({ children, allowedRoles = ['architect', 'caeq'] }) => {
    const userRole = getUserType();

    if (allowedRoles.includes(userRole)) return children;
    return <></>;
};

export default RestrictByRole;
