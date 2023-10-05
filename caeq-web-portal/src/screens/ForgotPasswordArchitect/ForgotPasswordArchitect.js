import React, { useState } from "react";
import "./ForgotPasswordArchitect.scss";
import TextInput from "../../components/inputs/TextInput/TextInput";
import BaseButton from "../../components/buttons/BaseButton";
import { FireError, FireSucess } from "../../utils/alertHandler";
import { postForgotArchitect } from "../../client/ArchitectUser/ArchitectUser.POST";
import { Link, useNavigate } from "react-router-dom";

const ForgotPasswordArchitect = () => {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleForgotPasswordArchitect = async (e) => {
        e.preventDefault();
        try {
            const response = await postForgotArchitect(email);
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
            <form onSubmit={handleForgotPasswordArchitect}>
                <TextInput
                    placeholder="Correo Electrónico"
                    getVal={email}
                    setVal={setEmail}
                />
                <br />
                <BaseButton type="primary" onClick={handleForgotPasswordArchitect}>
                    Enviar correo Electronico
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
