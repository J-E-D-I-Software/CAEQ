import React, { useState } from "react";
import NavbarButton from "../buttons/NavbarButton"; // Asegúrate de que la ruta sea correcta
import "./Navbar.scss"

const Navbar = () => {
  // Funciones para manejar el clic en cada botón
  const handlePrincipalClick = () => {
    // Lógica para manejar el clic en el botón "Principal"
    console.log('Clic en Principal');
  };

  const handleCursosClick = () => {
    // Lógica para manejar el clic en el botón "Acerca de"
    console.log('Clic en Acerca de');
  };

  const handleServiciosClick = () => {
    // Lógica para manejar el clic en el botón "Servicios"
    console.log('Clic en Servicios');
  };

  const handleAdminsClick = () => {
    // Lógica para manejar el clic en el botón "Admins"
    console.log('Clic en Admins');
  };

  return (
    <div className="navbar-horizontal">
      <NavbarButton label="Principal" type="navbar" action={handlePrincipalClick} />
      <NavbarButton label="Cursos" type="navbar" action={handleCursosClick} />
      <NavbarButton label="Servicios" type="navbar" action={handleServiciosClick} />
      <NavbarButton label="Admins" type="navbar" action={handleAdminsClick} />
    </div>
  );
};

export default Navbar;
