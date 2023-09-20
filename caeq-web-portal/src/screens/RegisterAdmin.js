import React, { useState } from "react";
import "../styles/signup.scss";
import TextInput from "../components/inputs/TextInput/TextInput";
import HiddenTextInput from "../components/inputs/TextInput/HiddenTextInput";
import Logo from "../components/images/caeqLogo.png";
import BaseButton from "../components/buttons/BaseButton";
import { Link } from "react-router-dom";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // Nuevo estado para la confirmación de contraseña

  const handleSignup = () => {
    // Verificar que las contraseñas coincidan
    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden. Por favor, inténtalo de nuevo.");
      return;
    }

    // Lógica para manejar el registro de usuario
    // Enviar la información de registro al servidor
    console.log("Nombre:", firstName);
    console.log("Apellido:", lastName);
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div className="signup-container">
      <img src={Logo} alt="Logo" className="Logo" />
      <h2>Registro</h2>
      <h3>Nombre</h3>
      <TextInput
        placeholder="Nombre"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <h3>Apellido</h3>
      <TextInput
        placeholder="Apellido"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <h3>Correo Electrónico</h3>
      <TextInput
        placeholder="Correo Electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <h3>Contraseña</h3>
      <HiddenTextInput
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <h3>Confirmar Contraseña</h3>
      <HiddenTextInput
        placeholder="Confirmar Contraseña"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <div className="button-container">
        <BaseButton type="primary" label="Registrarse" onClick={handleSignup} />
        <Link to="/LoginAdmin">
          <BaseButton type="fail" label="Cancelar" />
        </Link>
      </div>
    </div>
  );
};

export default Signup;
