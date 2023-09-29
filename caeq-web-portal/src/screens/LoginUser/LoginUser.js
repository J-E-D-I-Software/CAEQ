import React, { useState } from "react";
import "./loginUser.scss";
import TextInput from "../../components/inputs/TextInput/TextInput";
import HiddenTextInput from "../../components/inputs/TextInput/HiddenTextInput";
import Logo from "../../components/images/caeqLogo.png";
import { Link, useNavigate } from "react-router-dom";
import { postLoginCaeqUsers } from "../../client/CaeqUser/CaeqUser.POST";
import { FireError, FireSucess } from "../../utils/alertHandler";
import { setToken, setUserType, setCaeqUserSaved } from "../../utils/auth";
import BaseButton from "../../components/buttons/BaseButton";

const LogingSignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await postLoginCaeqUsers(email, password);
      if (response.status === "success") {
        const token = response.token;

        setUserType(token);
        setToken(token);
        setCaeqUserSaved(response.data.user);
      }

      FireSucess("Has iniciado sesión con éxito");
      navigate("/Principal");
    } catch (error) {
      console.log(error);
      FireError(error.response.data.message);
    }
  };

  return (
    <div className="login-container">
      <img src={Logo} alt="Logo" className="Logo" />
      <form onSubmit={handleLogin}>
        <h2>Correo electrónico</h2>
        <TextInput
          placeholder="Ingresa tu correo"
          getVal={email}
          setVal={setEmail}
        />
        <h2>Contraseña</h2>
        <HiddenTextInput
          placeholder="Ingresa tu contraseña"
          getVal={password}
          setVal={setPassword}
        />
        <br />
        <BaseButton color="primary" type="submit">
          Iniciar sesión
        </BaseButton>
      </form>

      <br />
      <div className="forgot-register-links">
        <a href="/forgot-password">¿Olvidaste tu contraseña?</a> <br />
        <Link to="/SignupUser">
          <p> Regístrate</p>
        </Link>
      </div>
    </div>
  );
};

export default LogingSignUp;
