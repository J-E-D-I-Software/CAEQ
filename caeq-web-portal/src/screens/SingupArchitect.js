import React, { useState } from "react";
import "../styles/signup.scss";
import TextInput from "../components/inputs/TextInput/TextInput";
import HiddenTextInput from "../components/inputs/TextInput/HiddenTextInput";
import Logo from "../components/images/caeqLogo.png";
import BaseButton from "../components/buttons/BaseButton";
import { Link } from "react-router-dom";
import { postSignupArchitectUsers } from "../client/ArchitectUser/ArchitectUser.POST";
import { FireError, FireSucess } from "../utils/alertHandler";

const Signup = () => {
  const [fullName, setfullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setConfirmPassword] = useState(""); // Nuevo estado para la confirmación de contraseña

  const handleSignup = async (e) => {
    const data = { fullName, email, password, passwordConfirm };
    e.preventDefault();
    try {
      await postSignupArchitectUsers(data);
      FireSucess("Te haz registrado con éxito");
    } catch (error) {
      FireError(error.message);
    }

    // Verificar que las contraseñas coincidan
    // if (password !== confirmPassword) {
    //   alert("Las contraseñas no coinciden. Por favor, inténtalo de nuevo.");
    //   return;
    // }
  };

  return (
    <div className="signup-container">
      <img src={Logo} alt="Logo" className="Logo" />
      <h2>Registro</h2>
      <form onSubmit={handleSignup}>
        <h3>Nombre</h3>
        <TextInput
          placeholder="Nombre"
          getVal={fullName}
          setVal={setfullName}
        />
        <h3>Correo Electrónico</h3>
        <TextInput
          placeholder="Correo Electrónico"
          getVal={email}
          setVal={setEmail}
        />
        <h3>Contraseña</h3>
        <HiddenTextInput
          placeholder="Contraseña"
          getVal={password}
          setVal={setPassword}
        />
        <h3>Confirmar Contraseña</h3>
        <HiddenTextInput
          placeholder="Confirmar Contraseña"
          getVal={passwordConfirm}
          setVal={setConfirmPassword}
        />
        <div className="button-container">
          <BaseButton
            type="Submit"
            label="Registrarse"
            onClick={handleSignup}
          />
          <Link to="/LoginAdmin">
            <BaseButton type="fail" label="Cancelar" />
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
