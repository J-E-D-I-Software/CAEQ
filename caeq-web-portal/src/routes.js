import LoginAdmin from './screens/LoginAdmin/LoginAdmin';
import LoginUser from './screens/LoginUser/LoginUser';
import RegisterAdmin from './screens/SignupAdmin/SignupAdmin';
import RegisterUser from './screens/SignupArchitect/SignupArchitect';
import AcceptAdmin from './screens/AcceptAdmin/AcceptAdmin';
import Courses from './screens/Courses/Courses';
import Course from './screens/Courses/Course';
import CreateGathering from './screens/CreateGathering/CreateGathering';
import Profile from './screens/Profile/Profile';
import EditProfile from './screens/Profile/EditProfile';
import CreateOrUpdateCourse from './screens/Courses/CreateOrUpdateCourse';
import Page404 from './screens/404';
import DirectoryArchitectDetails from './screens/DirectoryArchitectDetail/DirectoryArchitectDetails';
import Directory from './screens/Directory/Directory';
import LandingArchitect from './screens/Landing/LandingArchitect';
import Principal from './screens/Principal/Principal';

import ForgotPasswordAdmin from './screens/ForgotPasswordAdmin/ForgotPasswordAdmin';
import ResetPasswordAdmin from './screens/ResetPasswordAdmin/ResetPasswordAdmin';
import PrincipalAdmin from './screens/PrincipalAdmin/PrincipalAdmin';
import ArquitecForgotPassword from './screens/ForgotPasswordArchitect/ForgotPasswordArchitect';
import ArchitecResetPassword from './screens/ResetPasswordArchitect/ResetPasswordArchitect';
import Services from './screens/Services/Services';
import CreateRoomOffer from './screens/CreateRoom/CreateRoom';

import DirectorioIcon from './components/icons/DirectorioIcon.png';
import DirectorioIconWhite from './components/icons/DirectorioIconWhite.png';
import CursosIcon from '../src/components/icons/CursosIcon.png';
import CursosIconWhite from '../src/components/icons/CursosIconWhite.png';
import ProfileIcon from '../src/components/icons/ProfileIcon.png';
import ProfileIconWhite from '../src/components/icons/ProfileIconWhite.png';
import AnouncementIcon from '../src/components/icons/AnuncioIcon.png';
import AnouncementIconWhite from '../src/components/icons/AnuncioWhite.png';
import PrincipalIcon from '../src/components/icons/PrincipalIcon.png';
import ServicesIcon from '../src/components/icons/ServicesIcon.png';
import ServicesIconWhite from '../src/components/icons/ServicesIconWhite.png'; 
import RestrictByRole from './components/restrictAccess/RestrictByRole.jsx';

