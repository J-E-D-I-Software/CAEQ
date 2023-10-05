import React, { useState } from "react";
import './Arquitecforgot-password.scss'
import TextInput from '../../components/inputs/TextInput/TextInput';
import BaseButton from "../../components/buttons/BaseButton";
import { FireError, FireSucess } from "../../utils/alertHandler";
import { postForgotUsers } from "../../client/ArchitectUser/ArchitectUser.POST";
import { Link, useNavigate } from "react-router-dom";


const ArquitecForgotPassword = () => {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleArquitecForgotPassword = async (e) => {
        e.preventDefault();
        try {
            const response = await postForgotUsers(email);
            if (response.status === "success") {
                FireSucess(
                    "Te hemos enviado las instrucciones sobre cómo restablecer tu contraseña a tu correo."
                );
                navigate("/LoginUser");
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
            <form onSubmit={handleArquitecForgotPassword}>
                <TextInput
                    placeholder="Correo Electrónico"
                    getVal={email}
                    setVal={setEmail}
                />
                <BaseButton type="primary" onClick={handleArquitecForgotPassword}>
                    Enviar correo Electronico
                </BaseButton>
            </form>
            <div className="forgot-description">
                <Link to="/LoginUser">
                    <p> Volver </p>
                </Link>
            </div>
            <div className="forgot-description">
                <Link to="/architect/Reset-password/:token">
                    <p> Restablecer </p>
                </Link>
            </div>
        </div>
    );
};

export default ArquitecForgotPassword;
