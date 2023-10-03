import React, { useState } from "react";
import "../styles/reset-password.scss";
import HiddenTextInput from "../components/inputs/TextInput/HiddenTextInput";
import BaseButton from "../components/buttons/BaseButton";
import { FireError, FireSucess } from "../utils/alertHandler";
import { patchResetPassword } from "../client/CaeqUser/CaeqUser.PATCH";
import { useParams } from "react-router-dom"; 

const ResetPassword = () => {
  const [newpassword, setPassword] = useState('');
  const [newpasswordConfirm, setConfirmPassword] = useState('');
  const { token } = useParams(); // Obtiene el token de los parámetros de la URL

  const handleResetPassword = async (e) => {
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
        <BaseButton type="primary" onClick={handleResetPassword}>
          Restablecer Contraseña
        </BaseButton>
      </form>
    </div>
  );
};

export default ResetPassword;
