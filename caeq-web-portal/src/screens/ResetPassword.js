import React, { useState } from "react";
import "../styles/reset-password.scss";
import HiddenTextInput from "../components/inputs/TextInput/HiddenTextInput";
import BaseButton from "../components/buttons/BaseButton";
import { FireError, FireSucess } from "../utils/alertHandler";
import { patchResetPassword } from "../client/CaeqUser/CaeqUser.PATCH";
import { useParams } from "react-router-dom"; 

const ResetPassword = () => {
  const { token } = useParams(); // Obtiene el token de los parámetros de la URL
  const [newpassword, setPassword] = useState('');
  const [newpasswordConfirm, setConfirmPassword] = useState('');
  
  const handleResetPassword = async (e) => {
    console.log(token);
    e.preventDefault();
    try {
      const response = await patchResetPassword(
        token,
        newpassword,
        newpasswordConfirm,
      );
      if (response.status === 'success') {
        FireSucess(
          'Contraseña Restablecida con éxito, ya puede cerrar esta pestaña'
        );
      }
    } catch (error) {
      FireError(error.response.data.message);
    }
  };

  return (
    <div className="reset-container">
      <h2>Restablecer Contraseña</h2>
      <div className="forgot-description">
                <p2>
                Escribe tu nueva contraseña y confirmala. La contraseña debe tener al menos 8 caracteres.
                </p2>
            </div>

      <form onSubmit={handleResetPassword}>
        <HiddenTextInput
          placeholder="Nueva Contraseña"
          getVal={newpassword}
          setVal={setPassword}
        />
        <HiddenTextInput
          placeholder="Confirmar Contraseña"
          getVal={newpasswordConfirm}
          setVal={setConfirmPassword}
        />
        <br />
        <BaseButton type="primary" onClick={handleResetPassword}>
          Restablecer Contraseña
        </BaseButton>
      </form>
      <br />
    </div>
  );
};

export default ResetPassword;
