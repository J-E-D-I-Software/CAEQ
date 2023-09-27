import React, { useState } from 'react';
import './signup.scss';
import TextInput from '../../components/inputs/TextInput/TextInput';
import HiddenTextInput from '../../components/inputs/TextInput/HiddenTextInput';
import Logo from '../../components/images/caeqLogo.png';
import BaseButton from '../../components/buttons/BaseButton';
import { Link, useNavigate } from 'react-router-dom';
import { postSignupCaeqUsers } from '../../client/CaeqUser/CaeqUser.POST';
import { FireError, FireSucess } from '../../utils/alertHandler';

const Signup = () => {
    const [fullName, setfullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        const data = { fullName, email, password, passwordConfirm };
        e.preventDefault();
        try {
            await postSignupCaeqUsers(data);

            FireSucess(
                'Te has registrado con éxito. Un administrador actualizará tu perfil'
            );
            navigate('/');
        } catch (error) {
            FireError(error.message);
        }
    };

    return (
        <div className='signup-admin-container'>
            <div className='signup-form'>
                <img src={Logo} alt='Logo' className='Logo' />
                <h2>Registro</h2>
                <form onSubmit={handleSignup}>
                    <h3>Nombre</h3>
                    <TextInput
                        placeholder='Nombre Completo'
                        getVal={fullName}
                        setVal={setfullName}
                    />
                    <h3>Correo Electrónico</h3>
                    <TextInput
                        placeholder='Correo Electrónico'
                        getVal={email}
                        setVal={setEmail}
                    />
                    <h3>Contraseña</h3>
                    <HiddenTextInput
                        placeholder='Contraseña'
                        getVal={password}
                        setVal={setPassword}
                    />
                    <h3>Confirmar Contraseña</h3>
                    <HiddenTextInput
                        placeholder='Confirmar Contraseña'
                        getVal={passwordConfirm}
                        setVal={setConfirmPassword}
                    />
                    <div className='button-container'>
                        <BaseButton
                            type='primary'
                            label='Registrarse'
                            onClick={handleSignup}
                        />
                        <Link to='/LoginAdmin'>
                            <BaseButton type='fail' label='Cancelar' />
                        </Link>
                    </div>
                </form>
            </div>
            <div className='signup-image'></div>
        </div>
    );
};

export default Signup;
