import React, { useState } from 'react';
import './ForgotPasswordAdmin.scss';
import TextInput from '../../components/inputs/TextInput/TextInput';
import BaseButton from '../../components/buttons/BaseButton';
import { FireError, FireSucess } from '../../utils/alertHandler';
import { postForgotCaeqUsers } from '../../client/CaeqUser/CaeqUser.POST';
import { Link, useNavigate } from 'react-router-dom';

const ForgotPasswordAdmin = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleForgotPasswordAdmin = async (e) => {
        e.preventDefault();
        try {
            const response = await postForgotCaeqUsers(email);
            if (response.status === 'success') {
                FireSucess(
                    'Te hemos enviado las instrucciones sobre cómo restablecer tu contraseña a tu correo.'
                );
                navigate('/LoginAdmin');
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
            <form onSubmit={handleForgotPasswordAdmin}>
                <TextInput
                    placeholder="Correo Electrónico"
                    getVal={email}
                    setVal={setEmail}
                />
                <br />
                <BaseButton type="primary" onClick={handleForgotPasswordAdmin}>
                    Enviar correo Electronico
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
