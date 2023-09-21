import Dasbboard from './screens/Dasboard';
import Test from './screens/Test';
import LoginAdmin from './screens/LoginAdmin';
import LoginUser from './screens/LoginUser';
import RegisterAdmin from './screens/SignupAdmin';
import RegisterUser from './screens/SingupArchitect';

import CursosIcon from '../src/components/icons/CursosIcon.png';
import PrincipalIcon from '../src/components/icons/PrincipalIcon.png';

const routes = [
    {
        path: '/',
        name: 'Principal',
        Component: Dasbboard,
        icon: PrincipalIcon,
        isPrivate: false,
        inNavbar: true,
    },
    {
        path: '/Cursos',
        name: 'Cursos',
        icon: CursosIcon,
        Component: Test,
        isPrivate: true,
        inNavbar: true,
    },
    {
        path: '/LoginAdmin',
        name: 'LoginAdmin',
        Component: LoginAdmin,
        isPrivate: false,
        inNavbar: false,
    },
    {
        path: '/LoginUser',
        name: 'LoginUser',
        Component: LoginUser,
        isPrivate: false,
        inNavbar: false,
    },
    {
        path: '/SignupAdmin',
        name: 'Registrar Admin',
        Component: RegisterAdmin,
        isPrivate: false,
        inNavbar: false,
    },
    {
        path: '/SignupUser',
        name: 'Registrar User',
        Component: RegisterUser,
        isPrivate: false,
        inNavbar: false,
    },
];

export default routes;
