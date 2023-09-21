import Dasbboard from './screens/Dasboard';
import Test from './screens/Test';


import CursosIcon from "../src/components/icons/CursosIcon.png";
import PrincipalIcon from "../src/components/icons/PrincipalIcon.png";


const routes = [
	{ 
		path: '/', 
		name: 'Principal', 
		Component: Dasbboard, 
		icon: PrincipalIcon, 
		isPrivate: false, 
		inNavbar: true 
	},
	{
		path: '/Cursos',
		name: 'Cursos',
		icon: CursosIcon,
		Component: Test,
		isPrivate: true,
		inNavbar: true
	},
];

export default routes;
