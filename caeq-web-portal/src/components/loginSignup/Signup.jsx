import React, { useState } from "react";
import "./Signup.scss"
import TextInput from "../inputs/TextInput/TextInput";
import HiddenTextInput from "../inputs/TextInput/HiddenTextInput";
import Logo from "../images/caeqLogo.png";
import Button from "../buttons/BaseButton";

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

  const handleCancel = () => {
    // Lógica para cancelar el registro 
    // redirección 
    console.log("Registro cancelado");
  };

  return (
    <div className="signup-container">
      <img src={Logo} alt="Logo" className="Logo" />
      <h2>Registrarse</h2>
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
        <Button type="primary" label="Registrarse" onClick={handleSignup} />
        <Button type="fail" label="Cancelar" onClick={handleCancel} />
      </div>
    </div>
  );
};

export default Signup;
