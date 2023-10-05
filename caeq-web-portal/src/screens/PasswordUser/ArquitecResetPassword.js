import React, { useState } from "react";
import './arquitecReset-password.scss'
import HiddenTextInput from "../../components/inputs/TextInput/HiddenTextInput";
import BaseButton from "../../components/buttons/BaseButton";
import { FireError, FireSucess } from "../../utils/alertHandler";
import { patchArchitecResetPassword } from "../../client/ArchitectUser/ArchitecUser.PATCH";
import { useParams } from "react-router-dom"; 

const ArchitecResetPassword = () => {
  const { token } = useParams(); // Obtiene el token de los parámetros de la URL
  const [newpassword, setPassword] = useState('');
  const [newpasswordConfirm, setConfirmPassword] = useState('');
  
  const handleArchitecResetPassword  = async (e) => {
    console.log(token);
    e.preventDefault();
    try {
      const response = await patchArchitecResetPassword(
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

      <form onSubmit={handleArchitecResetPassword }>
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
        <BaseButton type="primary" onClick={handleArchitecResetPassword}>
          Restablecer Contraseña
        </BaseButton>
      </form>
      <br />
    </div>
  );
};

export default ArchitecResetPassword;