import PrincipalIconWhite from '../src/components/icons/PrincipalIconWHite.png';
import AdminIcon from '../src/components/icons/AdminIcon.png';
import AdminIconWhite from '../src/components/icons/AdminIconWhite.png';
import LandingCAEQ from './screens/Landing/LandingCAEQ';
import PublicDirectory from './screens/Directory/PublicDirectory';
import Anouncements from './screens/Anouncements/Anouncements';
const routes = [
    // TO-DO: CORREGIR ESTAS RUTAS
    {
        path: '/',
        name: 'Principal',
        Component: LandingArchitect,
        icon: PrincipalIcon,
        iconWhite: PrincipalIconWhite,
        isPrivate: false,
        inNavbar: false,
    },
    {
        path: '/Principal',
        name: 'Principal',
        Component: Principal,
        icon: PrincipalIcon,
        iconWhite: PrincipalIconWhite,
        isPrivate: true,
        inNavbar: true,
        roles: ['architect'],
    },
    {
        path: '/PrincipalAdmin',
        name: 'Principal',
        Component: PrincipalAdmin,
        icon: PrincipalIcon,
        iconWhite: PrincipalIconWhite,
        isPrivate: true,
        inNavbar: true,
        roles: ['caeq'],
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
        path: '/Cursos/Curso',
        name: 'Crear curso',
        icon: CursosIcon,
        iconWhite: CursosIconWhite,
        Component: CreateOrUpdateCourse,
        isPrivate: true,
        inNavbar: false,
        roles: ['caeq'],
    },
    {
        path: '/Cursos/Curso/:id',
        name: 'Curso',
        icon: CursosIcon,
        iconWhite: CursosIconWhite,
        Component: CreateOrUpdateCourse,
        isPrivate: true,
        inNavbar: false,
        roles: ['caeq'],
    },
    {
        path: '/Asambleas/Asamblea',
        name: 'Crear Asambleas',
        icon: CursosIcon,
        iconWhite: CursosIconWhite,
        Component: CreateGathering,
        isPrivate: true,
        inNavbar: false,
        roles: ['caeq'],
    },
    {
        path: '/Asambleas/Asamblea/:id',
        name: 'Modificar Asambleas',
        icon: CursosIcon,
        iconWhite: CursosIconWhite,
        Component: CreateGathering,
        isPrivate: true,
        inNavbar: false,
        roles: ['caeq'],
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
        path: '/Servicios',
        name: 'Servicios',
        icon: ServicesIcon,
        iconWhite: ServicesIconWhite,
        Component: Services,
        isPrivate: true,
        inNavbar: true,
    },
    {
        path: 'Servicios/CrearSalon',
        name: 'Crear oferta de salón',
        icon: ServicesIcon,
        iconWhite: ServicesIconWhite,
        Component: CreateRoomOffer,
        isPrivate: true,
        inNavbar: false,
        roles: ['caeq'],
    },
    {
        path: '/Servicios/Salon/:id',
        name: 'Modificar Salón',
        icon: ServicesIcon,
        iconWhite: ServicesIconWhite,
        Component:CreateRoomOffer,
        isPrivate: true,
        inNavbar: false,
        roles: ['caeq'],
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
        path: '/Directorio/:id',
        name: 'Detalles de arquitecto',
        Component: DirectoryArchitectDetails,
        isPrivate: true,
        inNavbar: false,
        roles: ['caeq'],
    },
    {
        path: '/Perfil',
        name: 'Perfil',
        icon: ProfileIcon,
        iconWhite: ProfileIconWhite,
        Component: Profile,
        isPrivate: true,
        inNavbar: true,
        roles: ['architect'],
    },
    {
        path: '/Perfil/:id',
        name: 'Editar perfil',
        Component: EditProfile,
        isPrivate: true,
        inNavbar: false,
        roles: ['architect'],
        roles: ['architect'],
    },
    {
        path: '/Anouncements',
        name: 'Anuncios',
        icon: AnouncementIcon,
        iconWhite: AnouncementIconWhite,
        Component: Anouncements,
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
    {
        path: '/Forgot-password',
        name: 'Olvidar contraseña',
        Component: ForgotPasswordAdmin,
        isPrivate: false,
        inNavbar: false,
    },
    {
        path: '/User-ForgotPassword',
        name: 'Arquitecto Contraseña',
        Component: ArquitecForgotPassword,
        isPrivate: false,
        inNavbar: false,
    },
    {
        path: '/caeq/Reset-password/:token',
        name: 'Restaurar contraseña',
        Component: ResetPasswordAdmin,
        isPrivate: false,
        inNavbar: false,
    },
    {
        path: '/architect/Reset-password/:token',
        name: 'Restaurar contraseña',
        Component: ArchitecResetPassword,
        isPrivate: false,
        inNavbar: false,
    },
    {
        path: '/welcomeAdmin',
        name: 'Bienvenida Admin',
        Component: LandingCAEQ,
        isPrivate: false,
        inNavbar: false,
    },
    {
        path: '/Directorio-Publico',
        name: 'Directorio público',
        Component: PublicDirectory,
        isPrivate: false,
        inNavbar: false,
    },
];

export default routes;
