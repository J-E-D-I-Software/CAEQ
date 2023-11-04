import React, { useState } from 'react';
import './ResetPasswordArchitect.scss';
import HiddenTextInput from '../../components/inputs/TextInput/HiddenTextInput';
import BaseButton from '../../components/buttons/BaseButton';
import { FireError, FireSucess , FireLoading } from '../../utils/alertHandler';
import { patchResetPasswordArchitec } from '../../client/ArchitectUser/ArchitecUser.PATCH';
import { useParams, useNavigate } from 'react-router-dom';

const ResetPasswordArchitec = () => {
    const { token } = useParams();
    const [newpassword, setPassword] = useState('');
    const [newpasswordConfirm, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleResetPasswordArchitec = async (e) => {
        e.preventDefault();
        try {
            const swal = FireLoading('Restableciendo Contraseña...');
            const response = await patchResetPasswordArchitec(
                token,
                newpassword,
                newpasswordConfirm
            );
            if (response.status === 'success') {
                FireSucess('Contraseña Restablecida con éxito, ya puede iniciar sesión');
                navigate('/LoginUser');
            }
            swal.close();
        } catch (error) {
            FireError(error.response.data.message);
        }
    };

    return (
        <div className="reset-container">
            <h2>Restablecer Contraseña</h2>
            <div className="forgot-description">
                <p2>
                    Escribe tu nueva contraseña y confírmala. La contraseña debe tener al
                    menos 8 caracteres.
                </p2>
            </div>

            <form onSubmit={handleResetPasswordArchitec}>
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
                <BaseButton type="primary" onClick={handleResetPasswordArchitec}>
                    Restablecer Contraseña
                </BaseButton>
            </form>
            <br />
        </div>
    );
};

export default ResetPasswordArchitec;
