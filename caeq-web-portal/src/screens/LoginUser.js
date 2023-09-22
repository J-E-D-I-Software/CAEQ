import React, { useState } from 'react';
import '../styles/loginAdmin.scss';
import TextInput from '../components/inputs/TextInput/TextInput';
import HiddenTextInput from '../components/inputs/TextInput/HiddenTextInput';
import Logo from '../components/images/caeqLogo.png';
import Button from '../components/buttons/BaseButton';
import { Link, useNavigate } from 'react-router-dom';
import { postLoginArchitectUsers } from '../client/ArchitectUser/ArchitectUser.POST';
import { FireError, FireSucess } from '../utils/alertHandler';
import { setToken, setUserType, setArchitectUserSaved } from '../utils/auth';

const LogingSingup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await postLoginArchitectUsers(email, password);
            if (response.status === 'success') {
                const token = response.token;

                setUserType(token);
                setToken(token);
                setArchitectUserSaved(response.data.user);
            }
            FireSucess('Haz iniciado sesión con éxito');
            navigate(('/Principal'));
        } catch (error) {
            FireError(error.message);
        }
    };

    return (
        <div className='login-container'>
            <img src={Logo} alt='Logo' className='Logo' />
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleLogin}>
                <TextInput
                    placeholder='Correo Electrónico'
                    getVal={email}
                    setVal={setEmail}
                />
                <HiddenTextInput
                    placeholder='Contraseña'
                    getVal={password}
                    setVal={setPassword}
                />
                <Button type='submit' label='Iniciar Sesión' />
            </form>
            <div className='forgot-register-links'>
                <a href='/forgot-password'>¿Olvidaste tu contraseña?</a> <br />
                <Link to='/SignupUser'>
                    <p> Regístrate</p>
                </Link>
            </div>
        </div>
    );
};

export default LogingSingup;
