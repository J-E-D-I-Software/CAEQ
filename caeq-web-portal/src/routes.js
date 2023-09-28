import Dasbboard from './screens/Dasboard';
import Test from './screens/Test';
import LoginAdmin from './screens/LoginAdmin/LoginAdmin';
import LoginUser from './screens/LoginUser/LoginUser';
import RegisterAdmin from './screens/SignupAdmin/SignupAdmin';
import RegisterUser from './screens/SignupArchitect/SingupArchitect';
import Directory from './screens/Directory';


import DirectorioIcon from './components/icons/DirectorioIcon.png';
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
                <RestrictByRole allowedRoles={['architect']}>
                    <BaseButton label='architect' />
                </RestrictByRole>
                <RestrictByRole allowedRoles={['staff']}>
                    <BaseButton label='staff' />
                </RestrictByRole>
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
    
    {
        path: '/Directorio',
        name: 'Directorio',
        Component: () => (
            <div>
                <RestrictByRole allowedRoles={['caeq']}>
                <Directory /> {Directory}
                </RestrictByRole>
            </div>
            ),
        icon: DirectorioIcon,
        isPrivate: true,
        inNavbar: true,
    },

];

export default routes;