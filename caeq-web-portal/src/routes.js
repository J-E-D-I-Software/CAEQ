import Dasbboard from './screens/Dasboard';
import Test from './screens/Test';
import LoginAdmin from './screens/LoginAdmin';
import LoginUser from './screens/LoginUser';
import RegisterAdmin from './screens/SignupAdmin';
import RegisterUser from './screens/SingupArchitect';
import Courses from './screens/Courses';
import Course from './screens/Course';

import CursosIcon from '../src/components/icons/CursosIcon.png';
import PrincipalIcon from '../src/components/icons/PrincipalIcon.png';
import BaseButton from './components/buttons/BaseButton';
import RestrictByRole from './components/restrictAccess/RestrictByRole.jsx';

const routes = [
    // TO-DO: CORREGIR ESTAS RUTAS
    {
        path: '/',
        name: 'Principal',
        Component: Dasbboard,
        icon: PrincipalIcon,
        isPrivate: false,
        inNavbar: true,
    },
    {
        path: '/Principal',
        name: 'Principal',
        Component: () => (
        <div>
        </div>
        ),
        icon: PrincipalIcon,
        isPrivate: true,
        inNavbar: true,
    },
    {
        path: '/Cursos',
        name: 'Cursos',
        icon: CursosIcon,
        Component: Courses,
        isPrivate: true,
        inNavbar: true,
    },
    {
        path: '/Curso/:id',
        name: 'Cursos',
        icon: CursosIcon,
        Component: Course,
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
