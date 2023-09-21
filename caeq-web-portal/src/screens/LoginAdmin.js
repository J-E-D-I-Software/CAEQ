import React, { useState } from "react";
import "../styles/loginAdmin.scss"; 
import TextInput from "../components/inputs/TextInput/TextInput"; 
import HiddenTextInput from "../components/inputs/TextInput/HiddenTextInput"; 
import Logo from "../components/images/caeqLogo.png"; 
import Button from "../components/buttons/BaseButton";
import { Link } from "react-router-dom";

const LogingSingup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // lógica para manejar el inicio de sesión
    // enviar la información de inicio de sesión al servidor
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div className="login-container">
      <img src={Logo} alt="Logo" className="Logo" />
      <h2>Iniciar Sesión</h2>
      <TextInput
        placeholder="Correo Electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <HiddenTextInput
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button label="Iniciar Sesión" type="primary" onClick={handleLogin}>
        {" "}
      </Button>
      <div className="forgot-register-links">
        <a href="/forgot-password">¿Olvidaste tu contraseña?</a> <br /> 
        
        <Link to="/SignupAdmin">
        <p> Regístrate</p>
      </Link>
      </div>
    </div>
  );
};

export default LogingSingup;
