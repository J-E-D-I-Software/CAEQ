import React, { useState } from "react";
import "../styles/loginAdmin.scss";
import TextInput from "../components/inputs/TextInput/TextInput";
import HiddenTextInput from "../components/inputs/TextInput/HiddenTextInput";
import Logo from "../components/images/caeqLogo.png";
import Button from "../components/buttons/BaseButton";
import { Link } from "react-router-dom";
import { postLoginArchitectUsers } from "../client/ArchitectUser/ArchitectUser.POST";
import {FireError, FireSucess} from '../utils/alertHandler'


const LogingSingup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await postLoginArchitectUsers(email, password);
      FireSucess('Haz iniciado sesión con éxito');
    } catch (error) {
      FireError(error.message);
    }
  };

  return (
    <div className="login-container">
      <img src={Logo} alt="Logo" className="Logo" />
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleLogin}>
        <TextInput
          placeholder="Correo Electrónico"
          getVal={email}
          setVal={setEmail}
        />
        <HiddenTextInput
          placeholder="Contraseña"
          getVal={password}
          setVal={setPassword}
        />
        <Button type="submit" label="Iniciar Sesión" />
      </form>
      <div className="forgot-register-links">
        <a href="/forgot-password">¿Olvidaste tu contraseña?</a> <br />
        <Link to="/SignupUser">
          <p> Regístrate</p>
        </Link>
      </div>
    </div>
  );
};

export default LogingSingup;
