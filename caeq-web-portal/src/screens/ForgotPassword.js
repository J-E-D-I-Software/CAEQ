import React, { useState } from "react";
import "../styles/forgot-password.scss";
import TextInput from "../components/inputs/TextInput/TextInput";
import BaseButton from "../components/buttons/BaseButton";
import { FireError, FireSucess } from "../utils/alertHandler";
import { postForgotCaeqUsers } from "../client/CaeqUser/CaeqUser.POST";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await postForgotCaeqUsers(email);
      if (response.status === "success") {
        FireSucess(
          "Te hemos enviado las instrucciones sobre cómo restablecer tu contraseña a tu correo."
        );
        navigate("/");
      }
    } catch (error) {
      FireError(error.response.data.message);
    }
  };

  return (
    <div className="forgot-container">
      <h2>¿Has olvidado tu contraseña?</h2>

      <div className="forgot-description">
        <p2>
          Escribe el correo electrónico que usaste para registrarte. Te
          enviaremos un correo con instrucciones sobre cómo restablecer tu
          contraseña.
        </p2>
      </div>
      <form onSubmit={handleForgotPassword}>
        <TextInput
          placeholder="Correo Electrónico"
          getVal={email}
          setVal={setEmail}
        />
        <BaseButton type="primary" onClick={handleForgotPassword}>
          Enviar correo Electronico
        </BaseButton>
      </form>
      <div className="forgot-description">
        <Link to="/">
          <p> Volver </p>
        </Link>
      </div>
      <div className="forgot-description">
        <Link to="/Reset-password/:token">
          <p> Restablecer </p>
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
