import React, { useState } from 'react';
import './loginUser.scss';
import TextInput from '../../components/inputs/TextInput/TextInput';
import HiddenTextInput from '../../components/inputs/TextInput/HiddenTextInput';
import Logo from '../../components/images/caeqLogo.png';
import { Link, useNavigate } from 'react-router-dom';
import { postLoginArchitectUsers } from '../../client/ArchitectUser/ArchitectUser.POST';
import { FireError, FireSucess, FireLoading } from '../../utils/alertHandler';
import { setToken, setUserType, setArchitectUserSaved } from '../../utils/auth';
import BaseButton from '../../components/buttons/BaseButton';

const LoginUser = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const swal = FireLoading('Iniciando sesión de arquitecto...');
            const response = await postLoginArchitectUsers(email, password);
            if (response.status === 'success') {
                const token = response.token;

                setUserType(token);
                setToken(token);
                setArchitectUserSaved(response.data.user);
            }
            swal.close();
            FireSucess('Ha iniciado sesión con éxito');
            navigate('/Principal');
        } catch (error) {
            FireError(error.response.data.message);
        }
    };

    return (
        <div className='login-user-container'>
            <img src={Logo} alt='Logo' className='Logo' />
            <form>
                <h2>Correo electrónico</h2>
                <TextInput
                    placeholder='Ingrese su correo'
                    getVal={email}
                    setVal={setEmail}
                />
                <h2>Contraseña</h2>
                <HiddenTextInput
                    placeholder='Ingrese su contraseña'
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
                <Link to='/User-ForgotPassword'>
                    <p>
                        <u>¿Olvidó su contraseña?</u>
                    </p>
                </Link>

                <Link to='/'>
                    <u>Volver a página de inicio</u>
                </Link>
            </div>
        </div>
    );
};

export default LoginUser;
