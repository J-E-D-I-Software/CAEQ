import React, { useEffect, useState}  from 'react';
import '../PrincipalAdmin/PrincipalAdmin.scss'

const Principal = () => {
    return (
        <div class='principal-container'>
          <h1>Bienvenido al portal CAEQ</h1>
          <h3>Cursos</h3>
          <p>En esta sección podras visualizar los proximos cursos impartidos por el Colegio. Además, tendrás la oportunidad de acceder a los detalles de cada curso, incluyendo información sobre la fecha, ubicación, costos. </p>
          <h3>Perfil</h3>
          <p>En esta sección podras visualizar tus datos personales, tu información del CAEQ y tu información profesional. Además, tendrás la oportunidad de editar tu información personal.</p>
        </div>
    )
};

export default Principal;