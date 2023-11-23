import LoginAdmin from './screens/LoginAdmin/LoginAdmin';
import LoginUser from './screens/LoginUser/LoginUser';
import RegisterAdmin from './screens/SignupAdmin/SignupAdmin';
import RegisterUser from './screens/SignupArchitect/SignupArchitect';
import AcceptAdmin from './screens/AcceptAdmin/AcceptAdmin';
import Courses from './screens/Courses/Courses';
import Course from './screens/Courses/Course';
import CreateGathering from './screens/CreateGathering/CreateGathering';
import Gatherings from './screens/Gatherings/Gatherings';
import RegisterAttendees from './screens/RegisterAttendees/RegisterAttendees';
import Profile from './screens/Profile/Profile';
import EditProfile from './screens/Profile/EditProfile';
import CreateOrUpdateCourse from './screens/Courses/CreateOrUpdateCourse';
import Page404 from './screens/404';
import DirectoryArchitectDetails from './screens/DirectoryArchitectDetail/DirectoryArchitectDetails';
import Directory from './screens/Directory/Directory';
import LandingArchitect from './screens/Landing/LandingArchitect';
import Principal from './screens/Principal/Principal';
import AcceptPayment from './screens/AcceptPayment/AcceptPayment';
import MyInscription from './screens/MyInscriptions/MyInscriptions.js';
import Inscriptiondetail from './screens/MyInscriptions/Inscriptiondetail.js';
import InscriptionAsistance from './screens/MyInscriptions/InscriptionAsistance';
import Benefits from './screens/Benefits/Benefits.jsx';
import CreateOrEditBenefit from './screens/Benefits/CreateOrEditBenefit.jsx';

import ForgotPasswordAdmin from './screens/ForgotPasswordAdmin/ForgotPasswordAdmin';
import ResetPasswordAdmin from './screens/ResetPasswordAdmin/ResetPasswordAdmin';
import PrincipalAdmin from './screens/PrincipalAdmin/PrincipalAdmin';
import ArquitecForgotPassword from './screens/ForgotPasswordArchitect/ForgotPasswordArchitect';
import ArchitecResetPassword from './screens/ResetPasswordArchitect/ResetPasswordArchitect';
import Services from './screens/Services/Services';
import AServices from './screens/Arch_Services/AServices';
import CreateRoomOffer from './screens/CreateRoom/CreateRoom';

import DirectorioIcon from './components/icons/DirectorioIcon.svg';
import DirectorioIconWhite from './components/icons/DirectorioIconWhite.svg';
import CursosIcon from '../src/components/icons/CourseIcon.svg';
import CursosIconWhite from '../src/components/icons/CursosIconWhite.svg';
import ProfileIcon from '../src/components/icons/ProfileIcon.svg';
import ProfileIconWhite from '../src/components/icons/ProfileIconWhite.svg';
import AnouncementIcon from '../src/components/icons/AnuncioIcon.png';
import AnouncementIconWhite from '../src/components/icons/AnuncioWhite.png';
import PrincipalIcon from '../src/components/icons/PrincipalIcon.png';
import ServicesIcon from '../src/components/icons/ServicesIcon.svg';
import ServicesIconWhite from '../src/components/icons/ServicesIconWhite.svg';
import BenefitsIcon from '../src/components/icons/BenefitsIcon.png';
import BenefitsIconWhite from '../src/components/icons/BenefitsIconWhite.png';
import RestrictByRole from './components/restrictAccess/RestrictByRole.jsx';
import AsambleasIcon from '../src/components/icons/AsambleasIcon.svg';
import AsambleasIconWhite from '../src/components/icons/AsambleasIconWhite.svg';
import StatsIcon from '../src/components/icons/StatsIcon.svg';
import StatsIconWhite from '../src/components/icons/StatsIconWhite.svg';

import PrincipalIconWhite from '../src/components/icons/PrincipalIconWHite.png';
import AdminIcon from '../src/components/icons/AdminIcon.svg';
import AdminIconWhite from '../src/components/icons/AdminIconWhite.svg';
import LandingCAEQ from './screens/Landing/LandingCAEQ';
import PublicDirectory from './screens/Directory/PublicDirectory';
import Anouncements from './screens/Anouncements/Anouncements';
const routes = [
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
        path: '/Usuarios',
        name: 'Usuarios',
        icon: AdminIcon,
        iconWhite: AdminIconWhite,
        Component: AcceptAdmin,
        isPrivate: true,
        inNavbar: true,
        roles: ['caeq'],
    },
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
        name: 'Estadísticas',
        Component: PrincipalAdmin,
        icon: StatsIcon,
        iconWhite: StatsIconWhite,
        isPrivate: true,
        inNavbar: true,
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
    },
    {
        path: '/Asambleas',
        name: 'Asambleas',
        icon: AsambleasIcon,
        iconWhite: AsambleasIconWhite,
        Component: Gatherings,
        isPrivate: true,
        inNavbar: true,
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
        path: '/Asambleas/Asistencias/:id',
        name: 'Modificar Asambleas',
        icon: CursosIcon,
        iconWhite: CursosIconWhite,
        Component: RegisterAttendees,
        isPrivate: true,
        inNavbar: false,
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
        path: '/MisCursos',
        name: 'MisCursos',
        icon: CursosIcon,
        iconWhite: CursosIconWhite,
        Component: MyInscription,
        isPrivate: true,
        inNavbar: false,
    },
    {
        path: '/AsistenciasCursos',
        name: 'Mis Asistencias a Cursos',
        Component: InscriptionAsistance,
        isPrivate: true,
        inNavbar: false,
    },
    {
        path: '/MisCursos/:id',
        name: 'MiCurso',
        icon: CursosIcon,
        iconWhite: CursosIconWhite,
        Component: Inscriptiondetail,
        isPrivate: true,
        inNavbar: false,
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
        Component: CreateOrUpdateCourse,
        isPrivate: true,
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
        roles: ['caeq'],
    },
    {
        path: '/ServiciosA',
        name: 'Servicios',
        icon: ServicesIcon,
        iconWhite: ServicesIconWhite,
        Component: AServices,
        isPrivate: true,
        inNavbar: true,
        roles: ['architect'],
    },
    {
        path: '/Servicios/CrearSalon',
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
        Component: CreateRoomOffer,
        isPrivate: true,
        inNavbar: false,
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
        path: '/Directorio/:id',
        name: 'Detalles de arquitecto',
        Component: DirectoryArchitectDetails,
        isPrivate: true,
        inNavbar: false,
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
        path: '/AcceptPayment',
        name: 'Pagos por aceptar',
        Component: AcceptPayment,
        isPrivate: true,
        inNavbar: false,
        roles: ['caeq'],
    },
    {
        path: '/Directorio-Publico',
        name: 'Directorio público',
        Component: PublicDirectory,
        isPrivate: false,
        inNavbar: false,
    },
    {
        path: '/Beneficios',
        name: 'Beneficios',
        Component: Benefits,
        isPrivate: true,
        inNavbar: true,
        icon: BenefitsIcon,
        iconWhite: BenefitsIconWhite,
    },
    {
        path: '/CrearBeneficio',
        name: 'Beneficios',
        Component: CreateOrEditBenefit,
        isPrivate: true,
        inNavbar: false,
    },
    {
        path: '/Beneficio/:id',
        name: 'Beneficios',
        Component: CreateOrEditBenefit,
        isPrivate: true,
        inNavbar: false,
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
];

export default routes;
