import React, { useState } from 'react';
import './signup.scss';
import TextInput from '../../components/inputs/TextInput/TextInput';
import HiddenTextInput from '../../components/inputs/TextInput/HiddenTextInput';
import Logo from '../../components/images/caeqLogo.png';
import BaseButton from '../../components/buttons/BaseButton';
import { Link, useNavigate } from 'react-router-dom';
import { postSignupCaeqUsers } from '../../client/CaeqUser/CaeqUser.POST';
import { FireError, FireSucess, FireLoading } from '../../utils/alertHandler';

/**
 * The Signup component provides a user interface for user registration and handles the signup process.
 *
 * @component
 */
const Signup = () => {
    const [fullName, setfullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    /**
     * Handles the user signup process, sending a registration request to the server.
     *
     * @async
     * @param {Event} e - The form submit event.
     * @returns {Promise<void>} A Promise that resolves when the signup process is complete.
     */
    const handleSignup = async (e) => {
        const data = { fullName, email, password, passwordConfirm };
        e.preventDefault();
        try {
            const swal = FireLoading('Registrando administrador...');
            await postSignupCaeqUsers(data);
            swal.close();
            FireSucess(
                'Te has registrado con éxito. Un administrador actualizará tu perfil'
            );
            navigate('/');
        } catch (error) {
            FireError(error.response.data.message);
        }
    };

    return (
        <div className='signup-admin-container'>
            <div className='signup-form'>
                <img src={Logo} alt='Logo' className='Logo' />
                <h1>Registrate para acceder</h1>
                <form onSubmit={handleSignup}>
                    <TextInput
                        placeholder='Nombre Completo'
                        getVal={fullName}
                        setVal={setfullName}
                        label='Nombre completo'
                    />
                    <TextInput
                        placeholder='Correo Electrónico'
                        getVal={email}
                        setVal={setEmail}
                        label='Correo Electrónico'
                    />
                    <HiddenTextInput
                        placeholder='Contraseña'
                        getVal={password}
                        setVal={setPassword}
                        label='Contraseña'
                    />
                    <HiddenTextInput
                        placeholder='Confirmar Contraseña'
                        getVal={passwordConfirm}
                        setVal={setConfirmPassword}
                        label='Confirmar contraseña'
                    />
                    <div className='button-container'>
                        <BaseButton type='primary' onClick={handleSignup}>
                            Registrarse
                        </BaseButton>
                        <Link to='/LoginAdmin'>
                            <BaseButton type='cancel'>Cancelar</BaseButton>
                        </Link>
                    </div>
                </form>
            </div>
            <div className='signup-image'></div>
        </div>
    );
};

export default Signup;
