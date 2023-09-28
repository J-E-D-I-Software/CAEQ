import React, { useState } from 'react';
import './signup.scss';
import TextInput from '../../components/inputs/TextInput/TextInput';
import HiddenTextInput from '../../components/inputs/TextInput/HiddenTextInput';
import Logo from '../../components/images/caeqLogo.png';
import BaseButton from '../../components/buttons/BaseButton';
import { Link, useNavigate } from 'react-router-dom';
import { postSignupArchitectUsers } from '../../client/ArchitectUser/ArchitectUser.POST';
import { FireError, FireSucess } from '../../utils/alertHandler';
import { setToken, setUserType, setArchitectUserSaved } from '../../utils/auth';

const Signup = () => {
    const [fullName, setfullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setConfirmPassword] = useState(''); // Nuevo estado para la confirmación de contraseña
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        const data = { fullName, email, password, passwordConfirm };
        e.preventDefault();
        try {
            const response = await postSignupArchitectUsers(data);
            if (response.status === 'success') {
                const token = response.token;

                setUserType(token);
                setToken(token);
                setArchitectUserSaved(response.data.user);
            }

            FireSucess('Te has registrado con éxito');
            navigate('/Principal');
        } catch (error) {
            FireError(error.message);
        }
    };

    return (
        <div className='signup-container'>
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
                        type='Submit'
                        onClick={handleSignup}
                    >Registrarse
                    </BaseButton>
                    <Link to='/LoginAdmin'>
                        <BaseButton type='fail'>Cancelar</BaseButton>
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default Signup;
