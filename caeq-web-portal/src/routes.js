import Dasbboard from './screens/Dasboard';
import Test from './screens/Test';
import LoginAdmin from './screens/LoginAdmin';
import Register from './screens/RegisterAdmin';


import AdminIcon from "../src/components/icons/AdminIcon.png";
import CursosIcon from "../src/components/icons/CursosIcon.png";
import DirectorioIcon from "../src/components/icons/DirectorioIcon.png";
import PrincipalIcon from "../src/components/icons/PrincipalIcon.png";


const routes = [
  { path: '/', name: 'Principal', Component: Dasbboard, icon: PrincipalIcon, isPrivate: false, inNavbar: true },
    {
        path: '/Cursos',
        name: 'Cursos',
        icon: CursosIcon,
        Component: Test,
        isPrivate: true,
        inNavbar: true
    },
  { path: '/LoginAdmin', name: 'LoginAdmin', Component: LoginAdmin, isPrivate: false, inNavbar: false},
  { path: '/RegisterAdmin', name: 'Registrar Admin', Component: Register, isPrivate: false, inNavbar: false}
];

export default routes;
