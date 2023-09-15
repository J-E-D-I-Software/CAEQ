import React from "react";
import NavbarButton from "../buttons/NavbarButton";
import "./Navbar.scss";
import AdminIcon from "../icons/AdminIcon.png";
import CursosIcon from "../icons/CursosIcon.png";
import DirectorioIcon from "../icons/DirectorioIcon.png";
import PrincipalIcon from "../icons/PrincipalIcon.png";


const Navbar = () => {
  const handlePrincipalClick = () => {
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

  return (


    <div className="navbar-horizontal">
      <NavbarButton label="Principal" type="navbar" action={handlePrincipalClick} icon={PrincipalIcon} />
      <NavbarButton label="Cursos" type="navbar" action={handleCursosClick} icon={CursosIcon} />
      <NavbarButton label="Directorio" type="navbar" action={handleDirectorioClick} icon={DirectorioIcon} />
      <NavbarButton label="Admins" type="navbar" action={handleAdminsClick} icon={AdminIcon} />
    </div>
  );
};

export default Navbar;
