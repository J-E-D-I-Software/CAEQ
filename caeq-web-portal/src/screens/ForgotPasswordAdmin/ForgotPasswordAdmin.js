import React, { useState } from 'react';
import './ForgotPasswordAdmin.scss';
import TextInput from '../../components/inputs/TextInput/TextInput';
import BaseButton from '../../components/buttons/BaseButton';
import { FireError, FireSucess , FireLoading } from '../../utils/alertHandler';
import { postForgotCaeqUsers } from '../../client/CaeqUser/CaeqUser.POST';
import { Link, useNavigate } from 'react-router-dom';

const ForgotPasswordAdmin = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleForgotPasswordAdmin = async (e) => {
        e.preventDefault();
        try {
            const swal = FireLoading('Enviando Correo...');
            const response = await postForgotCaeqUsers(email);
            if (response.status === 'success') {
                FireSucess(
                    'Se han eviado las instrucciones para restablecer su contraseña a su correo electrónico.'
                );
                swal.close();
                navigate('/LoginAdmin');
            }
        } catch (error) {
            FireError(error.response.data.message);
        }
    };

    return (
        <div className="forgot-container">
            <h2>¿Olvidó su contraseña?</h2>

            <div className="forgot-description">
                <p2>
                    Escriba el correo electrónico que usó para registrarse. Se
                    enviará un correo con instrucciones sobre cómo restablecer su
                    contraseña.
                </p2>
            </div>
            <form onSubmit={handleForgotPasswordAdmin}>
                <TextInput
                    placeholder="Correo Electrónico"
                    getVal={email}
                    setVal={setEmail}
                />
                <br />
                <BaseButton type="primary" onClick={handleForgotPasswordAdmin}>
                    Enviar correo electrónico
                </BaseButton>
            </form>
            <br />
            <div className="forgot-description">
                <Link to="/LoginAdmin">
                    <p> Volver </p>
                </Link>

            </div>
        </div>
    );
};

export default ForgotPasswordAdmin;
