import React, { useState } from 'react';
import '../styles/signup.scss';
import TextInput from '../components/inputs/TextInput/TextInput';
import HiddenTextInput from '../components/inputs/TextInput/HiddenTextInput';
import DateInput from '../components/inputs/DateInput/DateInput';
import Logo from '../components/images/caeqLogo.png';
import BaseButton from '../components/buttons/BaseButton';
import { Link, useNavigate } from 'react-router-dom';
import { postSignupArchitectUsers } from '../client/ArchitectUser/ArchitectUser.POST';
import { FireError, FireSucess } from '../utils/alertHandler';
import { setToken, setUserType, setArchitectUserSaved } from '../utils/auth';

const Signup = () => {
    const [fullName, setfullName] = useState('');
    const [email, setEmail] = useState('');
    const [DRONumber, setDRONumber] = useState('');
    const [collegiateNumber, setCollegiateNumber] = useState('');
    const [memberType, setMemberType] = useState('');
    const [classification, setClassification] = useState('');
    const [gender, setGender] = useState('');
    const [cellphone, setCellphone] = useState('');
    const [homePhone, setHomePhone] = useState('');
    const [officePhone, setOfficePhone] = useState('');
    const [homeAddress, setHomeAdress] = useState('');
    const [workAddress, setWorkAddress] = useState('');
    const [emergencyContact, setEmergencyContact] = useState('');
    const [mainProfessionalActivity, setMainProfessionalActivity] = useState('');
    const [specialty, setSpecialty] = useState('');
    const [dateOfAdmission, setDateOfAdmission] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [university, setUniversity] = useState('');
    const [professionalLicense, setProfessionalLicense] = useState('');
    const [municipalityOfLabor, setMunicipalityOfLabor] = useState('');
    const [positionsInCouncil, setPositionsInCouncil] = useState('');
    const [linkCV, setLinkCV] = useState('');
    const [authorizationToShareInfo, setAuthorizationToShareInfo] = useState('');
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
                <div class="grid-container">
                    <div class="column">
                        <TextInput 
                            label="Nombre completo"
                            placeholder='Nombre Completo' 
                            getVal={fullName} 
                            setVal={setfullName} 
                            require={true} />
                        <TextInput
                            label="Correo Electronico"
                            placeholder='Correo Electrónico'
                            getVal={email}
                            setVal={setEmail}
                            require={true}
                        />
                        <HiddenTextInput
                            label="Contraseña"
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
                        <h3>Número de DRO</h3>
                        <TextInput
                            placeholder='Confirmar Contraseña'
                            getVal={DRONumber}
                            setVal={setDRONumber}
                        />
                        <h3>Número de colegiado</h3>
                        <TextInput
                            placeholder='Confirmar Contraseña'
                            getVal={collegiateNumber}
                            setVal={setCollegiateNumber}
                        />
                        <h3>Tipo de miembro</h3>
                        <TextInput
                            placeholder='Confirmar Contraseña'
                            getVal={memberType}
                            setVal={setMemberType}
                        />
                        <h3>clasificación</h3>
                        <TextInput
                            placeholder='Confirmar Contraseña'
                            getVal={classification}
                            setVal={setClassification}
                        />
                        <h3>Género</h3>
                        <TextInput
                            placeholder='Confirmar Contraseña'
                            getVal={gender}
                            setVal={setGender}
                        />
                        <h3>Número de teléfono celular</h3>
                        <TextInput
                            placeholder='Confirmar Contraseña'
                            getVal={cellphone}
                            setVal={setCellphone}
                        />
                        <h3>Número de teléfono de casa</h3>
                        <TextInput
                            placeholder='Confirmar Contraseña'
                            getVal={cellphone}
                            setVal={setCellphone}
                        />
                        <h3>Número de teléfono de oficina</h3>
                        <TextInput
                            placeholder='Confirmar Contraseña'
                            getVal={cellphone}
                            setVal={setCellphone}
                        />
                        <h3>Domicilio particular</h3>
                        <TextInput
                            placeholder='Confirmar Contraseña'
                            getVal={cellphone}
                            setVal={setCellphone}
                        />
                        <h3>Domicilio de trabajo</h3>
                        <TextInput
                            placeholder='Confirmar Contraseña'
                            getVal={cellphone}
                            setVal={setCellphone}
                        />
                    </div>
                    <div class="column">
                    <h3>Contacto de emergencia (nombre y teléfono)</h3>
                        <TextInput
                            placeholder='Confirmar Contraseña'
                            getVal={gender}
                            setVal={setGender}
                        />
                        <h3>Actividad Principal Preponderante</h3>
                        <TextInput
                            placeholder='Confirmar Contraseña'
                            getVal={cellphone}
                            setVal={setCellphone}
                        />
                        <h3>Especialidad</h3>
                        <TextInput
                            placeholder='Confirmar Contraseña'
                            getVal={cellphone}
                            setVal={setCellphone}
                        />
                        <h3>Fecha de ingreso al colegio</h3>
                        <DateInput
                            placeholder='Confirmar Contraseña'
                            getVal={cellphone}
                            setVal={setCellphone}
                        />
                        <h3>Fecha de nacimiento</h3>
                        <DateInput
                            placeholder='Confirmar Contraseña'
                            getVal={cellphone}
                            setVal={setCellphone}
                        />
                        <h3>Universidad</h3>
                        <TextInput
                            placeholder='Confirmar Contraseña'
                            getVal={cellphone}
                            setVal={setCellphone}
                        />
                        <h3>Cedula profesional</h3>
                        <TextInput
                            placeholder='Confirmar Contraseña'
                            getVal={cellphone}
                            setVal={setCellphone}
                        />
                        <h3>Municipio</h3>
                        <TextInput
                            placeholder='Confirmar Contraseña'
                            getVal={cellphone}
                            setVal={setCellphone}
                        />
                        <h3>Cargos en consejo directivo (fecha y nombre del cargo)</h3>
                        <TextInput
                            placeholder='Confirmar Contraseña'
                            getVal={cellphone}
                            setVal={setCellphone}
                        />
                        <h3>Suba su curriculum</h3>
                        <TextInput
                            placeholder='Confirmar Contraseña'
                            getVal={cellphone}
                            setVal={setCellphone}
                        />
                        <h3>¿Autoriza compartir su información?</h3>
                        <TextInput
                            placeholder='Confirmar Contraseña'
                            getVal={cellphone}
                            setVal={setCellphone}
                        />
                    </div>
                </div>
                <div className='button-container'>
                    <BaseButton
                        type='Submit'
                        label='Registrarse'
                        onClick={handleSignup}
                    />
                    <Link to='/LoginUser'>
                        <BaseButton type='fail' label='Cancelar' />
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default Signup;
