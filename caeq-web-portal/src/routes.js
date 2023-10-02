import Dasbboard from './screens/Dasboard';
import LoginAdmin from './screens/LoginAdmin/LoginAdmin';
import LoginUser from './screens/LoginUser/LoginUser';
import RegisterAdmin from './screens/SignupAdmin/SignupAdmin';
import RegisterUser from './screens/SignupArchitect/SignupArchitect';
import AcceptAdmin from './screens/AcceptAdmin/AcceptAdmin';
import Courses from './screens/Courses';
import Course from './screens/Course';
import Page404 from './screens/404';
import Directory from './screens/Directory/Directory';
import Perfil from './screens/Perfil/Profile';


import DirectorioIcon from './components/icons/DirectorioIcon.png';
import DirectorioIconWhite from './components/icons/DirectorioIconWhite.png';
import CursosIcon from '../src/components/icons/CursosIcon.png';
import CursosIconWhite from '../src/components/icons/CursosIconWhite.png';
import PrincipalIcon from '../src/components/icons/PrincipalIcon.png';
import RestrictByRole from './components/restrictAccess/RestrictByRole.jsx';

import PrincipalIconWhite from '../src/components/icons/PrincipalIconWHite.png';
import AdminIcon from '../src/components/icons/AdminIcon.png';
import AdminIconWhite from '../src/components/icons/AdminIconWhite.png';
import PerfilIcon from '../src/components/icons/PerfilIcon.png';

const routes = [
    // TO-DO: CORREGIR ESTAS RUTAS
    {
        path: '/',
        name: 'Principal',
        Component: Dasbboard,
        icon: PrincipalIcon,
        iconWhite: PrincipalIconWhite,
        isPrivate: false,
        inNavbar: false,
    },
    {
        path: '/Principal',
        name: 'Principal',
        Component: () => <div></div>,
        icon: PrincipalIcon,
        iconWhite: PrincipalIconWhite,
        isPrivate: true,
        inNavbar: true,
    },
    {
        path: '/Cursos',
        name: 'Cursos',
        icon: CursosIcon,
        iconWhite: CursosIconWhite,
        Component: Courses,
        isPrivate: true,
        inNavbar: true,
    },
    {
        path: '/Curso/:id',
        name: 'Curso',
        icon: CursosIcon,
        iconWhite: CursosIconWhite,
        Component: Course,
        isPrivate: true,
        inNavbar: false,
    },
    {
        path: '/Admins',
        name: 'Admins',
        icon: AdminIcon,
        iconWhite: AdminIconWhite,
        Component: AcceptAdmin,
        isPrivate: true,
        inNavbar: true,
        roles: ['caeq'],
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
    
    {
        path: '/Directorio',
        name: 'Directorio',
        icon: DirectorioIcon,
        iconWhite: DirectorioIconWhite,
        Component: Directory,
        isPrivate: true,
        inNavbar: true,
        roles: ['caeq'],
    },
    {
        path: '/Perfil/:id',
        name: 'Perfil',
        icon: PerfilIcon,
        iconWhite: PerfilIcon,
        Component: Perfil,
        isPrivate: true,
        inNavbar: true,
        roles: ['caeq'],
    },

    {
        path: '*',
        name: '404 Not Found',
        Component: Page404,
        isPrivate: false,
        inNavbar: false,
    },
];

export default routes;
