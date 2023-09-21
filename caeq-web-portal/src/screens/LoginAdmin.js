import React, { useState } from "react";
import "../styles/loginAdmin.scss"; 
import TextInput from "../components/inputs/TextInput/TextInput"; 
import HiddenTextInput from "../components/inputs/TextInput/HiddenTextInput"; 
import Logo from "../components/images/caeqLogo.png"; 
import Button from "../components/buttons/BaseButton";
import { Link } from "react-router-dom";
import { postLoginCaeqUsers } from "../client/CaeqUser/CaeqUser.POST"

const LogingSingup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault(); // Evita la recarga de la página al enviar el formulario
    postLoginCaeqUsers(email, password)
    // Lógica para manejar el inicio de sesión
    // Enviar la información de inicio de sesión al servidor
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div className="login-container">
      <img src={Logo} alt="Logo" className="Logo" />
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleLogin}>
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
        <Button type="submit" label="Iniciar Sesión" />
      </form>
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
