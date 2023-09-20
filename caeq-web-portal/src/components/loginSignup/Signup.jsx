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

  const handleSignup = () => {
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
      <TextInput
        placeholder="Nombre"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <TextInput
        placeholder="Apellido"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
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
      <div className="button-container">
        <Button type ="primary" label="Registrarse" onClick={handleSignup} />
        <Button type ="fail"label="Cancelar"  onClick={handleCancel} />
      </div>
    </div>
  );
};

export default Signup;
