import React, { useState } from 'react';
import './ForgotPasswordArchitect.scss';
import TextInput from '../../components/inputs/TextInput/TextInput';
import BaseButton from '../../components/buttons/BaseButton';
import { FireError, FireSucess , FireLoading } from '../../utils/alertHandler';
import { postForgotArchitect } from '../../client/ArchitectUser/ArchitectUser.POST';
import { Link, useNavigate } from 'react-router-dom';

const ForgotPasswordArchitect = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleForgotPasswordArchitect = async (e) => {
        e.preventDefault();
        try {
            const swal = FireLoading('Enviando Correo...');
            const response = await postForgotArchitect(email);
            if (response.status === 'success') {
                FireSucess(
                    'Se han eviado las instrucciones para restablecer su contraseña a su correo electrónico.'
                );
                swal.close();
                navigate('/LoginUser');
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
            <form onSubmit={handleForgotPasswordArchitect}>
                <TextInput
                    placeholder="Correo Electrónico"
                    getVal={email}
                    setVal={setEmail}
                />
                <br />
                <BaseButton type="primary" onClick={handleForgotPasswordArchitect}>
                    Enviar correo electrónico
                </BaseButton>
            </form>
            <br />
            <div className="forgot-description">
                <Link to="/LoginUser">
                    <p> Volver </p>
                </Link>
            </div>
        </div>
    );
};

export default ForgotPasswordArchitect;
