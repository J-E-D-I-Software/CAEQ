import NavbarButton from "../buttons/NavbarButton";
import BaseButton from "../buttons/BaseButton";
import "./Navbar.scss";
import AdminIcon from "../icons/AdminIcon.png";
import CursosIcon from "../icons/CursosIcon.png";
import DirectorioIcon from "../icons/DirectorioIcon.png";
import PrincipalIcon from "../icons/PrincipalIcon.png";
import routes from "../../routes";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  /*const handlePrincipalClick = () => {
    console.log('Clic en Principal');
  };

  const handleCursosClick = () => {
    console.log('Clic en Cursos');
  };

  const handleDirectorioClick = () => {
    console.log('Clic en Directorio');
  };

  const handleAdminsClick = () => {
    console.log('Clic en Admins');
  };
*/
  return (
   /* <div className="navbar">
      <div className="navbar-button">
        <BaseButton label="Cerrar sesión" type="fail" />
      </div>
      <div className="navbar-center">
        <NavbarButton label="Principal" type="navbar" action={handlePrincipalClick} icon={PrincipalIcon} />
        <NavbarButton label="Cursos" type="navbar" action={handleCursosClick} icon={CursosIcon} />
        <NavbarButton label="Directorio" type="navbar" action={handleDirectorioClick} icon={DirectorioIcon} />
        <NavbarButton label="Admins" type="navbar" action={handleAdminsClick} icon={AdminIcon} />
      </div>
    </div>
*/
    <div className="navbar">
      <div className="navbar-button">
        <BaseButton label="Cerrar sesión" type="fail" />
      </div>
      <div className="navbar-center">
        {routes
          .filter((route) => route.inNavbar)
          .map((route) => (
            <NavbarButton
              label={route.name} 
              key={route.path}
              className='button-navbar'
              id='inicio_btn'
              icon={route.icon}
              action={() => navigate(route.path)}/>
              
        ))}
      </div>
    </div>

  );
};

export default Navbar;