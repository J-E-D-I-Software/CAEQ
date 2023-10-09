import React, { useState } from 'react';
import './loginAdmin.scss';
import TextInput from '../../components/inputs/TextInput/TextInput';
import HiddenTextInput from '../../components/inputs/TextInput/HiddenTextInput';
import Logo from '../../components/images/caeqLogo.png';
import { Link, useNavigate } from 'react-router-dom';
import { postLoginCaeqUsers } from '../../client/CaeqUser/CaeqUser.POST';
import { FireError, FireSucess, FireLoading } from '../../utils/alertHandler';
import { setToken, setUserType, setCaeqUserSaved } from '../../utils/auth';
import BaseButton from '../../components/buttons/BaseButton';

const LoginAdmin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const swal = FireLoading('Iniciando sesión de administrador...');
            const response = await postLoginCaeqUsers(email, password);
            if (response.status === 'success') {
                const token = response.token;

                setUserType(token);
                setToken(token);
                setCaeqUserSaved(response.data.user);
            }
            swal.close();
            FireSucess('Has iniciado sesión con éxito');
            navigate('/Principal');
        } catch (error) {
            console.error(error);
            FireError(error.response.data.message);
        }
    };

    return (
        <div className='login-admin-container'>
            <img src={Logo} alt='Logo' className='logo' />
            <form>
                <h2>Correo electrónico</h2>
                <TextInput
                    placeholder='Ingresa tu correo'
                    getVal={email}
                    setVal={setEmail}
                />
                <h2>Contraseña</h2>
                <HiddenTextInput
                    placeholder='Ingresa tu contraseña'
                    getVal={password}
                    setVal={setPassword}
                />
                <br />
                <BaseButton type='primary' onClick={handleLogin}>
                    Iniciar sesión
                </BaseButton>
            </form>
            <br />
            <div className='forgot-register-links'>
                <Link to='/Forgot-password'>
                    <p> ¿Olvidaste tu contraseña?</p>
                </Link>
                <Link to='/SignupAdmin'>
                    <p> Regístrate</p>
                </Link>
            </div>
        </div>
    );
};

export default LoginAdmin;
