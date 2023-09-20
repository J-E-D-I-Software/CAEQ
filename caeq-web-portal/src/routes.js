import Dasbboard from './screens/Dasboard';
import Test from './screens/Test';


import AdminIcon from "../src/components/icons/AdminIcon.png";
import CursosIcon from "../src/components/icons/CursosIcon.png";
import DirectorioIcon from "../src/components/icons/DirectorioIcon.png";
import PrincipalIcon from "../src/components/icons/PrincipalIcon.png";


const routes = [
  { path: '/', name: 'Principal', Screen: Dasbboard, icon: PrincipalIcon, isPrivate: false, inNavbar: true },
    {
        path: '/Cursos',
        name: 'Cursos',
        icon: CursosIcon,
        Screen: Test,
        isPrivate: true,
        inNavbar: true
    }
];

export default routes;
